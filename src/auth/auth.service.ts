import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { signinInput } from './auth.input';
import { signinType } from './auth.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService
    ) { }

    async signin(user: signinInput): Promise<signinType> {
        const usersign = await this.userRepo.findOne({
            where: { username: user.username }
        })
        if (!usersign) {
            throw new BadRequestException('username or password is incorrect');
        }
        const isValid = await bcrypt.compare(user.password, usersign.password);

        if (!isValid) {
            throw new BadRequestException('username or password is incorrect');
        }
        const payload = {
            id: usersign.id,
            username: usersign.username,
            firstname: usersign.firstname,
            firstlastname: usersign.lastname,
            role: usersign.role
        };
        const accessToken = await this.jwtService.signAsync(payload);
        delete usersign.password
        const info = new signinType()
        Object.assign(info, { ...usersign, accessToken })
        return info
    }
}
