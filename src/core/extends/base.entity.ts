import { Field, ObjectType } from '@nestjs/graphql';
import {
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
export class baseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @DeleteDateColumn({ default: null })
    deletedAt: Date;
}