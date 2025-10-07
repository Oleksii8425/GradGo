using Amazon.S3;
using Amazon.S3.Model;
using GradGo.Data;
using GradGo.DTOs;
using GradGo.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GradGo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAmazonS3 _s3client;

        public ApplicationsController(AppDbContext context, IAmazonS3 s3Client)
        {
            _context = context;
            _s3client = s3Client;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationDto>> GetApplication(Guid id)
        {
            var application = await _context.Applications
                .Include(a => a.Job)
                .Include(a => a.Jobseeker)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (application is null)
                return NotFound();

            return Ok(application.ToDto(application.Job));
        }

        [HttpPost]
        public async Task<IActionResult> CreateApplication([FromForm] ApplicationCreateDto dto)
        {
            var exists = await _context.Applications
                .AnyAsync(a => a.JobId == dto.JobId && a.JobseekerId == dto.JobseekerId);

            if (exists)
                return BadRequest(new { message = "User already applied to this job." });

            string cvKey = $"{dto.JobseekerId}/Applications/{dto.JobId}/{dto.Cv.FileName}";

            string? coverLetterKey = dto.CoverLetter != null
                ? $"{dto.JobseekerId}/Applications/{dto.JobId}/{dto.CoverLetter.FileName}"
                : null;

            // Upload CV
            var cvRequest = new PutObjectRequest
            {
                BucketName = "gradgo-users",
                Key = cvKey,
                InputStream = dto.Cv.OpenReadStream(),
                ContentType = dto.Cv.ContentType,
            };
            await _s3client.PutObjectAsync(cvRequest);

            // Upload cover letter if present
            if (dto.CoverLetter is not null)
            {
                var clRequest = new PutObjectRequest
                {
                    BucketName = "gradgo-users",
                    Key = coverLetterKey,
                    InputStream = dto.CoverLetter.OpenReadStream(),
                    ContentType = dto.CoverLetter.ContentType
                };
                await _s3client.PutObjectAsync(clRequest);
            }

            // Create Application entity
            var application = dto.ToApplication();
            application.CvPath = cvKey;
            application.CoverLetterPath = coverLetterKey;

            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            var savedApplication = await _context.Applications
                .Include(a => a.Job)
                .Include(a => a.Jobseeker)
                .FirstOrDefaultAsync(a => a.Id == application.Id);

            return CreatedAtAction(
                nameof(GetApplication),
                new { id = application.Id },
                savedApplication!.ToDto(savedApplication!.Job)
            );
        }
    }
}