import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import { BadRequestException, getSecond, makeId } from 'src/helpers/helper';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { UserValidatorService } from 'src/service/user-validator.service';
import { UserService } from 'src/service/user.service';
import { LoginDto } from 'src/dtos/auth-dto/login.dto';
import { RefreshTokenDto } from 'src/dtos/auth-dto/refresh.dto';
import { UpdateProfileDto } from 'src/dtos/auth-dto/update-profile.dto';
import { RegisterAdminDto } from 'src/dtos/auth-dto/register-admin.dto';
import { RegisterDto } from 'src/dtos/auth-dto/register.dto';

@Injectable()
export class AuthService {

	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
		private readonly validateService: UserValidatorService,
		private mailService: MailService
	) {

	}

	async login(loginDto: LoginDto, repo?: any) {
		let condition: any = {
			username: loginDto.username
		}

		if(repo == 'member') {
			condition = {email: loginDto.username}
		}
		console.log(condition);

		let user = await this.userService.findOneByCondition(condition, repo);
		if (!_.isEmpty(user)) {
			const isPasswordMatching = await bcrypt.compare(
				loginDto.password.trim(),
				user.password
			);
			if (!isPasswordMatching) {
				throw new BadRequestException({ code: 'LG0003', message: 'Mật khẩu không đúng' });
			}
			if (user.status !== 'ACTIVE') {
				throw new BadRequestException({ code: 'LG0004', message: 'Tài khoản chưa được kích hoạt' });
			}
			const token = await this.genTokenByUser(user, repo);
			delete user.password;
			return {
				token_info: token, user
			}
		}
		throw new BadRequestException({ code: 'LG0002', 'message': 'Không tìm thấy tài khoản' });
	}

	async refreshToken(refreshDto: RefreshTokenDto) {

	}

	async genTokenByUser(user: any, repo) {
		const payload: any = {
			username: user?.username,
			id: user?.id || 0,
			type: user?.type,
			email: user?.email,
			repo: repo
		};
		const expIn = Number(process.env.JWT_EXPIRATION_TIME) || 144000;
		payload.expires_at = getSecond() + expIn;
		const accessToken = await this.jwtService.signAsync(payload, { expiresIn: expIn });
		const expires_time = new Date().setSeconds(new Date().getSeconds() + expIn);

		return {
			access_token: accessToken,
			expires_in: expIn,
			expires_time: new Date(expires_time),
		};
	}

	async updateProfile(userId: number, data: UpdateProfileDto, repo?: any) {
		let user = await this.userService.findOneByCondition({ id: userId }, repo);
		if (_.isEmpty(user)) {
			throw new BadRequestException({ code: 'U0002' });
		}
		console.log("repot=========> ", repo, data, userId);
		return await this.userService.update(userId, data, repo);

	}

	async changePassword(userId: number, data: any, repo?: any) {
		let user = await this.userService.findOneByCondition({ id: userId }, repo);
		if (_.isEmpty(user)) {
			throw new BadRequestException({ code: 'U0002' });
		}

		let newPassword = await bcrypt.hash(data.password.trim(), 10);

		await this.userService.update(userId, { password: newPassword }, repo);
		return user;
	}

	async reset(data: any, repo?: any) {
		let user = await this.userService.findOneByCondition({ email: data.email }, repo);
		if (_.isEmpty(user)) {
			throw new BadRequestException({ code: 'U0002' });
		}
		const isPasswordMatching = await bcrypt.compare(
			data.old_password,
			user.password
		);
		if (!isPasswordMatching) {
			throw new BadRequestException({ code: "U0002", message: "Mật khẩu cũ không đúng" })
		}
		let newPassword = await bcrypt.hash(data.password.trim(), 10);
		await this.userService.update(user?.id || 0, { password: newPassword }, repo);
		return user;
	}


	async resetPassword(data: any, repo?: any) {
		let user = await this.userService.findOneByCondition({ email: data.email });
		if (_.isEmpty(user)) {
			throw new BadRequestException({ code: 'U0002' });
		}
		const newPass = makeId(6);
		let newPassword = await bcrypt.hash(newPass, 10);
		await this.userService.update(user?.id || 0, { password: newPassword }, repo);
		// this.mailService.resetPassword({...data, password: newPass});
		return user;
	}

	async findById(userId: number, repo?: any) {
		return await this.userService.findById(userId, repo);
	}

	async registerAdmin(data: RegisterAdminDto, repo?: any) {
		// await this.validateService.validateUser(data, true);

		data.password = await bcrypt.hash(data.password.trim(), 10);
		const newData = await this.userService.store(data, repo);

		return newData;
	}

	async register(data: any, repo?: any) {
		// await this.validateService.validateUser(data, true);
		data.password = await bcrypt.hash(data.password.trim(), 10);
		const newData = await this.userService.store(data, repo);
		return newData;
	}

	async storeUser(data: any, repo?: any) {
		const newData = await this.userService.store(data, repo);
		return newData;
	}
}
