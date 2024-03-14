import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProduct1710376204460 implements MigrationInterface {
    name = 'CreateProduct1710376204460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('Electronics', 'Furniture', 'Fashion', 'Home', 'Sports')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "category" "public"."products_category_enum" NOT NULL DEFAULT 'Electronics', "image" character varying, "weight" character varying, "dimensions" character varying, "material" character varying, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
    }

}
