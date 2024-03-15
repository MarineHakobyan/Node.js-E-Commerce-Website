import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProduct1710376204460 implements MigrationInterface {
    name = 'CreateProduct1710376204460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_category_enum" AS ENUM('Electronics', 'Furniture', 'Fashion', 'Home', 'Sports')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "owner_id" integer NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "category" "public"."product_category_enum" NOT NULL DEFAULT 'Electronics', "image" character varying, "weight" character varying, "dimensions" character varying, "material" character varying, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c2eedda8bf0194e1fb299ee742" ON "product" ("owner_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c2eedda8bf0194e1fb299ee742"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_category_enum"`);
    }

}
