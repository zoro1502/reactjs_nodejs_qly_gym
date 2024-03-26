import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Index('user_pkey', ['id'], { unique: true })
@Entity("user")
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	test: string;

	@Column()
	email: string;

	@Column()
	avatar: string;

	@Column()
	address: string;

	@Column()
	phone: string;

	@Column()
	gender: string;

	@Column()
	password: string;

	@Column('smallint', { name: 'status', nullable: true, default: 1 })
	status: number;

	@Column('smallint', { name: 'type', nullable: true, default: 1 })
	type: number;

	@Column('timestamp', {
		name: 'dob',
		default: () => 'now()',
	})
	dob: Date;
	
	@Column('timestamp', {
		name: 'created_at',
		default: () => 'now()',
	})
	created_at: Date;

	@Column('timestamp', {
		name: 'updated_at',
		nullable: true,
		default: () => 'now()',
	})
	updated_at: Date;
}
