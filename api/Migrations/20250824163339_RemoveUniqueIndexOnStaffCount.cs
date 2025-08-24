using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GradGo.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUniqueIndexOnStaffCount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_StaffCount",
                table: "AspNetUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_StaffCount",
                table: "AspNetUsers",
                column: "StaffCount",
                unique: true);
        }
    }
}
