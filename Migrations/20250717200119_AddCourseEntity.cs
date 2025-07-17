using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GradGo.Migrations
{
    /// <inheritdoc />
    public partial class AddCourseEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Course",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UniveristyId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Degree = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseJobseeker",
                columns: table => new
                {
                    CoursesId = table.Column<int>(type: "int", nullable: false),
                    JobseekersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseJobseeker", x => new { x.CoursesId, x.JobseekersId });
                    table.ForeignKey(
                        name: "FK_CourseJobseeker_Course_CoursesId",
                        column: x => x.CoursesId,
                        principalTable: "Course",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseJobseeker_Jobseeker_JobseekersId",
                        column: x => x.JobseekersId,
                        principalTable: "Jobseeker",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseJobseeker_JobseekersId",
                table: "CourseJobseeker",
                column: "JobseekersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseJobseeker");

            migrationBuilder.DropTable(
                name: "Course");
        }
    }
}
