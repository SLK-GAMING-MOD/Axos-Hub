// Dữ liệu hiển thị (Admin edit tại đây)
const scriptsData = [
    {
        title: "Động Sói Hub",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
        description: "Script Hub đa năng phát triển trên nền tảng Luau. Tích hợp ESP, Aimbot và các tính năng tối ưu FPS cho game sinh tồn.",
        primaryBtn: {
            label: "Mở Link Tải",
            link: "https://github.com/SLK-GAMING-MOD"
        },
        // Nút thứ 2 (tuỳ chọn) - Thích hợp để người dùng copy Loadstring
        secondaryBtn: {
            label: "Copy Script",
            action: "copy", // Logic copy sẽ được xử lý trong app.js
            data: "loadstring(game:HttpGet('https://raw.githubusercontent.com/SLK-GAMING-MOD/Dong-Soi-Hub/main/source.lua'))()"
        }
    },
    {
        title: "ESP Framework Trực Quan",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop",
        description: "Module ESP hoàn chỉnh sử dụng Tracers, 2D Bounding Boxes và Highlights. Hỗ trợ track Survivors và Killers mượt mà.",
        primaryBtn: {
            label: "Xem Source",
            link: "#"
        },
        secondaryBtn: null // Nếu không cần nút 2, để null
    },
    {
        title: "WindUI Custom Theme",
        image: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?q=80&w=800&auto=format&fit=crop",
        description: "Bộ giao diện tuỳ biến bằng WindUI library. Chỉnh sửa ColorPickers, Button Gradients và Layout chuẩn.",
        primaryBtn: {
            label: "Mở GitHub",
            link: "#"
        },
        secondaryBtn: {
            label: "Xem Hướng Dẫn",
            action: "link",
            data: "#"
        }
    }
];
