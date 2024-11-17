import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersRolesData1731716243425 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO user_role (user_id, role_id)
        VALUES (1, 1),
               (2, 2);
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM user_role');
    }
}
