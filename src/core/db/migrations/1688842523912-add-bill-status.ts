import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBillStatus1688842523912 implements MigrationInterface {
    name = 'AddBillStatus1688842523912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_7256a4b03b919f89943441082e\` ON \`room_reservation\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD \`status\` enum ('unpaid', 'paid') NOT NULL DEFAULT 'unpaid'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP COLUMN \`status\`
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`IDX_7256a4b03b919f89943441082e\` ON \`room_reservation\` (\`bill_id\`)
        `);
    }

}
