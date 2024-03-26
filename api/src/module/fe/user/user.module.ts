import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AccountRepository, EmployeeRepository, MemberRepository, UserRepository } from 'src/repository';
import { UserService } from 'src/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Member } from 'src/entities/member.entity';
import { Employee } from 'src/entities/employees.entity';
import { Account } from 'src/entities/account.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			 Member, Employee, Account
		])
	],
	controllers: [UserController],
	providers: [
		UserService, 
		MemberRepository, 
		EmployeeRepository, 
		AccountRepository
	],
	exports: [UserService]
})
export class UserModule { }
