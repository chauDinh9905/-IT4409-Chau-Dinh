document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.querySelector("#news-list") || document.querySelector(".danh-sach-tin");
    const totalViewsEl = document.querySelector("#tong-luot-xem");
    const tagListEl = document.querySelector("#danh-sach-tag");

    // Đọc dữ liệu từ file JSON mẫu (hoặc API)
    fetch("data/news.json") // Thay đổi đường dẫn file JSON nếu cần thiết theo dự án của bạn
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể tải dữ liệu JSON");
            }
            return response.json();
        })
        .then(data => {
            hienThiDanhSachTin(data);
            tinhToanThongKe(data);
        })
        .catch(error => {
            console.error("Lỗi:", error);
            // Dữ liệu dự phòng nếu chưa có file JSON thực tế
            const sampleData = [
                { tieuDe: "Tin tức công nghệ 2026", luotXem: 120, noiDung: "Nội dung chi tiết tin công nghệ...", tags: ["Tech", "AI"] },
                { tieuDe: "Xu hướng phát triển Web", luotXem: 85, noiDung: "Nội dung chi tiết phát triển web...", tags: ["Web", "JS"] }
            ];
            hienThiDanhSachTin(sampleData);
            tinhToanThongKe(sampleData);
        });

    // 1. Hiển thị danh sách bài đăng lên giao diện
    function hienThiDanhSachTin(dsTin) {
        if (!newsContainer) return;
        newsContainer.innerHTML = "";
        
        dsTin.forEach(tin => {
            let itemHTML = `
                <article class="news-item">
                    <h3>${tin.tieuDe}</h3>
                    <p class="views">Lượt xem: <span>${tin.luotXem || 0}</span></p>
                    <p>${tin.noiDung}</p>
                    <div class="tags">
                        ${tin.tags ? tin.tags.map(t => `<span class="tag">#${t}</span>`).join(" ") : ""}
                    </div>
                </article>
            `;
            newsContainer.innerHTML += itemHTML;
        });
    }

    // 2. Thống kê tổng lượt xem và danh sách các thẻ tag
    function tinhToanThongKe(dsTin) {
        // Tổng số lượt xem
        let tongLuotXem = dsTin.reduce((sum, tin) => sum + (tin.luotXem || 0), 0);
        if (totalViewsEl) {
            totalViewsEl.textContent = tongLuotXem;
        }

        // Lọc danh sách thẻ tag độc lập (không trùng lặp)
        let setTags = new Set();
        dsTin.forEach(tin => {
            if (tin.tags && Array.isArray(tin.tags)) {
                tin.tags.forEach(t => setTags.add(t));
            }
        });

        if (tagListEl) {
            tagListEl.innerHTML = "";
            setTags.forEach(tag => {
                let tagSpan = document.createElement("span");
                tagSpan.className = "tag-item";
                tagSpan.textContent = `#${tag}`;
                tagListEl.appendChild(tagSpan);
            });
        }
    }
});