import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBill1690286348041 implements MigrationInterface {
    name = 'UpdateBill1690286348041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_rental\` \`total_rental\` int NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_service\` \`total_service\` int NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_room_promotion\` \`total_room_promotion\` int NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` CHANGE \`total_service_promotion\` \`total_service_promotion\` int NOT NULL DEFAULT '0'
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
