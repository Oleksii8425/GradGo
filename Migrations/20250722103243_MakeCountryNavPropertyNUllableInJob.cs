using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GradGo.Migrations
{
    /// <inheritdoc />
    public partial class MakeCountryNavPropertyNUllableInJob : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Jobs");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_CountryId",
                table: "Jobs",
                column: "CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Countries_CountryId",
                table: "Jobs",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Countries_CountryId",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_CountryId",
                table: "Jobs");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Jobs",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
