import { MigrationInterface, QueryRunner } from 'typeorm';

export class RolesData1731716186965 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO role (name)
        SELECT name
        FROM (VALUES ('admin'), ('user'), ('guest')) AS roles(name)
        WHERE NOT EXISTS (
            SELECT 1
            FROM role r
            WHERE r.name = roles.name
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM role');
  }
}
