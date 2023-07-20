import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationReservationBill1689770444571 implements MigrationInterface {
    name = 'UpdateRelationReservationBill1689770444571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP FOREIGN KEY \`FK_7256a4b03b919f89943441082e6\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_5b721f00d66cad7917df1c410a4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD CONSTRAINT \`FK_7256a4b03b919f89943441082e6\` FOREIGN KEY (\`bill_id\`) REFERENCES \`bills\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD CONSTRAINT \`FK_5b721f00d66cad7917df1c410a4\` FOREIGN KEY (\`room_reservation_id\`) REFERENCES \`room_reservation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
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
            ALTER TABLE \`bills\`
            ADD CONSTRAINT \`FK_5b721f00d66cad7917df1c410a4\` FOREIGN KEY (\`room_reservation_id\`) REFERENCES \`room_reservation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD CONSTRAINT \`FK_7256a4b03b919f89943441082e6\` FOREIGN KEY (\`bill_id\`) REFERENCES \`bills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
