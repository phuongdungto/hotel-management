import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { createUserInput } from './users.input';
import * as bcrypt from 'bcrypt';
import { ROUNDS_NUMBER } from '../core/constant'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class usersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService
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
            throw new BadRequestException('Username or NationalID existed.')
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
}
