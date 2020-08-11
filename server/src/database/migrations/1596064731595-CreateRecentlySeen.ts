import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRecentlySeen1596064731595 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "recently_seen",
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
                name: "book_id",
                type: "varchar",
                isNullable: false,
              },
            ],
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recently_seen");
      }
}
