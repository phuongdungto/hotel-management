import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProperties1687956384609 implements MigrationInterface {
    name = 'UpdateProperties1687956384609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP FOREIGN KEY \`FK_69755d091238005a2c52aee94db\`
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
            ALTER TABLE \`room_reservation\` DROP FOREIGN KEY \`FK_b5826ebf72c182482d176e7e9e4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`customers\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`customers\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`customers\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\` DROP FOREIGN KEY \`FK_dc55685d0b45887c32601e94a4b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`providers\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`providers\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`providers\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\` DROP FOREIGN KEY \`FK_ac63078cc8f62739ad968385d60\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`goods\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`goods\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`goods\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\` DROP FOREIGN KEY \`FK_2a60b5baf58effa2425794e7b5e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\` DROP FOREIGN KEY \`FK_1d7ee831e11c8cb4886d840a833\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP FOREIGN KEY \`FK_d1b22493fba76530f4b8252a010\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_3ec2a05ea5ec43f782119542612\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`birthday\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`birthday\` datetime NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_style\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_style\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_style\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\` DROP FOREIGN KEY \`FK_dcd24e407a4d0b3e9d6716e1f7e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotions\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotions\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotions\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\` DROP FOREIGN KEY \`FK_7d1c8b7ab4cdc5cc0202795f860\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\` DROP FOREIGN KEY \`FK_5dd7f4ecc36f976c910539dce4c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\` DROP FOREIGN KEY \`FK_dd319dce8774b66aed1571c58f0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP FOREIGN KEY \`FK_6d04860450b195b2a6e86015fb6\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\` DROP FOREIGN KEY \`FK_08ad4ff7dab922a7f983b37765a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_5b721f00d66cad7917df1c410a4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP FOREIGN KEY \`FK_6f20b1d0b535a7d38c7d73fabea\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\` DROP FOREIGN KEY \`FK_bcac79532f1de9ede65a16a29e0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP FOREIGN KEY \`FK_39104b93a3213415b92259a8eb3\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotions\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotions\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotions\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD \`id\` varchar(36) NOT NULL PRIMARY KEY
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
            ALTER TABLE \`bill_details\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotions\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotions\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotions\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD CONSTRAINT \`FK_39104b93a3213415b92259a8eb3\` FOREIGN KEY (\`service_promotion_id\`) REFERENCES \`service_promotions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\`
            ADD CONSTRAINT \`FK_bcac79532f1de9ede65a16a29e0\` FOREIGN KEY (\`service_promotion_id\`) REFERENCES \`service_promotions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD CONSTRAINT \`FK_6f20b1d0b535a7d38c7d73fabea\` FOREIGN KEY (\`bill_id\`) REFERENCES \`bills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD CONSTRAINT \`FK_5b721f00d66cad7917df1c410a4\` FOREIGN KEY (\`room_reservation_id\`) REFERENCES \`room_reservation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\`
            ADD CONSTRAINT \`FK_08ad4ff7dab922a7f983b37765a\` FOREIGN KEY (\`room_reservation_id\`) REFERENCES \`room_reservation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`rooms\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`bill_details\`
            ADD CONSTRAINT \`FK_6d04860450b195b2a6e86015fb6\` FOREIGN KEY (\`service_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`service_promotion_details\`
            ADD CONSTRAINT \`FK_dd319dce8774b66aed1571c58f0\` FOREIGN KEY (\`service_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation_detail\`
            ADD CONSTRAINT \`FK_5dd7f4ecc36f976c910539dce4c\` FOREIGN KEY (\`room_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\`
            ADD CONSTRAINT \`FK_7d1c8b7ab4cdc5cc0202795f860\` FOREIGN KEY (\`room_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotions\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotions\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotions\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_promotion_details\`
            ADD CONSTRAINT \`FK_dcd24e407a4d0b3e9d6716e1f7e\` FOREIGN KEY (\`room_promotion_id\`) REFERENCES \`room_promotions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_style\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_style\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_style\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`birthday\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`birthday\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`bills\`
            ADD CONSTRAINT \`FK_3ec2a05ea5ec43f782119542612\` FOREIGN KEY (\`staff_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD CONSTRAINT \`FK_d1b22493fba76530f4b8252a010\` FOREIGN KEY (\`staff_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\`
            ADD CONSTRAINT \`FK_1d7ee831e11c8cb4886d840a833\` FOREIGN KEY (\`staff_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\`
            ADD CONSTRAINT \`FK_2a60b5baf58effa2425794e7b5e\` FOREIGN KEY (\`purchase_order_id\`) REFERENCES \`purchases_order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`goods\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`goods\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`goods\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order_details\`
            ADD CONSTRAINT \`FK_ac63078cc8f62739ad968385d60\` FOREIGN KEY (\`goods_id\`) REFERENCES \`goods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`providers\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`providers\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`providers\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`purchases_order\`
            ADD CONSTRAINT \`FK_dc55685d0b45887c32601e94a4b\` FOREIGN KEY (\`provider_id\`) REFERENCES \`providers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`customers\` DROP COLUMN \`id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`customers\`
            ADD \`id\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`customers\`
            ADD PRIMARY KEY (\`id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`room_reservation\`
            ADD CONSTRAINT \`FK_b5826ebf72c182482d176e7e9e4\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE \`rooms\`
            ADD CONSTRAINT \`FK_69755d091238005a2c52aee94db\` FOREIGN KEY (\`room_style_id\`) REFERENCES \`room_style\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
