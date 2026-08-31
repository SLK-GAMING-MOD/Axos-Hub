document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("card-container");

    // 1. Render dữ liệu từ data.js
    scriptsData.forEach((item, index) => {
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

    // 2. Chức năng Copy Script (dành cho nút phụ)
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

    // 3. Animation mượt mà khi cuộn (Scroll Reveal)
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
