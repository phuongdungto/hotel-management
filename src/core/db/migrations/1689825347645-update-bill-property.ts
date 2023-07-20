import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBillProperty1689825347645 implements MigrationInterface {
    name = 'UpdateBillProperty1689825347645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP COLUMN \`price\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP COLUMN \`total_price\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD \`customer_id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD CONSTRAINT \`FK_fc82eff6557abfff698e671b77f\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_fc82eff6557abfff698e671b77f\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP COLUMN \`customer_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD \`total_price\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD \`price\` int NOT NULL
        `);
    }

}
