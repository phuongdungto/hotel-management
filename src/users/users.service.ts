import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { Roles } from '../core/enum';
import { userType } from './users.type';
import { createUserInput } from './users.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class usersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {

    }

    async createUser(user: createUserInput): Promise<User> {
        const newuser = {
            ...user,
            id: uuid()
        }
        return await this.userRepo.save(newuser);
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userRepo.findOneBy({ id });
        return user;
    }
}
