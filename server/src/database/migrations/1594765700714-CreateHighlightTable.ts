import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHighlightTable1594765700714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "highlight",
        columns: [
          {
            name: "id",
            type: "int",
            isUnique: true,
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "title",
            type: "varchar",
            length: "100",
          },
          {
            name: "url",
            type: "varchar"
          },
          {
            name: "date",
            type: "varchar",
            length: "12"
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("highlight");
  }
}
