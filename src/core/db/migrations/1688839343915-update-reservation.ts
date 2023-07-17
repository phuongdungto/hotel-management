import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReservation1688839343915 implements MigrationInterface {
    name = 'UpdateReservation1688839343915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_7256a4b03b919f89943441082e\` ON \`room_reservation\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_5b721f00d66cad7917df1c410a\` ON \`bills\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP COLUMN \`biil_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP FOREIGN KEY \`FK_7256a4b03b919f89943441082e6\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_7256a4b03b919f89943441082e\` ON \`room_reservation\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP COLUMN \`bill_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD \`bill_id\` varchar(255) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD UNIQUE INDEX \`IDX_7256a4b03b919f89943441082e\` (\`bill_id\`)
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_7256a4b03b919f89943441082e\` ON \`room_reservation\` (\`bill_id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD CONSTRAINT \`FK_7256a4b03b919f89943441082e6\` FOREIGN KEY (\`bill_id\`) REFERENCES \`bills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP FOREIGN KEY \`FK_7256a4b03b919f89943441082e6\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_7256a4b03b919f89943441082e\` ON \`room_reservation\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP INDEX \`IDX_7256a4b03b919f89943441082e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP COLUMN \`bill_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD \`bill_id\` varchar(36) NULL
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_7256a4b03b919f89943441082e\` ON \`room_reservation\` (\`bill_id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD CONSTRAINT \`FK_7256a4b03b919f89943441082e6\` FOREIGN KEY (\`bill_id\`) REFERENCES \`bills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD \`biil_id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`IDX_5b721f00d66cad7917df1c410a\` ON \`bills\` (\`room_reservation_id\`)
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`IDX_7256a4b03b919f89943441082e\` ON \`room_reservation\` (\`bill_id\`)
        `);
    }

}
