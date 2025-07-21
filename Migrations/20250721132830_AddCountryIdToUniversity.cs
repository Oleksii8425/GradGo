using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GradGo.Migrations
{
    /// <inheritdoc />
    public partial class AddCountryIdToUniversity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Universities");

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Universities",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Universities_CountryId",
                table: "Universities",
                column: "CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Universities_Countries_CountryId",
                table: "Universities",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Universities_Countries_CountryId",
                table: "Universities");

            migrationBuilder.DropIndex(
                name: "IX_Universities_CountryId",
                table: "Universities");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Universities");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Universities",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
