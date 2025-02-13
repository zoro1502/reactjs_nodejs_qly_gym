import { Like, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Paging } from "../helpers/response/Paging";
import { User } from "src/entities/user.entity";
import { IPaging } from "src/helpers/interface/common.interface";
import { Employee } from "src/entities";

export class EmployeeRepository extends Repository<Employee>{
    constructor(
        @InjectRepository(Employee)
        private repository: Repository<Employee>,
    ) {
        super(
            repository.target,
            repository.manager,
            repository.queryRunner,
        );
    }

	async buildCondition(filter: any) {
		let condition: any = {};
		if (filter) {
			if (filter.email && filter.email.trim() != '') condition.email = Like(`%${filter.email.trim()}%`);
			if (filter.phone && filter.phone.trim() != '') condition.phone = Like(`%${filter.phone.trim()}%`);
			if (filter.status) condition.status = filter.status;
			if (filter.id) condition.id = filter.id;
			if (filter.type) condition.type = filter.type;
			if (filter.ignore_id && filter.id != filter.ignore_id) condition.id = Not(filter.ignore_id);
			if (filter.role_id) condition.roles = {
				id: filter.role_id
			}
		}
		return condition;
	}

    async getLists(paging: IPaging, filters){
        let condition: any = {};
        if (filters.hot) condition.hot = filters.hot;
        if (filters.status) condition.status = filters.status;

        const [data, total] =  await this.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });

        return { result: data, meta: new Paging(paging.page, paging.page_size, total) };
    }

    async findById(id: number)
    {
        return await this.findOne({
            where: {
                id: id
            }
        });
    }
}
