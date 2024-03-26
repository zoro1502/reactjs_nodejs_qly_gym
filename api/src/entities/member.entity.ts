import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Index('HoiVien_pkey', ['id'], { unique: true })
@Entity("HoiVien")
export class Member {
	@PrimaryGeneratedColumn({ name: 'MaHoiVien'})
	id: number;

	@Column({name: 'TenHoiVien'})
	name: string;

	@Column({name: 'GioiTinh',nullable: true})
	gender: string;

	@Column({name: 'NamSinh',nullable: true})
	birthday: string;

	@Column({name: 'DienThoai',nullable: true})
	phone: string;

	@Column('float',{name: 'ChieuCao',nullable: true})
	height: number;

	@Column('float',{name: 'CanNang',nullable: true})
	weight: number;

	@Column('text',{name: 'TienSuBenh',nullable: true})
	history: string;

	@Column('text',{name: 'HinhAnh',nullable: true})
	image: string;

	@Column({name: 'MaVach',nullable: true})
	barcode: number;

	@Column({name: 'Email'})
	email: string;

	@Column({name: 'MatKhau'})
	password: string;

	@Column({name: 'tenCty', nullable: true})
	company_name: string;

	@Column( { name: 'TinhTrang', nullable: true})
	status: string;

	@Column({ name: 'CMND', nullable: true})
	cmnd: string;

	// @Column({ name: 'LoaiNVKD', nullable: true})
	// type: string;

	@Column({ name: 'vantay', nullable: true})
	finger_print: string;

	@Column('timestamp', {
		name: 'SinhNhat',
		nullable: true,
	})
	dob: Date;

	@Column({ name: 'MaPhongTap', nullable: true})
	room_id: number;

	@Column('timestamp', {
		name: 'NgayGhiThongTin',
		nullable: true,
	})
	created_at: Date;
}
