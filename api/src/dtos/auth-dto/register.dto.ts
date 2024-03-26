import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsIn, IsInt, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { USER_CONST } from "src/helpers/helper";

export class RegisterDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	username: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20, {message: 'Password max length is 20 characters'})
	@MinLength(6, {message: 'Password min length is 6 characters'})
	password: string;


	@ApiProperty()
	@IsOptional()
	@IsIn(['ACTIVE', 'INACTIVE'])
	status?: string;


	@ApiProperty()
	@IsOptional()
	gender: string;


	@ApiProperty()
	@IsOptional()
	birthday: string;

	@ApiProperty()
	@IsOptional()
	phone: string;
	
	updated_at = new Date();
	
	@ApiProperty()
	@IsOptional()
	type: string;

	@ApiProperty()
	@IsOptional()
	account_id: number;

	@ApiProperty()
	@IsOptional()
	desc: string;

	@ApiProperty()
	@IsOptional()
	finger_print: string;

	@ApiProperty()
	@IsOptional()
	room_id: number;

	@ApiProperty()
	@IsNotEmptyObject()
	account: any;
	
}

export class RegisterFeDto {


	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20, {message: 'Password max length is 20 characters'})
	@MinLength(6, {message: 'Password min length is 6 characters'})
	password: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsOptional()
	status?: string;


	@ApiProperty()
	@IsOptional()
	@IsIn(['male', 'female', 'other'])
	gender: string;


	@ApiProperty()
	@IsOptional()
	dob: any;

	@ApiProperty()
	@IsOptional()
	birthday: any;

	@ApiProperty()
	@IsOptional()
	phone: string;
	
	created_at = new Date();
	
	@ApiProperty()
	@IsOptional()
	height: number;

	@ApiProperty()
	@IsOptional()
	weight: number;

	@ApiProperty()
	@IsOptional()
	history: string;

	@ApiProperty()
	@IsOptional()
	image: string;

	@ApiProperty()
	@IsOptional()
	barcode: number;

	@ApiProperty()
	@IsOptional()
	company_name: string;

	@ApiProperty()
	@IsOptional()
	cmnd: string;

	@ApiProperty()
	@IsOptional()
	finger_print: string;

	@ApiProperty()
	@IsOptional()
	room_id: number;
}