using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GradGo.Migrations
{
    /// <inheritdoc />
    public partial class AddJobseeker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Jobseeker",
                newName: "LastName");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Jobseeker",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Jobseeker",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Jobseeker",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Jobseeker",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Jobseeker",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Jobseeker",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Jobseeker");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Jobseeker");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Jobseeker");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Jobseeker");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Jobseeker");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Jobseeker");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Jobseeker",
                newName: "Name");
        }
    }
}
