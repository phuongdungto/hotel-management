import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1687955699185 implements MigrationInterface {
    name = 'Init1687955699185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`customers\` (
                \`id\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`national_id\` varchar(255) NOT NULL,
                \`firstname\` varchar(255) NOT NULL,
                \`lastname\` varchar(255) NOT NULL,
                \`number_phone\` varchar(255) NOT NULL,
                \`address\` varchar(255) NOT NULL,
                \`birthday\` varchar(255) NOT NULL,
                \`gender\` varchar(255) NOT NULL,
                UNIQUE INDEX \`IDX_81cef023276a6e88202edaae64\` (\`national_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`providers\` (
                \`id\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`name\` varchar(255) NOT NULL,
                \`address\` varchar(255) NOT NULL,
                \`number_phone\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`goods\` (
                \`id\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`name\` varchar(255) NOT NULL,
                \`type\` varchar(255) NOT NULL,
                \`number_of_goods\` int NOT NULL,
                \`pirce\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`purchases_order_details\` (
                \`id\` varchar(255) NOT NULL,
                \`total\` int NOT NULL,
                \`purchase_order_id\` varchar(255) NOT NULL,
                \`goods_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`purchases_order\` (
                \`id\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`total\` int NOT NULL,
                \`staff_id\` varchar(255) NOT NULL,
                \`provider_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`firstname\` varchar(255) NOT NULL,
                \`lastname\` varchar(255) NOT NULL,
                \`number_phone\` varchar(255) NOT NULL,
                \`national_id\` varchar(255) NOT NULL,
                \`salary\` int NOT NULL,
                \`address\` varchar(255) NOT NULL,
                \`birthday\` varchar(255) NOT NULL,
                \`gender\` enum ('male', 'female') NOT NULL,
                \`role\` enum ('admin', 'manager', 'staff') NOT NULL DEFAULT 'staff',
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                UNIQUE INDEX \`IDX_232b9597ff9a89b2c2fc5d1b5e\` (\`national_id\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`room_style\` (
                \`id\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`room_promotions\` (
                \`id\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`date_start\` datetime NOT NULL,
                \`date_end\` datetime NOT NULL,
                \`name\` varchar(255) NOT NULL,
                \`percent\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`room_promotion_details\` (
                \`id\` varchar(255) NOT NULL,
                \`room_promotion_id\` varchar(255) NOT NULL,
                \`room_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`rooms\` (
                \`id\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`name\` varchar(255) NOT NULL,
                \`floor\` int NOT NULL,
                \`number_of_people\` int NOT NULL,
                \`price\` int NOT NULL,
                \`status\` enum ('clearing', 'occupied', 'reserved', 'available') NOT NULL DEFAULT 'available',
                \`room_style_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`room_reservation_detail\` (
                \`id\` varchar(255) NOT NULL,
                \`room_reservation_id\` varchar(255) NOT NULL,
                \`room_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`room_reservation\` (
                \`id\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`number_of_room\` int NOT NULL,
                \`check_in\` datetime NOT NULL,
                \`check_out\` datetime NOT NULL,
                \`total_rental\` int NOT NULL,
                \`total_promotion\` int NOT NULL,
                \`customer_id\` varchar(255) NOT NULL,
                \`staff_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`bills\` (
                \`id\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`staff_id\` varchar(255) NOT NULL,
                \`room_reservation_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`service_promotions\` (
                \`id\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`date_start\` datetime NOT NULL,
                \`date_end\` datetime NOT NULL,
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`service_promotion_details\` (
                \`id\` varchar(255) NOT NULL,
                \`percent\` int NOT NULL,
                \`service_promotion_id\` varchar(255) NOT NULL,
                \`service_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`bill_details\` (
                \`id\` varchar(255) NOT NULL,
                \`price\` int NOT NULL,
                \`number_of_services\` int NOT NULL,
                \`total_price\` int NOT NULL,
                \`promotion_price\` int NOT NULL,
                \`bill_id\` varchar(255) NOT NULL,
                \`service_id\` varchar(255) NOT NULL,
                \`service_promotion_id\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
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
            ALTER TABLE \`purchases_order_details\`
            ADD CONSTRAINT \`FK_2a60b5baf58effa2425794e7b5e\` FOREIGN KEY (\`purchase_order_id\`) REFERENCES \`purchases_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\`
            ADD CONSTRAINT \`FK_ac63078cc8f62739ad968385d60\` FOREIGN KEY (\`goods_id\`) REFERENCES \`goods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\`
            ADD CONSTRAINT \`FK_1d7ee831e11c8cb4886d840a833\` FOREIGN KEY (\`staff_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\`
            ADD CONSTRAINT \`FK_dc55685d0b45887c32601e94a4b\` FOREIGN KEY (\`provider_id\`) REFERENCES \`providers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\`
            ADD CONSTRAINT \`FK_dcd24e407a4d0b3e9d6716e1f7e\` FOREIGN KEY (\`room_promotion_id\`) REFERENCES \`room_promotions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\`
            ADD CONSTRAINT \`FK_7d1c8b7ab4cdc5cc0202795f860\` FOREIGN KEY (\`room_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD CONSTRAINT \`FK_69755d091238005a2c52aee94db\` FOREIGN KEY (\`room_style_id\`) REFERENCES \`room_style\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\`
            ADD CONSTRAINT \`FK_08ad4ff7dab922a7f983b37765a\` FOREIGN KEY (\`room_reservation_id\`) REFERENCES \`room_reservation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\`
            ADD CONSTRAINT \`FK_5dd7f4ecc36f976c910539dce4c\` FOREIGN KEY (\`room_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD CONSTRAINT \`FK_b5826ebf72c182482d176e7e9e4\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD CONSTRAINT \`FK_d1b22493fba76530f4b8252a010\` FOREIGN KEY (\`staff_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD CONSTRAINT \`FK_3ec2a05ea5ec43f782119542612\` FOREIGN KEY (\`staff_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD CONSTRAINT \`FK_5b721f00d66cad7917df1c410a4\` FOREIGN KEY (\`room_reservation_id\`) REFERENCES \`room_reservation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\`
            ADD CONSTRAINT \`FK_bcac79532f1de9ede65a16a29e0\` FOREIGN KEY (\`service_promotion_id\`) REFERENCES \`service_promotions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\`
            ADD CONSTRAINT \`FK_dd319dce8774b66aed1571c58f0\` FOREIGN KEY (\`service_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD CONSTRAINT \`FK_6f20b1d0b535a7d38c7d73fabea\` FOREIGN KEY (\`bill_id\`) REFERENCES \`bills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD CONSTRAINT \`FK_6d04860450b195b2a6e86015fb6\` FOREIGN KEY (\`service_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD CONSTRAINT \`FK_39104b93a3213415b92259a8eb3\` FOREIGN KEY (\`service_promotion_id\`) REFERENCES \`service_promotions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP FOREIGN KEY \`FK_39104b93a3213415b92259a8eb3\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP FOREIGN KEY \`FK_6d04860450b195b2a6e86015fb6\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP FOREIGN KEY \`FK_6f20b1d0b535a7d38c7d73fabea\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\` DROP FOREIGN KEY \`FK_dd319dce8774b66aed1571c58f0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\` DROP FOREIGN KEY \`FK_bcac79532f1de9ede65a16a29e0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_5b721f00d66cad7917df1c410a4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_3ec2a05ea5ec43f782119542612\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP FOREIGN KEY \`FK_d1b22493fba76530f4b8252a010\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP FOREIGN KEY \`FK_b5826ebf72c182482d176e7e9e4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\` DROP FOREIGN KEY \`FK_5dd7f4ecc36f976c910539dce4c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\` DROP FOREIGN KEY \`FK_08ad4ff7dab922a7f983b37765a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP FOREIGN KEY \`FK_69755d091238005a2c52aee94db\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\` DROP FOREIGN KEY \`FK_7d1c8b7ab4cdc5cc0202795f860\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\` DROP FOREIGN KEY \`FK_dcd24e407a4d0b3e9d6716e1f7e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\` DROP FOREIGN KEY \`FK_dc55685d0b45887c32601e94a4b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\` DROP FOREIGN KEY \`FK_1d7ee831e11c8cb4886d840a833\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\` DROP FOREIGN KEY \`FK_ac63078cc8f62739ad968385d60\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\` DROP FOREIGN KEY \`FK_2a60b5baf58effa2425794e7b5e\`
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
            DROP TABLE \`bill_details\`
        `);
        await queryRunner.query(`
            DROP TABLE \`service_promotion_details\`
        `);
        await queryRunner.query(`
            DROP TABLE \`service_promotions\`
        `);
        await queryRunner.query(`
            DROP TABLE \`bills\`
        `);
        await queryRunner.query(`
            DROP TABLE \`room_reservation\`
        `);
        await queryRunner.query(`
            DROP TABLE \`room_reservation_detail\`
        `);
        await queryRunner.query(`
            DROP TABLE \`rooms\`
        `);
        await queryRunner.query(`
            DROP TABLE \`room_promotion_details\`
        `);
        await queryRunner.query(`
            DROP TABLE \`room_promotions\`
        `);
        await queryRunner.query(`
            DROP TABLE \`room_style\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_232b9597ff9a89b2c2fc5d1b5e\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`purchases_order\`
        `);
        await queryRunner.query(`
            DROP TABLE \`purchases_order_details\`
        `);
        await queryRunner.query(`
            DROP TABLE \`goods\`
        `);
        await queryRunner.query(`
            DROP TABLE \`providers\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_81cef023276a6e88202edaae64\` ON \`customers\`
        `);
        await queryRunner.query(`
            DROP TABLE \`customers\`
        `);
    }

}
