import { MigrationInterface, QueryRunner } from "typeorm";

export class BotTypesData1731955262957 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO "bot_type" ("name")
        VALUES ('Telegram'),
               ('Viber'),
               ('WhatsApp');
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM bot_type');
    }
}
