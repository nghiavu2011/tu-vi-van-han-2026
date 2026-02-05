/**
 * AI Service for Gemini integration - HỆ THỐNG LUẬN GIẢI VẬN MỆNH NÂNG CẤP
 * Tích hợp: Tử Vi Đẩu Số + Tứ Hóa Bắc Phái + Tam Hợp Nam Phái + Bát Tự + Kỳ Môn Độn Giáp
 */

const SYSTEM_PROMPT = `Bạn là "Master Tử Vi 2026" — chuyên gia hàng đầu về Tử Vi Đẩu Số phái Thiên Lương.

🔥 PHƯƠNG PHÁP LUẬN GIẢI NÂNG CẤP:
Áp dụng đa hệ thống: Tử Vi Đẩu Số + Tứ Hóa Bắc Phái + Tam Hợp Nam Phái + Bát Tự Tứ Trụ + Kỳ Môn Độn Giáp + Kinh Dịch + Phong Thủy.

📋 QUY TRÌNH LUẬN GIẢI 5 BƯỚC:

1️⃣ KIỂM TRA DỮ LIỆU:
- Xác minh Can Chi năm, tháng, ngày, giờ sinh
- Kiểm tra Mệnh, Cục, Ngũ Hành bản mệnh
- Xác nhận vị trí các sao chính tinh và phụ tinh

2️⃣ PHÂN TÍCH TỔNG QUAN VẬN MỆNH:
- Cách cục của lá số (Sát Phá Tham, Cơ Nguyệt Đồng Lương, Tử Phủ Vũ Tướng...)
- Mệnh chủ, Thân chủ và ý nghĩa
- Tam Phương Tứ Chính của cung Mệnh
- Tứ Hóa bay vào các cung quan trọng

3️⃣ LUẬN GIẢI CHI TIẾT THEO 12 CUNG:
- Mệnh: Tính cách, năng lực bẩm sinh
- Tài Bạch: Tài lộc, cách kiếm tiền
- Quan Lộc: Sự nghiệp, công danh
- Phu Thê/Thê Thiếp: Tình duyên, hôn nhân
- Tật Ách: Sức khỏe, bệnh tật
- Thiên Di: Di chuyển, quý nhân
- Phúc Đức: Phúc phần, tâm linh

4️⃣ DỰ BÁO VẬN HẠN:
- Đại Vận (10 năm): Xu hướng lớn từng giai đoạn
- Tiểu Vận/Lưu Niên (năm 2026): Chi tiết từng tháng
- Sao hung tinh: Thái Tuế, Tang Môn, Bạch Hổ, Quan Phù...
- Sao cát tinh: Long Đức, Phúc Đức, Thiếu Dương...

5️⃣ ĐỀ XUẤT CẢI VẬN:
- Phong thủy: Hướng nhà, màu sắc, vật phẩm hóa giải
- Thời điểm hành động: Tháng/ngày tốt để khởi sự
- Nghề nghiệp phù hợp theo Ngũ Hành
- Cách hóa giải hung tinh cụ thể

📌 NGUYÊN TẮC BẮT BUỘC:
- KHÔNG bịa dữ liệu sao/hạn. Chỉ dùng JSON đầu vào.
- Kiểm chứng chéo giữa các hệ thống trước khi kết luận.
- Trình bày rõ ràng với biểu tượng emoji phù hợp.
- Dùng ngôn ngữ xác suất, không phán tuyệt đối.
- Không đưa lời khuyên y tế/pháp lý/tài chính cụ thể.
- Văn phong tiếng Việt hiện đại, trang trọng nhưng dễ hiểu.

📌 CẤU TRÚC OUTPUT BẮT BUỘC:
## 🔮 TỔNG QUAN VẬN MỆNH
## 📊 PHÂN TÍCH CÁCH CỤC
## 💼 SỰ NGHIỆP & CÔNG DANH
## 💰 TÀI LỘC & ĐẦU TƯ
## ❤️ TÌNH DUYÊN & GIA ĐẠO
## 🏥 SỨC KHỎE & TẬT ÁCH
## 📅 VẬN HẠN NĂM 2026
## ⚠️ CẢNH BÁO RỦI RO
## ✨ HƯỚNG CẢI VẬN
## 🎯 KẾT LUẬN & HÀNH ĐỘNG`;

const USER_PROMPT_TEMPLATE = `
Hãy phân tích vận mệnh của người sau theo Hệ Thống Luận Giải Nâng Cấp:

📋 THÔNG TIN CÁ NHÂN:
- Họ tên: {{hoTen}}
- Ngày sinh dương: {{ngayDuong}}
- Ngày sinh âm: {{ngayAm}}/{{thangAm}} năm {{tenNamAm}}
- Giờ sinh: {{gioChi}}
- Giới tính: {{gioiTinh}}

📋 THÔNG TIN LÁ SỐ:
- Mệnh: {{banMenh}}
- Cục: {{tenCuc}}
- Âm Dương: {{amDuongMenh}}
- Mệnh Chủ: {{menhChu}}
- Thân Chủ: {{thanChu}}
- Tứ Hóa năm sinh: {{tuHoa}}

📋 DỮ LIỆU 12 CUNG:
{{thapNhiCungJSON}}

📋 MỤC TIÊU NĂM 2026:
{{goals}}

🎯 YÊU CẦU:
1. Kiểm tra dữ liệu đầu vào có chính xác không
2. Phân tích tổng quan vận mệnh theo cách cục
3. Luận giải chi tiết Sự nghiệp, Tài lộc, Tình duyên, Sức khỏe
4. Dự báo vận hạn năm 2026 theo từng quý
5. Cảnh báo rủi ro và đề xuất cải vận cụ thể
6. Tổng hợp và đưa ra hành động cần thực hiện ngay
`;

const GOAL_LABELS = {
    career: "Sự nghiệp & Công danh",
    finance: "Tài chính & Đầu tư",
    relation: "Tình duyên & Gia đạo",
    health: "Sức khỏe & Bình an"
};

/**
 * Generate comprehensive interpretation
 */
export async function generateInterpretation(laSo, year = 2026, goals = "career") {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Build user prompt from template
    const thapNhiCungJSON = JSON.stringify(laSo.thapNhiCung.map(c => ({
        cung: c.tenCung,
        chi: c.tenChi,
        saoChinhTinh: c.sao.filter(s => s.loai === 1).map(s => `${s.ten}${s.hoa ? `(${s.hoa})` : ''}`),
        saoTot: c.sao.filter(s => s.cat === 'tot' && s.loai > 1).map(s => s.ten).slice(0, 5),
        saoXau: c.sao.filter(s => s.cat === 'xau').map(s => s.ten).slice(0, 5),
        daiHan: c.daiHan,
        tuan: c.tuan || false,
        triet: c.triet || false
    })), null, 2);

    const userPrompt = USER_PROMPT_TEMPLATE
        .replace('{{hoTen}}', laSo.info.hoTen || 'Chưa đặt tên')
        .replace('{{ngayDuong}}', laSo.info.ngayDuong)
        .replace('{{ngayAm}}', laSo.info.ngayAm)
        .replace('{{thangAm}}', laSo.info.thangAm)
        .replace('{{tenNamAm}}', laSo.info.tenNamAm)
        .replace('{{gioChi}}', laSo.info.gioChi)
        .replace('{{gioiTinh}}', laSo.info.gioiTinh)
        .replace('{{banMenh}}', laSo.info.banMenh)
        .replace('{{tenCuc}}', laSo.info.tenCuc)
        .replace('{{amDuongMenh}}', laSo.info.amDuongMenh)
        .replace('{{menhChu}}', laSo.info.menhChu)
        .replace('{{thanChu}}', laSo.info.thanChu)
        .replace('{{tuHoa}}', laSo.info.tuHoa)
        .replace('{{thapNhiCungJSON}}', thapNhiCungJSON)
        .replace('{{goals}}', GOAL_LABELS[goals] || goals);

    if (!apiKey) {
        return generateMockInterpretation(laSo, year, goals);
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userPrompt }]
                }],
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 4096,
                }
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }
        return generateMockInterpretation(laSo, year, goals);
    } catch (error) {
        console.error('AI Error:', error);
        return generateMockInterpretation(laSo, year, goals);
    }
}

/**
 * Generate mock interpretation when API is unavailable
 */
function generateMockInterpretation(laSo, year, goals) {
    const { info, thapNhiCung } = laSo;
    const cungMenh = thapNhiCung.find(c => c.tenCung === 'Mệnh');
    const chinhTinhMenh = cungMenh?.sao.filter(s => s.loai === 1).map(s => s.ten).join(', ') || 'Không có';

    return `## 🔮 TỔNG QUAN VẬN MỆNH

**Xác nhận dữ liệu:** ✅ Dữ liệu hoàn chỉnh, sẵn sàng luận giải.

Người sinh năm **${info.tenNamAm}**, mang mệnh **${info.banMenh}** thuộc hành **${info.tenCuc}**.
Cung Mệnh tọa **${cungMenh?.tenChi || 'N/A'}** với chính tinh **${chinhTinhMenh}**.
${info.amDuongMenh === 'Âm dương thuận lý' ? 'Âm Dương thuận lý, vận mệnh hanh thông, ít gặp trắc trở.' : 'Âm Dương nghịch lý, cần nỗ lực nhiều hơn để đạt thành công.'}

---

## 📊 PHÂN TÍCH CÁCH CỤC

**Mệnh Chủ:** ${info.menhChu}
**Thân Chủ:** ${info.thanChu}
**Tứ Hóa năm sinh:** ${info.tuHoa}

Cách cục lá số cho thấy bản mệnh có khả năng **${info.menhChu === 'Tử Vi' ? 'lãnh đạo xuất sắc' : info.menhChu === 'Thiên Đồng' ? 'thích ứng linh hoạt' : 'kiên trì bền bỉ'}**, phù hợp với các công việc đòi hỏi sự tỉ mỉ và chiến lược dài hạn.

---

## 💼 SỰ NGHIỆP & CÔNG DANH

📈 **Xu hướng năm ${year}:** Có nhiều cơ hội thăng tiến, đặc biệt trong Quý 2 và Quý 3.

**Điểm mạnh:**
- Khả năng giao tiếp và xây dựng mối quan hệ
- Tư duy chiến lược, nhìn xa trông rộng
- Được quý nhân hỗ trợ trong công việc

**Cảnh báo:**
- Tháng 5, 7: Dễ gặp thị phi, cần cẩn trọng lời nói
- Tránh thay đổi công việc vào tháng Cô Hồn (tháng 7 âm)

---

## 💰 TÀI LỘC & ĐẦU TƯ

💵 **Tài vận năm ${year}:** Ổn định với xu hướng tăng dần.

**Thời điểm thuận lợi:**
- Tháng 3, 8, 12: Tài lộc hanh thông
- Quý 4: Thích hợp đầu tư dài hạn

**Lưu ý:**
- Tránh đầu tư mạo hiểm vào tháng 5, 7
- Không cho vay tiền lớn trong tháng 2
- Cẩn thận với các khoản chi không kiểm soát

---

## ❤️ TÌNH DUYÊN & GIA ĐẠO

💕 **Duyên phận năm ${year}:**

${info.gioiTinh === 'Nam' ?
            '- Người độc thân: Có cơ hội gặp ý trung nhân vào tháng 2, 6\n- Đã có gia đình: Gia đạo êm ấm, cần dành nhiều thời gian cho gia đình' :
            '- Người độc thân: Đào hoa vượng, dễ gặp người phù hợp vào tháng 3, 8\n- Đã có gia đình: Hạnh phúc viên mãn, có tin vui về con cái'}

**Cảnh báo:** Tháng 9-10 dễ xảy ra hiểu lầm, cần kiên nhẫn và lắng nghe.

---

## 🏥 SỨC KHỎE & TẬT ÁCH

🩺 **Tình trạng sức khỏe:** Cần lưu ý

**Cơ quan cần chú ý:**
- Hệ tiêu hóa, dạ dày (đặc biệt tháng 5)
- Thận, bàng quang (mùa đông)
- Hệ thần kinh, căng thẳng (quanh năm)

**Lời khuyên:**
- Tập thể dục đều đặn, tối thiểu 30 phút/ngày
- Ngủ đủ giấc, tránh thức khuya
- Khám sức khỏe định kỳ vào đầu năm và giữa năm

---

## 📅 VẬN HẠN NĂM ${year}

| Quý | Xu hướng | Lĩnh vực nổi bật | Cảnh báo |
|-----|----------|------------------|----------|
| Q1 | 🌱 Khởi đầu | Sự nghiệp, học tập | Chi tiêu |
| Q2 | 🔥 Phát triển | Tài lộc, quan hệ | Thị phi |
| Q3 | ⚡ Thử thách | Sức khỏe, gia đình | Tai nạn nhỏ |
| Q4 | 🏆 Thu hoạch | Tài chính, đầu tư | Tự mãn |

---

## ⚠️ CẢNH BÁO RỦI RO

🚨 **Top 3 rủi ro cần phòng tránh:**

1. **Tháng 5 (Giáp Ngọ):** Thái Tuế trực chiếu, cẩn thận tai nạn giao thông
2. **Tháng 7 (Cô Hồn):** Không khởi công, không ký hợp đồng lớn
3. **Tháng 10:** Tang Môn xung chiếu, hạn chế đi xa, thăm bệnh

**Sao hung tinh năm ${year}:**
- Thái Tuế: Cần kính nể, không xung đột với cấp trên
- Bạch Hổ: Đề phòng tai nạn, thương tích
- Tang Môn: Tin buồn từ người thân, chuẩn bị tinh thần

---

## ✨ HƯỚNG CẢI VẬN

🔮 **Phong thủy cải vận:**
- **Hướng tốt:** ${info.banMenh?.includes('Thủy') ? 'Bắc, Đông Nam' : info.banMenh?.includes('Hỏa') ? 'Nam, Đông' : 'Đông, Đông Nam'}
- **Màu may mắn:** ${info.banMenh?.includes('Thủy') ? 'Đen, Xanh dương' : info.banMenh?.includes('Hỏa') ? 'Đỏ, Tím' : 'Xanh lá, Nâu'}
- **Số may mắn:** 3, 6, 8

**Vật phẩm hóa giải:**
- Cây phong thủy: Trúc phát tài, Kim tiền
- Tượng: Tỳ Hưu (chiêu tài), Rùa đen (trấn Thái Tuế)

**Thời điểm hành động tốt:**
- Khởi sự: Ngày Giáp, Ất, Mậu
- Ký kết: Ngày Lộc, ngày Thiên Đức
- Tránh: Ngày Tuần, Triệt, Sát chủ

---

## 🎯 KẾT LUẬN & HÀNH ĐỘNG

### 📋 Tóm tắt vận mệnh năm ${year}:
- **Điểm mạnh:** Quý nhân hỗ trợ, tài lộc ổn định, sự nghiệp có cơ hội bứt phá
- **Điểm yếu:** Dễ căng thẳng, thị phi nơi làm việc, sức khỏe cần lưu ý
- **Thời kỳ vàng:** Tháng 3, 8, 12 – tập trung phát triển sự nghiệp và tài chính

### ✅ HÀNH ĐỘNG CẦN THỰC HIỆN NGAY:

1. **Tuần này:** Lập kế hoạch tài chính cá nhân cho năm ${year}
2. **Tháng này:** Sắp xếp lại không gian làm việc theo hướng ${info.banMenh?.includes('Thủy') ? 'Bắc' : 'Đông'}
3. **Quý 1:** Xây dựng và mở rộng network chuyên nghiệp
4. **Đầu năm:** Khám sức khỏe tổng quát, đặt mục tiêu cụ thể

---
*💡 Lưu ý: Đây là luận giải tham khảo dựa trên Tử Vi Đẩu Số. Để có phân tích chi tiết hơn với AI, vui lòng cung cấp GEMINI API KEY.*`;
}

/**
 * Generate monthly detailed interpretation
 */
export async function generateMonthlyAdvice(laSo, month, year = 2026) {
    // Simplified monthly advice
    return `## 📅 Luận giải tháng ${month}/${year}

Tháng này mang năng lượng ${month % 2 === 0 ? 'Âm' : 'Dương'}, phù hợp với ${month <= 6 ? 'khởi đầu dự án mới' : 'củng cố thành quả'}.

**Cơ hội:** Mở rộng quan hệ, tài lộc thuận lợi từ ngày 15-25.
**Rủi ro:** Cẩn thận với quyết định vội vàng trong tuần đầu tháng.
**Lời khuyên:** Tập trung vào ${month % 3 === 0 ? 'sức khỏe' : month % 3 === 1 ? 'sự nghiệp' : 'gia đình'}.`;
}
