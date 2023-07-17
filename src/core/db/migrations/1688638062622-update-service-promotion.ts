import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateServicePromotion1688638062622 implements MigrationInterface {
    name = 'UpdateServicePromotion1688638062622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\` DROP FOREIGN KEY \`FK_dd319dce8774b66aed1571c58f0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP FOREIGN KEY \`FK_6d04860450b195b2a6e86015fb6\`
        `);
        await queryRunner.query(`
            CREATE TABLE \`services\` (
                \`id\` varchar(36) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`name\` varchar(255) NOT NULL,
                \`price\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\`
            ADD CONSTRAINT \`FK_dd319dce8774b66aed1571c58f0\` FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD CONSTRAINT \`FK_6d04860450b195b2a6e86015fb6\` FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP FOREIGN KEY \`FK_6d04860450b195b2a6e86015fb6\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\` DROP FOREIGN KEY \`FK_dd319dce8774b66aed1571c58f0\`
        `);
        await queryRunner.query(`
            DROP TABLE \`services\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD CONSTRAINT \`FK_6d04860450b195b2a6e86015fb6\` FOREIGN KEY (\`service_id\`) REFERENCES \`service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\`
            ADD CONSTRAINT \`FK_dd319dce8774b66aed1571c58f0\` FOREIGN KEY (\`service_id\`) REFERENCES \`service\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
