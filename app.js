document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("card-container");
    const searchInput = document.getElementById("search-input");
    const searchClear = document.getElementById("search-clear");
    const searchEmpty = document.getElementById("search-empty");

    // Scroll Reveal (dùng chung cho mọi lần render)
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    // Chức năng Copy Script (dành cho nút phụ)
    function bindCopyButtons() {
        container.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function () {
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

    // Render danh sách card từ 1 mảng dữ liệu bất kỳ (dùng cho cả render đầu và kết quả tìm kiếm)
    function renderCards(list) {
        container.innerHTML = "";

        list.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "script-card silk-reveal";
            card.style.transitionDelay = `${index * 0.1}s`; // Stagger animation

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

        searchEmpty.style.display = list.length === 0 ? "block" : "none";

        bindCopyButtons();
        container.querySelectorAll('.silk-reveal').forEach((el) => revealObs.observe(el));
    }

    // Bỏ dấu tiếng Việt để tìm kiếm không phân biệt có dấu / không dấu
    function stripDiacritics(str) {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase();
    }

    function filterScripts(keyword) {
        const kw = stripDiacritics(keyword.trim());
        if (!kw) return scriptsData;

        return scriptsData.filter(item => {
            const haystack = stripDiacritics(`${item.title} ${item.description}`);
            return haystack.includes(kw);
        });
    }

    // 1. Render toàn bộ dữ liệu ban đầu
    renderCards(scriptsData);

    // 2. Xử lý tìm kiếm realtime
    searchInput.addEventListener("input", () => {
        const value = searchInput.value;
        searchClear.classList.toggle("visible", value.length > 0);
        renderCards(filterScripts(value));
    });

    searchClear.addEventListener("click", () => {
        searchInput.value = "";
        searchClear.classList.remove("visible");
        renderCards(scriptsData);
        searchInput.focus();
    });
});
