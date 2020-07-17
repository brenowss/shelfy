import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSubjectsTable1594763419871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
      
    await queryRunner.createTable(
      new Table({
        name: "subjects",
        columns: [
          {
            name: "id",
            type: "int",
            isUnique: true,
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
            length: "20"
          },
          {
            name: "icon",
            type: "varchar",
            length: "20"
          },
          {
            name: "color",
            type: "varchar",
            length: "10"
          },
          {
            name: "url",
            type: "varchar",
            length: "20",
          },
          {
            name: "image",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("subjects");
  }
}
