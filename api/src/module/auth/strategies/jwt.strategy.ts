import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET')
        });
    }

    async validate(payload: any) {
		let condition: any = {
			username: payload.username
		}
		if(payload.repo == 'member') {
			condition = {email: payload.email}
		}
        return this.userService.findOneByCondition(condition, payload.repo);
    }
}