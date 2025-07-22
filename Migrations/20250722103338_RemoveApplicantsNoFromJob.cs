using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GradGo.Migrations
{
    /// <inheritdoc />
    public partial class RemoveApplicantsNoFromJob : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicantsNo",
                table: "Jobs");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApplicantsNo",
                table: "Jobs",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
