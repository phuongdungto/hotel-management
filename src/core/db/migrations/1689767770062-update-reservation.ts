import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReservation1689767770062 implements MigrationInterface {
    name = 'UpdateReservation1689767770062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD \`status\` enum ('unpaid', 'paid') NOT NULL DEFAULT 'unpaid'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP COLUMN \`status\`
        `);
    }

}
