import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { createUserInput, getUsersInput, updateUserInput } from './users.input';
import * as bcrypt from 'bcrypt';
import { ROUNDS_NUMBER } from '../core/constant'
import { getUsersType } from './users.types';
import { BuildPagination } from '../core/utils/pagination.utils';

@Injectable()
export class usersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {

    }

    async createUser(user: createUserInput): Promise<User> {
        const exist = await this.userRepo.findOne({
            where: [
                { username: user.username },
                { nationalId: user.nationalId }
            ]
        })

        if (exist) {
            throw new BadRequestException('Username or NationalID already exists.')
        }
        user.password = await bcrypt.hash(user.password, ROUNDS_NUMBER);
        return await this.userRepo.save(user);
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

    async getUserByUsername(username: string): Promise<User> {
        const user = await this.userRepo.findOneBy({ username });
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

    async updateUser(id: string, input: updateUserInput): Promise<User> {
        const user = await this.userRepo.findOneBy({ id });
        let exists = undefined;
        if (input.nationalId) {
            exists = await this.userRepo.findOneBy({ nationalId: input.nationalId })
        }
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        if (exists) {
            throw new BadRequestException("NationalId already exists")
        }
        Object.assign(user, input);
        const newUser = await this.userRepo.save(user);
        delete newUser.password;
        return newUser
    }

    async deleteUser(id: string) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        await this.userRepo.softDelete(user.id)
    }

    async getUsers(input: getUsersInput): Promise<getUsersType> {
        const query = BuildPagination(User, input);
        const [rows, count] = await this.userRepo.findAndCount({
            ...query
        });
        return { totalPage: Math.ceil(count / input.limit), users: rows };
    }
}
