import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import * as _ from 'lodash';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { BadRequestException, BaseResponse, HTTP_STATUS } from 'src/helpers/helper';
import { LoginDto } from 'src/dtos/auth-dto/login.dto';
import { RegisterDto, RegisterFeDto } from 'src/dtos/auth-dto/register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }


	@Post('login/:repo')
	@ApiResponse({ status: 200, description: 'success'})
	async loginEmployee(
		@Body() formDto: LoginDto,
		@Param('repo') repo:any
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.login(formDto, repo);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@LoginDto----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Post('reset-password/:repo')
	@ApiResponse({ status: 200, description: 'success' })
	async resetPasswordMember(
		@Body() formDto: any,
		@Param('repo') repo:any
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.resetPassword(formDto, repo);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@resetpass----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}


	@Put('/profile/:repo')
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: 'success' })
	async updateProfile(
		@Request() req: any,
		@Body() formDto: any,
		@Param('repo') repo:any
	) {
		try {
			const user_id = req?.user?.id || null;
			if (!user_id) {
				throw new BadRequestException({ code: 'LG0401' });
			}
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			console.log(formDto);
			const result = await this.authService.updateProfile(user_id, formDto, repo);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@UpdateProfile----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	// @Put('/change-password/:repo')
	// @UseGuards(JwtGuard)
	// @ApiResponse({ status: 200, description: 'success' })
	// async changePassword(
	// 	@Request() req: any,
	// 	@Body() formDto: any,
	// 	@Param('repo') repo:any
	// ) {
	// 	try {
	// 		const user_id = req?.user?.id || null;
	// 		if (!user_id) {
	// 			throw new BadRequestException({ code: 'LG0401' });
	// 		}
	// 		if (_.isEmpty(formDto)) {
	// 			throw new BadRequestException({ code: 'F0001' });
	// 		}
	// 		const result = await this.authService.updateProfile(user_id, formDto, repo);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@UpdateProfile----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }


	// @Put('/password/reset/:repo')
	// @ApiResponse({ status: 200, description: 'success' })
	// async reset(
	// 	@Request() req: any,
	// 	@Body() formDto: any,
	// 	@Param('repo') repo:any
	// ) {
	// 	try {

	// 		if (_.isEmpty(formDto)) {
	// 			throw new BadRequestException({ code: 'F0001' });
	// 		}

	// 		const result = await this.authService.reset(formDto);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@UpdateProfile----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }

	@Get('/profile/:repo')
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: 'success' })
	async profile(
		@Request() req: any,
		@Param('repo') repo:any
	) {
		try {
			const user_id = req?.user?.id || null;
			if (!user_id) {
				throw new BadRequestException({ code: 'LG0001' });
			}
			const result = await this.authService.findById(user_id, repo);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@UpdateProfile----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}


	@Post('register/cms')
	@ApiResponse({ status: 200, description: 'success' })
	async register(
		@Body() formDto: RegisterDto,
		@Param('repo') repo:any
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			if(formDto.account) {
				const account = await this.authService.storeUser(formDto.account);
				if(!account ) throw new BadRequestException({ code: 'F0001', message: "Đăng ký thất bại" });
				console.log("account-------> ", account);
				formDto.account_id = account.id;
				delete formDto.account;
			}
			const result = await this.authService.register(formDto, 'employee');
			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@register----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Post('register/fe')
	@ApiResponse({ status: 200, description: 'success' })
	async registerFe(
		@Body() formDto: RegisterFeDto,
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			
			const result = await this.authService.register(formDto, 'member');

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@register----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}
}
