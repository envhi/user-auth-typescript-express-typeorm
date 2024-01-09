import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1704583144618 implements MigrationInterface {
    name = 'Default1704583144618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    }

}
