import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBillV21688990626898 implements MigrationInterface {
    name = 'UpdateBillV21688990626898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\`
            ADD \`percent\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD \`total_rental\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD \`total_service\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD \`total_room_promotion\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD \`total_service_promotion\` int NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP COLUMN \`total_service_promotion\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP COLUMN \`total_room_promotion\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP COLUMN \`total_service\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP COLUMN \`total_rental\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\` DROP COLUMN \`percent\`
        `);
    }

}
