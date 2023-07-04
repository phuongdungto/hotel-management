import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProvider1688384609711 implements MigrationInterface {
    name = 'UpdateProvider1688384609711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP FOREIGN KEY \`FK_69755d091238005a2c52aee94db\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`providers\` DROP COLUMN \`password\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP COLUMN \`floor\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP COLUMN \`number_of_people\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP COLUMN \`status\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP COLUMN \`room_style_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD \`floor\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD \`number_of_people\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD \`status\` enum ('clearing', 'occupied', 'reserved', 'available') NOT NULL DEFAULT 'available'
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD \`room_style_id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`customers\` DROP COLUMN \`birthday\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`customers\`
            ADD \`birthday\` datetime NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD CONSTRAINT \`FK_69755d091238005a2c52aee94db\` FOREIGN KEY (\`room_style_id\`) REFERENCES \`room_style\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP FOREIGN KEY \`FK_69755d091238005a2c52aee94db\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`customers\` DROP COLUMN \`birthday\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`customers\`
            ADD \`birthday\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP COLUMN \`room_style_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP COLUMN \`status\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP COLUMN \`number_of_people\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP COLUMN \`floor\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD \`room_style_id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD \`status\` enum ('clearing', 'occupied', 'reserved', 'available') NOT NULL DEFAULT 'available'
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD \`number_of_people\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD \`floor\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`providers\`
            ADD \`password\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD CONSTRAINT \`FK_69755d091238005a2c52aee94db\` FOREIGN KEY (\`room_style_id\`) REFERENCES \`room_style\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
