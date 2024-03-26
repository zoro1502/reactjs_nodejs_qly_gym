import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Index('TaiKhoan_pkey', ['id'], { unique: true })
@Entity("TaiKhoan")
export class Account {
	@PrimaryGeneratedColumn({ name: 'MaTaiKhoan'})
	id: number;

	@Column({name: 'TenTaiKhoan'})
	name: string;

	@Column( { name: 'TinhTrang', nullable: true})
	status: string;
}
