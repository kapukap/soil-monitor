import { MigrationInterface, QueryRunner } from "typeorm";

export class DeviceData1731974689737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "device" ("name", "code")
            VALUES ('Mark-42', 'dev-mrk-42'),
                   ('Mark-43', 'dev-mrk-43'),
                   ('Mark-51', 'dev-mrk-51');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM device');
    }

}
