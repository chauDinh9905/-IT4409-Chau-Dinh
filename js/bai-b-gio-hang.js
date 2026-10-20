class GioHang {
    constructor() {
        this.dsDong = []; // Mảng chứa các dòng sản phẩm: { id, ten, loai, gia, soLuong }
    }

    // Thêm sản phẩm vào giỏ hàng
    them(sp, soLuong = 1) {
        if (!sp || soLuong <= 0) return;

        // Kiểm tra xem sản phẩm đã có trong giỏ chưa
        let existingItem = this.dsDong.find(item => item.id === sp.id);
        if (existingItem) {
            existingItem.soLuong += soLuong;
        } else {
            // Sử dụng bản sao để đảm bảo tính độc lập với DANH_MUC bên ngoài
            this.dsDong.push({
                id: sp.id,
                ten: sp.ten,
                loai: sp.loai,
                gia: sp.gia,
                soLuong: soLuong
            });
        }
    }

    // Lấy danh sách giỏ hàng (trả về bản sao để bảo vệ dữ liệu bên trong)
    layDanhSach() {
        return this.dsDong.map(item => ({ ...item }));
    }

    // Tính tổng tiền giỏ hàng
    tinhTongTien() {
        return this.dsDong.reduce((total, item) => total + (item.gia * item.soLuong), 0);
    }

    // Tìm dòng sản phẩm có giá trị lớn nhất hoặc số lượng đắt nhất tùy logic bài toán
    dongDatNhat() {
        if (this.dsDong.length === 0) return null;
        let maxItem = this.dsDong.reduce((prev, current) => 
            (current.gia > prev.gia) ? current : prev
        );
        return { ...maxItem };
    }
}