import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersData1731716069417 implements MigrationInterface {
    // TODO Password to JWT
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO "user" ("nick", "email", "password")
        VALUES ('user1', 'testuser1@example.com', '12345678'),
               ('user2', 'testuser2@example.com', '12345678'),
               ('user3', 'testuser3@example.com', '12345678'),
               ('kapukap', 'kapukap@kapukap.com', '$2b$10$mZIFzU3mZACJfQnkTKGvIeahPwtO57ggISwFWaNEx5Xf8Mu6REZhG');
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM user');
    }
}
