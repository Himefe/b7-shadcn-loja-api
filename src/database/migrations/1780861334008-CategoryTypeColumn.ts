import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryTypeColumn1780861334008 implements MigrationInterface {
    name = 'CategoryTypeColumn1780861334008';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."categories_type_enum" AS ENUM('PRODUCT')`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "type" "public"."categories_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."categories_type_enum"`);
    }
}
