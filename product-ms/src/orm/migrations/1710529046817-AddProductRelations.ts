import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProductRelations1710529046817 implements MigrationInterface {
    name = 'AddProductRelations1710529046817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_f091e86a234693a49084b4c2c86"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_3e59a34134d840e83c2010fac9a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_f091e86a234693a49084b4c2c86"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_3e59a34134d840e83c2010fac9a"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_f091e86a234693a49084b4c2c86" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
