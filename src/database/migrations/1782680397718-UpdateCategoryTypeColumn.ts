import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCategoryTypeColumn1782680397718 implements MigrationInterface {
    name = 'UpdateCategoryTypeColumn1782680397718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."categories_type_enum"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "type" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."categories_type_enum" AS ENUM('PRODUCT', 'WOOD')`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "type" "public"."categories_type_enum" NOT NULL`);
    }

}
