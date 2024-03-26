import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Index('NhanVien_pkey', ['id'], { unique: true })
@Entity("NhanVien")
export class Employee {
	@PrimaryGeneratedColumn({ name: 'MaNhanVien'})
	id: number;

	@Column({name: 'TenNhanVien'})
	name: string;

	@Column({name: 'GioiTinh',nullable: true})
	gender: string;

	@Column({name: 'NamSinh',nullable: true})
	birthday: string;

	@Column({name: 'DienThoai',nullable: true})
	phone: string;

	@Column({name: 'TenDangNhap'})
	username: string;

	@Column({name: 'MatKhau'})
	password: string;

	@Column({name: 'MaTaiKhoan'})
	account_id: number;

	@Column( { name: 'TinhTrang', nullable: true})
	status: string;

	@Column('text', { name: 'MoTa', nullable: true})
	desc: string;

	@Column({ name: 'LoaiNVKD', nullable: true})
	type: string;

	@Column({ name: 'vantay', nullable: true})
	finger_print: string;

	@Column({ name: 'MaPhongTap', nullable: true})
	room_id: number;

	@Column('timestamp', {
		name: 'NgayCapNhat',
		nullable: true,
	})
	updated_at: Date;
}
