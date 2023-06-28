import {
    ObjectIdColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryColumn
} from 'typeorm';

export class baseEntity {
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;
}