import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePromotionPercent1689148384103 implements MigrationInterface {
    name = 'UpdatePromotionPercent1689148384103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\` DROP COLUMN \`percent\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotions\`
            ADD \`percent\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\`
            ADD \`date_start\` datetime NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\`
            ADD \`date_end\` datetime NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\`
            ADD \`date_start\` datetime NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\`
            ADD \`date_end\` datetime NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\` DROP COLUMN \`date_end\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\` DROP COLUMN \`date_start\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\` DROP COLUMN \`date_end\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\` DROP COLUMN \`date_start\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotions\` DROP COLUMN \`percent\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\`
            ADD \`percent\` int NOT NULL
        `);
    }

}
