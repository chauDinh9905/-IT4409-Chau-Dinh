document.addEventListener("DOMContentLoaded", function () {
    const anhLon = document.querySelector("#anh-lon img");
    const chuThich = document.querySelector("#chu-thich");
    const danhSachAnhNho = document.querySelectorAll("#anh-nho img");
    const oTimKiem = document.querySelector("#o-tim-kiem");
    const nutKhoa = document.querySelector("#nut-khoa");

    let isLocked = false;

    // 1. Đổi ảnh lớn khi bấm vào ảnh nhỏ
    danhSachAnhNho.forEach(function (img) {
        img.addEventListener("click", function (e) {
            if (isLocked) return; // Nếu bị khóa thì không làm gì

            // Đổi nguồn ảnh lớn
            anhLon.src = this.src;
            
            // Cập nhật chú thích
            let tenFile = this.src.split("/").pop();
            chuThich.textContent = `Đang xem: ${tenFile}`;

            // Thêm viền nổi bật cho ảnh nhỏ vừa chọn, bỏ viền các ảnh khác
            danhSachAnhNho.forEach(i => i.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // 2. Hiệu ứng ô tìm kiếm (focus / blur)
    if (oTimKiem) {
        let placeholderGoc = oTimKiem.placeholder;
        oTimKiem.addEventListener("focus", function () {
            this.placeholder = "";
        });
        oTimKiem.addEventListener("blur", function () {
            if (this.value === "") {
                this.placeholder = placeholderGoc;
            }
        });
    }

    // 3. Khóa thư viện ảnh
    if (nutKhoa) {
        nutKhoa.addEventListener("click", function () {
            isLocked = !isLocked;
            this.textContent = isLocked ? "Mở khóa thư viện" : "Khóa thư viện";
        });
    }
});