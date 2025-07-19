using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GradGo.Migrations
{
    /// <inheritdoc />
    public partial class AddSkillTitleUniqueIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Skills_Title",
                table: "Skills",
                column: "Title",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Skills_Title",
                table: "Skills");
        }
    }
}
