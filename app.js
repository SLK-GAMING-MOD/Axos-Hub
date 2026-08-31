document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("card-container");
    const searchInput = document.getElementById("search-input");

    // Hàm in thẻ ra giao diện
    function renderCards(data) {
        container.innerHTML = ""; // Xoá data cũ mỗi lần render lại

        if (data.length === 0) {
            container.innerHTML = `<div class="no-result">> Không tìm thấy dữ liệu nào khớp với từ khóa...</div>`;
            return;
        }

        data.forEach((item, index) => {
            const card = document.createElement("div");
            // Khi search xong thì hiện luôn không cần đợi cuộn chuột nữa
            card.className = "script-card silk-reveal visible"; 
            card.style.animationDelay = `${index * 0.05}s`;

            // Build HTML cho 2 nút
            let buttonsHTML = `<a href="${item.primaryBtn.link}" target="_blank" class="btn btn-primary">${item.primaryBtn.label}</a>`;
            
            if (item.secondaryBtn) {
                if (item.secondaryBtn.action === "copy") {
                    buttonsHTML += `<button class="btn btn-secondary copy-btn" data-clipboard="${item.secondaryBtn.data}">${item.secondaryBtn.label}</button>`;
                } else {
                    buttonsHTML += `<a href="${item.secondaryBtn.data}" target="_blank" class="btn btn-secondary">${item.secondaryBtn.label}</a>`;
                }
            }

            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-desc">${item.description}</p>
                    <div class="card-actions">
                        ${buttonsHTML}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Gắn lại sự kiện Copy Script sau mỗi lần render
        bindCopyEvents();
    }

    // Logic Copy Script
    function bindCopyEvents() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const codeToCopy = this.getAttribute('data-clipboard');
                navigator.clipboard.writeText(codeToCopy).then(() => {
                    const originalText = this.innerText;
                    this.innerText = "Đã Copy!";
                    this.style.color = "var(--green)";
                    this.style.borderColor = "var(--green)";
                    setTimeout(() => {
                        this.innerText = originalText;
                        this.style.color = "";
                        this.style.borderColor = "";
                    }, 2000);
                });
            });
        });
    }

    // 1. Chạy lần đầu khi load web
    renderCards(scriptsData);

    // 2. Chức năng Search (Gõ tới đâu lọc tới đó)
    searchInput.addEventListener("input", (e) => {
        const keyword = e.target.value.toLowerCase().trim();
        
        // Lọc theo Title hoặc Description (không phân biệt hoa/thường)
        const filteredData = scriptsData.filter(item => 
            item.title.toLowerCase().includes(keyword) || 
            item.description.toLowerCase().includes(keyword)
        );
        
        renderCards(filteredData);
    });

    // 3. (Tuỳ chọn) Animation mượt mà cho lần cuộn đầu tiên
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.silk-reveal').forEach((el) => {
        revealObs.observe(el);
    });
});
