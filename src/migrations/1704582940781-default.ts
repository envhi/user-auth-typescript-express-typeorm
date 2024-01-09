import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1704582940781 implements MigrationInterface {
    name = 'Default1704582940781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_account_type_enum" AS ENUM('lojista', 'comum')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "cpfcnpj" text NOT NULL, "password_hash" text NOT NULL, "account_type" "public"."users_account_type_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_d470a8e05c1a60492eea66d149d" UNIQUE ("cpfcnpj"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_account_type_enum"`);
    }

}
