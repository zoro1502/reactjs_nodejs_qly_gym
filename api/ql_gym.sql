
CREATE TABLE `hoivien`  (
  `MaHoiVien` int NOT NULL AUTO_INCREMENT,
  `TenHoiVien` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `GioiTinh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `NamSinh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `DienThoai` varchar(255) UNIQUE,
  `ChieuCao` float NULL DEFAULT NULL,
  `CanNang` float NULL DEFAULT NULL,
  `TienSuBenh` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `HinhAnh` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `MaVach` int NULL DEFAULT NULL,
  `Email` varchar(255) UNIQUE ,
  `MatKhau` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tenCty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `TinhTrang` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `CMND` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `LoaiNVKD` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `vantay` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `SinhNhat` timestamp NULL DEFAULT NULL,
  `MaPhongTap` int NULL DEFAULT NULL,
  `NgayGhiThongTin` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`MaHoiVien`) USING BTREE,
  UNIQUE INDEX `HoiVien_pkey`(`MaHoiVien` ASC) USING BTREE
); 

CREATE TABLE `nhanvien`  (
  `MaNhanVien` int NOT NULL AUTO_INCREMENT,
  `TenNhanVien` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `GioiTinh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `NamSinh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `DienThoai` varchar(255) UNIQUE ,
  `TenDangNhap` varchar(255) UNIQUE ,
  `MatKhau` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `MaTaiKhoan` int NOT NULL,
  `TinhTrang` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `MoTa` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `LoaiNVKD` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `vantay` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `MaPhongTap` int NULL DEFAULT NULL,
  `NgayCapNhat` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`MaNhanVien`) USING BTREE,
  UNIQUE INDEX `NhanVien_pkey`(`MaNhanVien` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for taikhoan
-- ----------------------------
DROP TABLE IF EXISTS `taikhoan`;
CREATE TABLE `taikhoan`  (
  `MaTaiKhoan` int NOT NULL AUTO_INCREMENT,
  `TenTaiKhoan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `TinhTrang` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`MaTaiKhoan`) USING BTREE,
  UNIQUE INDEX `TaiKhoan_pkey`(`MaTaiKhoan` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;


