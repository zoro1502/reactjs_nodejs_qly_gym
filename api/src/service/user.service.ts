import { Injectable } from '@nestjs/common';
import { IPaging } from 'src/helpers/helper';
import { AccountRepository, EmployeeRepository, MemberRepository } from 'src/repository';
import { Like, Not } from 'typeorm';

@Injectable()
export class UserService {

	constructor(
		private memberRepo: MemberRepository,
		private employeeRepo: EmployeeRepository,
		private accountRepo: AccountRepository,
	) {

	}

	async getLists(paging: IPaging, filters: any, repo?: any) {
		let db: any = this.accountRepo;
		if (repo == 'member') db = this.memberRepo;
		if (repo == 'employee') db = this.employeeRepo;
		return await db.getLists(paging, filters);
	}

	async store(data: any, repo?: any) {
		let db: any = this.accountRepo;
		if (repo == 'member') db = this.memberRepo;
		if (repo == 'employee') db = this.employeeRepo;
		const newData: any = await db.create({ ...data });
		await db.save(newData);
		return newData;
	}

	async update(id: number, data: any, repo?: any) {
		let db: any = this.accountRepo;
		if (repo == 'member') db = this.memberRepo;
		if (repo == 'employee') db = this.employeeRepo;
		await db.update(id, data);
		return await this.findById(id, repo);
	}

	async deleteById(id: number, repo?: any) {
		let db: any = this.accountRepo;
		if (repo == 'member') db = this.memberRepo;
		if (repo == 'employee') db = this.employeeRepo;
		return await db.delete(id);
	}

	async findById(id: number, repo?: any) {
		let db: any = this.accountRepo;
		if (repo == 'member') db = this.memberRepo;
		if (repo == 'employee') db = this.employeeRepo;
		return await db.findById(id, repo);
	}


	async findOneByCondition(condition: any = {}, repo?: any) {
		let db: any = this.accountRepo;
		if (repo == 'member') db = this.memberRepo;
		if (repo == 'employee') db = this.employeeRepo;
		return await db.findOne(
			{
				where: condition
			}
		);
	}

}
