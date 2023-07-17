import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBillReservation1688766837525 implements MigrationInterface {
    name = 'UpdateBillReservation1688766837525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP FOREIGN KEY \`FK_39104b93a3213415b92259a8eb3\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP COLUMN \`total_promotion\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP COLUMN \`total_rental\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP COLUMN \`promotion_price\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP COLUMN \`service_promotion_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD \`biil_id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD \`bill_id\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD UNIQUE INDEX \`IDX_7256a4b03b919f89943441082e\` (\`bill_id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_5b721f00d66cad7917df1c410a4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD UNIQUE INDEX \`IDX_5b721f00d66cad7917df1c410a\` (\`room_reservation_id\`)
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_7256a4b03b919f89943441082e\` ON \`room_reservation\` (\`bill_id\`)
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_5b721f00d66cad7917df1c410a\` ON \`bills\` (\`room_reservation_id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD CONSTRAINT \`FK_7256a4b03b919f89943441082e6\` FOREIGN KEY (\`bill_id\`) REFERENCES \`bills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD CONSTRAINT \`FK_5b721f00d66cad7917df1c410a4\` FOREIGN KEY (\`room_reservation_id\`) REFERENCES \`room_reservation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_5b721f00d66cad7917df1c410a4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP FOREIGN KEY \`FK_7256a4b03b919f89943441082e6\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_5b721f00d66cad7917df1c410a\` ON \`bills\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_7256a4b03b919f89943441082e\` ON \`room_reservation\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP INDEX \`IDX_5b721f00d66cad7917df1c410a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD CONSTRAINT \`FK_5b721f00d66cad7917df1c410a4\` FOREIGN KEY (\`room_reservation_id\`) REFERENCES \`room_reservation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP INDEX \`IDX_7256a4b03b919f89943441082e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP COLUMN \`bill_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP COLUMN \`biil_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD \`service_promotion_id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD \`promotion_price\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD \`total_rental\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD \`total_promotion\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD CONSTRAINT \`FK_39104b93a3213415b92259a8eb3\` FOREIGN KEY (\`service_promotion_id\`) REFERENCES \`service_promotions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
