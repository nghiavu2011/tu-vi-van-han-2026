/**
 * Logic for calculating 2026 fortune and monthly details
 */
import { dichCung } from './tuvi';

/**
 * Calculate fortune score (0-100) based on chart
 */
export function calcFortuneScore(laSo, targetYear = 2026) {
    // Simplistic scoring logic for demo
    // In a real app, this would analyze sao, ngu hanh, etc.
    let score = 65; // Base score

    const chiNamSinh = laSo.info.chiNam;
    const chiTarget = targetYear === 2026 ? "Ngọ" : "";

    if (chiNamSinh === "Tý") score -= 15; // Phá Thái Tuế
    if (chiNamSinh === "Ngọ") score -= 10; // Trực Thái Tuế
    if (chiNamSinh === "Dần" || chiNamSinh === "Tuất") score += 10; // Tam hợp

    return Math.min(100, Math.max(0, score));
}

/**
 * Get monthly fortune for a specific year
 */
export function getMonthlyFortune(laSo, year = 2026) {
    const months = [
        { name: 'Tháng Giêng', canChi: 'Canh Dần', tiet: 'Lập Xuân', score: 75, opportunity: 'Hợp tác mới', risk: 'Chi tiêu', desc: 'Khởi đầu năm mới với nhiều năng lượng tích cực. Quý nhân hỗ trợ công việc hanh thông.' },
        { name: 'Tháng Hai', canChi: 'Tân Mão', tiet: 'Kinh Trập', score: 45, opportunity: 'Tình cảm', risk: 'Tranh cãi', desc: 'Cần cẩn trọng trong lời ăn tiếng nói, tránh thị phi nơi công sở. Sức khỏe cần lưu ý.' },
        { name: 'Tháng Ba', canChi: 'Nhâm Thìn', tiet: 'Thanh Minh', score: 85, opportunity: 'Tài lộc', risk: 'Lãng phí', desc: 'Thời điểm vàng để đầu tư kinh doanh. Các dự án sẽ có bước tiến triển vượt bậc.' },
        { name: 'Tháng Tư', canChi: 'Quý Tỵ', tiet: 'Lập Hạ', score: 70, opportunity: 'Gia đình', risk: 'Sức khỏe', desc: 'Gia đạo êm ấm, có tin vui về nhà cửa. Sự nghiệp ổn định, nên dành thời gian nghỉ ngơi.' },
        { name: 'Tháng Năm', canChi: 'Giáp Ngọ', tiet: 'Mang Chủng', score: 40, opportunity: 'Đổi mới', risk: 'Áp lực', desc: 'Áp lực công việc tăng cao. Yêu cầu sự tập trung tuyệt đối để tránh sai sót pháp lý.' },
        { name: 'Tháng Sáu', canChi: 'Ất Mùi', tiet: 'Tiểu Thử', score: 60, opportunity: 'Học vấn', risk: 'Di chuyển', desc: 'Tháng thích hợp để học hỏi kiến thức mới. Cẩn thận khi tham gia giao thông.' },
        { name: 'Tháng Bảy', canChi: 'Bính Thân', tiet: 'Lập Thu', score: 35, opportunity: 'Dự án cũ', risk: 'Hao tài', desc: 'Tháng "Cô hồn", hạn chế các việc lớn. Cần bảo quản tài sản cá nhân cẩn thận.' },
        { name: 'Tháng Tám', canChi: 'Đinh Dậu', tiet: 'Bạch Lộ', score: 80, opportunity: 'Thăng tiến', risk: 'Ganh ghét', desc: 'Công việc có tiến triển tốt, được sếp tin cậy. Đề phòng tiểu nhân ganh ghét.' },
        { name: 'Tháng Chín', canChi: 'Mậu Tuất', tiet: 'Hàn Lộ', score: 72, opportunity: 'Đất đai', risk: 'Pháp lý', desc: 'Dễ có lộc về đất đai hoặc bất động sản. Cần minh bạch trong các giấy tờ ký kết.' },
        { name: 'Tháng Mười', canChi: 'Kỷ Hợi', tiet: 'Lập Đông', score: 55, opportunity: 'Du lịch', risk: 'Thời tiết', desc: 'Thích hợp cho các chuyển đi xa hoặc thay đổi không gian sống. Chú ý giữ ấm cơ thể.' },
        { name: 'Tháng Mười Một', canChi: 'Canh Tý', tiet: 'Đại Tuyết', score: 50, opportunity: 'Tất niên', risk: 'Sức khỏe', desc: 'Công việc bộn bề dịp cuối năm. Đừng vì quá mải mê công việc mà quên chăm sóc bản thân.' },
        { name: 'Tháng Chạp', canChi: 'Tân Sửu', tiet: 'Tiểu Hàn', score: 90, opportunity: 'Thu hoạch', risk: 'Kế hoạch', desc: 'Tháng gặt hái thành quả sau một năm nỗ lực. Tài lộc dồi dào, chuẩn bị đón Tết an khang.' },
    ];

    return months;
}

/**
 * Get 10-year period (Dai Van) details
 */
export function getDaiVan(laSo) {
    const cucSo = laSo.info.cucSo;
    const isNam = laSo.info.gioiTinh === 'Nam';
    const amDuongCanNam = laSo.info.tenNamAm.includes('Giáp') || laSo.info.tenNamAm.includes('Bính') ||
        laSo.info.tenNamAm.includes('Mậu') || laSo.info.tenNamAm.includes('Canh') ||
        laSo.info.tenNamAm.includes('Nhâm') ? 1 : -1;

    const chieu = isNam ? amDuongCanNam : -amDuongCanNam;

    const daiVan = [];
    for (let i = 0; i < 8; i++) {
        const ageStart = cucSo + i * 10;
        const ageEnd = ageStart + 9;
        daiVan.push({
            range: `${ageStart} - ${ageEnd} tuổi`,
            theme: i % 2 === 0 ? 'Phát triển & Xây dựng' : 'Ổn định & Tích lũy',
            desc: 'Giai đoạn này mang lại nhiều cơ hội để khẳng định bản thân trong xã hội.'
        });
    }
    return daiVan;
}
