import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCart1710510743341 implements MigrationInterface {
    name = 'AddCart1710510743341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f091e86a234693a49084b4c2c8" ON "cart" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD "author_id" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_a7aa83b4e507fd880e677c6d0a" ON "products" ("author_id") `);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_f091e86a234693a49084b4c2c86"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7aa83b4e507fd880e677c6d0a"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "author_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f091e86a234693a49084b4c2c8"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
