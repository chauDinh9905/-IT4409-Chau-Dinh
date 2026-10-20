// Hàm trả về ngày hiện dạng chuỗi (phục vụ đăng tin)
function homNay() {
    let d = new Date();
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector("#list");
    const boDem = document.querySelector("#bo-dem");
    const oTimKiem = document.querySelector("#o-tim-kiem");
    const khongThay = document.querySelector("#khong-thay");
    const nutDang = document.querySelector("#nut-dang");
    const txtTieuDe = document.querySelector("#tieu-de");
    const txtNoiDung = document.querySelector("#noi-dung");
    const baoLoi = document.querySelector("#bao-loi");

    function capNhatBoDem() {
        let items = list.querySelectorAll("li");
        let tongSo = items.length;
        let hienThi = 0;
        items.forEach(item => {
            if (!item.classList.contains("an")) {
                hienThi++;
            }
        });
        if (boDem) {
            boDem.textContent = `Đang hiển thị ${hienThi}/${tongSo} tin`;
        }

        // Xử lý hiển thị thông báo không tìm thấy
        if (khongThay) {
            if (hienThi === 0 && oTimKiem && oTimKiem.value.trim() !== "") {
                khongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
                khongThay.classList.remove("an");
            } else {
                khongThay.classList.add("an");
            }
        }
    }

    // F1 & F2: Lọc tin khi gõ
    if (oTimKiem) {
        oTimKiem.addEventListener("keyup", function () {
            let keyword = this.value.toLowerCase().trim();
            let items = list.querySelectorAll("li");

            items.forEach(item => {
                let h3 = item.querySelector("h3");
                let p = item.querySelector("p");
                let textH3 = h3 ? h3.textContent.toLowerCase() : "";
                let textP = p ? p.textContent.toLowerCase() : "";

                if (textH3.includes(keyword) || textP.includes(keyword)) {
                    item.classList.remove("an");
                } else {
                    item.classList.add("an");
                }
            });

            capNhatBoDem();
        });
    }

    // F4: Mở rộng / Thu gọn nội dung (Event Delegation trên #list)
    if (list) {
        list.addEventListener("click", function (e) {
            if (e.target.classList.contains("more")) {
                let btn = e.target;
                let p = btn.previousElementSibling; // Thẻ p nội dung đứng trước nút
                if (p && p.tagName === "P") {
                    p.classList.toggle("day-du");
                    if (p.classList.contains("day-du")) {
                        btn.textContent = "Thu gọn <<";
                    } else {
                        btn.textContent = "Read more >>";
                    }
                }
            }
        });
    }

    // F5: Đăng tin nhanh
    if (nutDang) {
        nutDang.addEventListener("click", function () {
            let tieuDe = txtTieuDe ? txtTieuDe.value.trim() : "";
            let noiDung = txtNoiDung ? txtNoiDung.value.trim() : "";

            if (tieuDe === "" || noiDung === "") {
                if (baoLoi) {
                    baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
                }
                return;
            }

            if (baoLoi) {
                baoLoi.textContent = "";
            }

            // Tạo phần tử li mới
            let li = document.createElement("li");
            li.innerHTML = `
                <span class="time">${homNay()}</span>
                <h3>${tieuDe}</h3>
                <p>${noiDung}</p>
                <button type="button" class="more">Read more >></button>
            `;

            // Chèn lên đầu danh sách
            list.insertBefore(li, list.firstChild);

            // Reset form
            if (txtTieuDe) txtTieuDe.value = "";
            if (txtNoiDung) txtNoiDung.value = "";

            // Áp dụng lại bộ lọc hiện tại nếu có từ khóa đang tìm
            if (oTimKiem && oTimKiem.value.trim() !== "") {
                let event = new Event("keyup");
                oTimKiem.dispatchEvent(event);
            } else {
                capNhatBoDem();
            }
        });
    }

    // Khởi chạy bộ đếm ban đầu
    capNhatBoDem();
});