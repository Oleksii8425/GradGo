using GradGo.DTOs;
using GradGo.Models;

namespace GradGo.Mappers
{
    public static class CourseMapper
    {
        public static CourseDto ToDto(this Course course)
        {
            return new CourseDto(
                course.Id,
                course.Name,
                course.Degree.GetDescription(),
                course.University.ToDto(),
                course.StartDate,
                course.EndDate
            );
        }
    }
}