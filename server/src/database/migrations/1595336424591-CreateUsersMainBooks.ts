import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersMainBooks1595336424591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_main_books",
        columns: [
          {
            name: "id",
            type: "int",
            isUnique: true,
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "user_id",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "main_book_id",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_main_books");
  }
}
