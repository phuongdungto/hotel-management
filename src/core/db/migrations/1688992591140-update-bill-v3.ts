import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBillV31688992591140 implements MigrationInterface {
    name = 'UpdateBillV31688992591140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_rental\` \`total_rental\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_service\` \`total_service\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_room_promotion\` \`total_room_promotion\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_service_promotion\` \`total_service_promotion\` int NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_service_promotion\` \`total_service_promotion\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_room_promotion\` \`total_room_promotion\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_service\` \`total_service\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_rental\` \`total_rental\` int NOT NULL
        `);
    }

}
