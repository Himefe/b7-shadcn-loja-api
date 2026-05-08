import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductCategoriesRelationship1778211829416 implements MigrationInterface {
  name = 'ProductCategoriesRelationship1778211829416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "category" TO "categoryId"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "categoryId"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "categoryId" integer`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "categoryId"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "categoryId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "categoryId" TO "category"`,
    );
  }
}
