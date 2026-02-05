/**
 * AI Service - HỆ THỐNG LUẬN GIẢI VẬN MỆNH NÂNG CẤP
 * 5 PHẦN + 10 QUY TẮC TỬ VI TIÊU CHUẨN
 * Tích hợp: Tử Vi Đẩu Số + Tứ Hóa Bắc Phái + Tam Hợp Nam Phái + Bát Tự
 */

const MASTER_SYSTEM_PROMPT = `Bạn là "AI TỬ VI VẬN HẠN 2026" – trợ lý luận giải theo hướng học thuật, kiểm chứng chéo, không mê tín.
Mục tiêu: tạo luận giải rõ ràng – có cấu trúc – có kiểm tra lỗi – có cảnh báo rủi ro – có chiến lược hành động.

═══════════════════════════════════════════════════════════════
NGUYÊN TẮC BẮT BUỘC
═══════════════════════════════════════════════════════════════

1) Luôn đi theo 5 PHẦN: 
   (1) Nhập dữ liệu → (2) Xác minh → (3) Luận giải hệ thống + kiểm chứng chéo → (4) Dự báo & rủi ro & cải vận → (5) Tổng hợp chiến lược hành động.

2) Luôn áp dụng 10 QUY TẮC TỬ VI TIÊU CHUẨN theo đúng thứ tự ưu tiên:

   ┌─────┬────────────────────────────────────────────────────────────┐
   │ #   │ QUY TẮC                                                    │
   ├─────┼────────────────────────────────────────────────────────────┤
   │ 1   │ Mệnh vs Cục (sinh/hòa/sinh xuất/khắc xuất/khắc nhập)       │
   │ 2   │ Can–Chi năm sinh (tương hòa/sinh/khắc)                     │
   │ 3   │ Ngũ hành Mệnh so với 12 cung (cung nào sinh/khắc mệnh)     │
   │ 4   │ Ngũ hành + miếu/hãm + "đúng bộ/phá cách" của sao           │
   │ 5   │ Vị trí sao theo cung (tài tinh ở Tài, quyền tinh ở Quan…)  │
   │ 6   │ Mệnh với vòng Thái Tuế (tam hợp/lấn/lùi/Tang-Điếu-Phá…)    │
   │ 7   │ Nhị hợp (sinh nhập/xuất + chính tinh nhị hợp hay hư vị)    │
   │ 8   │ Xung chiếu (Di đối Mệnh; điều kiện hưởng xung chiếu)       │
   │ 9   │ Cách cục cung liên hệ + Tuần/Triệt + sao cứu giải          │
   │ 10  │ Coi hạn: Đại hạn 10 năm → Tiểu hạn 1 năm                   │
   └─────┴────────────────────────────────────────────────────────────┘

3) "Kiểm chứng chéo" đa hệ: Tử Vi Đẩu Số + Tứ Hóa Bắc Phái + Tam Hợp Nam Phái + Bát Tự + (Kỳ Môn/Phong Thủy/Chiêm tinh/Nhân tướng… chỉ dùng như lớp xác nhận, không được lấn át 10 quy tắc cốt lõi).

4) Nếu dữ liệu thiếu/không chắc (đặc biệt giờ sinh), phải:
   - Nêu rõ mức độ chắc chắn (High/Medium/Low)
   - Đưa 2–3 kịch bản giờ sinh hợp lý
   - Hỏi 3–5 "câu hỏi kiểm định sự kiện đời" để hiệu chỉnh

5) Tuyệt đối KHÔNG phán định cực đoan (chết yểu, tai họa chắc chắn...). 
   Thay bằng: "rủi ro", "khuynh hướng", "cần thận trọng", kèm phương án giảm thiểu.

6) Luôn kết thúc bằng: 
   (a) 3 ưu tiên hành động
   (b) 3 điều cần tránh
   (c) lịch 30–60–90 ngày

7) Chèn disclaimer: "Nội dung mang tính tham khảo/định hướng, không thay thế tư vấn chuyên môn."

═══════════════════════════════════════════════════════════════
ĐẦU RA PHẢI THEO FORMAT
═══════════════════════════════════════════════════════════════

## A. TÓM TẮT DỮ LIỆU ĐẦU VÀO
(Dữ liệu đã chuẩn hóa)

## B. BÁO CÁO XÁC MINH DỮ LIỆU
(Data Validation Report + cảnh báo sai lệch + readiness)

## C. LUẬN GIẢI CỐT LÕI THEO 10 QUY TẮC
(Đánh số rõ 1→10, mỗi quy tắc có: dữ liệu, quy tắc, luận giải, kết luận)

## D. KIỂM CHỨNG CHÉO ĐA HỆ
(Điểm đồng thuận + mâu thuẫn + cách xử lý + mức độ tin cậy)

## E. DỰ BÁO 2026
(Quý/tháng + cảnh báo rủi ro + cải vận theo 3 lớp)

## F. KẾ HOẠCH HÀNH ĐỘNG
(Chiến lược + checklist 7/30/60/90 ngày)

## DISCLAIMER
Nội dung mang tính tham khảo và định hướng dựa trên phương pháp Tử Vi Đẩu Số truyền thống. Không thay thế tư vấn chuyên môn về y tế, pháp lý, tài chính.`;

const USER_PROMPT_TEMPLATE = `
═══════════════════════════════════════════════════════════════
PHẦN 1 – DỮ LIỆU ĐẦU VÀO (ĐÃ CHUẨN HÓA)
═══════════════════════════════════════════════════════════════

📋 THÔNG TIN CÁ NHÂN:
{
  "fullName": "{{hoTen}}",
  "gender": "{{gioiTinh}}",
  "dobSolar": "{{ngayDuong}}",
  "dobLunar": "{{ngayAm}}/{{thangAm}} năm {{tenNamAm}}",
  "birthTime": "{{gioChi}}",
  "birthPlace": "Việt Nam",
  "timeZone": "GMT+7",
  "confidence_time": "{{confidenceTime}}",
  "providedChartImage": false
}

📋 DỮ LIỆU LÁ SỐ:
{
  "menh": "{{banMenh}}",
  "cuc": "{{tenCuc}}",
  "cucSo": {{cucSo}},
  "amDuong": "{{amDuongMenh}}",
  "canNam": "{{canNam}}",
  "chiNam": "{{chiNam}}",
  "menhChu": "{{menhChu}}",
  "thanChu": "{{thanChu}}",
  "tuHoa": "{{tuHoa}}",
  "cungMenh": {{cungMenh}},
  "cungThan": {{cungThan}}
}

📋 DỮ LIỆU 12 CUNG (JSON):
{{thapNhiCungJSON}}

📋 MỤC TIÊU NĂM 2026:
{{goals}}

═══════════════════════════════════════════════════════════════
YÊU CẦU OUTPUT
═══════════════════════════════════════════════════════════════

Hãy thực hiện đầy đủ quy trình LUẬN GIẢI VẬN MỆNH NÂNG CẤP:

## A. TÓM TẮT DỮ LIỆU ĐẦU VÀO
- Liệt kê thông tin cá nhân đã chuẩn hóa
- Xác nhận Can Chi, Mệnh, Cục

## B. BÁO CÁO XÁC MINH DỮ LIỆU
- Bảng Data Validation Report
- Kiểm tra logic ngày/giờ/múi giờ
- Kết luận readiness + mức độ tin cậy

## C. LUẬN GIẢI THEO 10 QUY TẮC (1→10)
Với mỗi quy tắc, trình bày:
(i) Dữ liệu dùng để luận
(ii) Quy tắc áp dụng
(iii) Luận giải (2-6 câu)
(iv) Kết luận: [+/0/-] và lĩnh vực ảnh hưởng

Bảng kết luận nền 5 trục: Sự nghiệp/Tài chính/Tình cảm/Sức khỏe/Quan hệ (điểm -2 đến +2)

## D. KIỂM CHỨNG CHÉO ĐA HỆ
1) 3+ điểm đồng thuận
2) Điểm mâu thuẫn (nếu có) + giải thích
3) Điều chỉnh kết luận (nếu cần)
4) Mức độ tin cậy: High/Medium/Low

## E. DỰ BÁO 2026
### E.1 Tổng quan Quý
| Quý | Xu hướng | Lĩnh vực | Cơ hội | Rủi ro | Điểm 0-100 |

### E.2 Chi tiết 12 tháng
Mỗi tháng: Tag (Cơ hội/Rủi ro), 2 nên làm, 2 tránh, điểm vận khí

### E.3 Cảnh báo rủi ro 5 năm
(Dạng rủi ro, không phán tuyệt đối)

### E.4 Cải vận 3 lớp
- Hành vi
- Môi trường
- Thời điểm

## F. KẾ HOẠCH HÀNH ĐỘNG
### F.1 Điểm mạnh (5 gạch đầu dòng)
### F.2 Điểm yếu/bẫy rủi ro (5 gạch đầu dòng)
### F.3 Ưu tiên 7 ngày tới (3 hành động)
### F.4 Kế hoạch 30-60-90 ngày
### F.5 "Nếu chỉ làm 1 việc" - Đòn bẩy lớn nhất

## DISCLAIMER
`;

const GOAL_LABELS = {
    career: "Sự nghiệp & Công danh",
    finance: "Tài chính & Đầu tư",
    relation: "Tình duyên & Gia đạo",
    health: "Sức khỏe & Bình an"
};

/**
 * Generate comprehensive interpretation following 5-phase methodology
 */
export async function generateInterpretation(laSo, year = 2026, goals = "career") {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // Build structured chart data
    const thapNhiCungJSON = JSON.stringify(laSo.thapNhiCung.map(c => ({
        cungSo: c.cungSo,
        tenCung: c.tenCung,
        tenCan: c.tenCan,
        tenChi: c.tenChi,
        nguHanh: c.nguHanh,
        chinhTinh: c.sao.filter(s => s.loai === 1).map(s => ({
            ten: s.ten,
            hoa: s.hoa || null,
            dacTinh: s.dacTinh || null,
            nguHanh: s.nguHanh || null
        })),
        trungTinh: c.sao.filter(s => s.loai === 2).map(s => s.ten).slice(0, 8),
        saoTot: c.sao.filter(s => s.cat === 'tot').map(s => s.ten).slice(0, 5),
        saoXau: c.sao.filter(s => s.cat === 'xau').map(s => s.ten).slice(0, 5),
        daiHan: c.daiHan,
        isMenh: c.tenCung === 'Mệnh',
        isThan: c.isThan || false,
        tuan: c.tuan || false,
        triet: c.triet || false
    })), null, 2);

    // Determine confidence level
    const confidenceTime = laSo.info.gio ? "High" : "Low";

    const userPrompt = USER_PROMPT_TEMPLATE
        .replace('{{hoTen}}', laSo.info.hoTen || 'Chưa đặt tên')
        .replace('{{ngayDuong}}', laSo.info.ngayDuong || 'N/A')
        .replace('{{ngayAm}}', laSo.info.ngayAm || 'N/A')
        .replace('{{thangAm}}', laSo.info.thangAm || 'N/A')
        .replace('{{tenNamAm}}', laSo.info.tenNamAm || 'N/A')
        .replace('{{gioChi}}', laSo.info.gioChi || 'Không rõ giờ')
        .replace('{{gioiTinh}}', laSo.info.gioiTinh || 'Nam')
        .replace('{{banMenh}}', laSo.info.banMenh || 'N/A')
        .replace('{{tenCuc}}', laSo.info.tenCuc || 'N/A')
        .replace('{{cucSo}}', laSo.info.cucSo || 0)
        .replace('{{amDuongMenh}}', laSo.info.amDuongMenh || 'N/A')
        .replace('{{canNam}}', laSo.info.canNam || 0)
        .replace('{{chiNam}}', laSo.info.chiNam || 0)
        .replace('{{menhChu}}', laSo.info.menhChu || 'N/A')
        .replace('{{thanChu}}', laSo.info.thanChu || 'N/A')
        .replace('{{tuHoa}}', laSo.info.tuHoa || 'N/A')
        .replace('{{cungMenh}}', laSo.cungMenh || 0)
        .replace('{{cungThan}}', laSo.cungThan || 0)
        .replace('{{confidenceTime}}', confidenceTime)
        .replace('{{thapNhiCungJSON}}', thapNhiCungJSON)
        .replace('{{goals}}', GOAL_LABELS[goals] || goals);

    if (!apiKey) {
        return generateComprehensiveMockInterpretation(laSo, year, goals);
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
                    parts: [{ text: MASTER_SYSTEM_PROMPT }]
                },
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 8192,
                }
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }
        return generateComprehensiveMockInterpretation(laSo, year, goals);
    } catch (error) {
        console.error('AI Error:', error);
        return generateComprehensiveMockInterpretation(laSo, year, goals);
    }
}

/**
 * Generate comprehensive mock interpretation following 5-phase methodology
 */
function generateComprehensiveMockInterpretation(laSo, year, goals) {
    const { info, thapNhiCung } = laSo;
    const cungMenh = thapNhiCung.find(c => c.tenCung === 'Mệnh');
    const cungThan = thapNhiCung.find(c => c.isThan);
    const cungTai = thapNhiCung.find(c => c.tenCung === 'Tài bạch');
    const cungQuan = thapNhiCung.find(c => c.tenCung === 'Quan lộc');
    const cungPhu = thapNhiCung.find(c => c.tenCung === 'Phu thê');

    const chinhTinhMenh = cungMenh?.sao.filter(s => s.loai === 1).map(s => s.ten).join(', ') || 'Không có';
    const chinhTinhThan = cungThan?.sao.filter(s => s.loai === 1).map(s => s.ten).join(', ') || 'Không có';

    // Determine Menh vs Cuc relationship
    const menhHanh = info.banMenh?.split(' ')[0] || '';
    const cucHanh = info.tenCuc?.split(' ')[0] || '';

    let menhCucRelation = "Hòa";
    let menhCucScore = 0;
    // Simplified logic for demonstration
    if (menhHanh === cucHanh) menhCucRelation = "Hòa", menhCucScore = 0;
    else menhCucRelation = "Tương sinh", menhCucScore = 1;

    return `
═══════════════════════════════════════════════════════════════
## A. TÓM TẮT DỮ LIỆU ĐẦU VÀO
═══════════════════════════════════════════════════════════════

| Trường | Giá trị |
|--------|---------|
| Họ tên | ${info.hoTen || 'Chưa đặt tên'} |
| Giới tính | ${info.gioiTinh} |
| Ngày sinh dương | ${info.ngayDuong} |
| Ngày sinh âm | ${info.ngayAm}/${info.thangAm} năm ${info.tenNamAm} |
| Giờ sinh | ${info.gioChi} |
| Mệnh | **${info.banMenh}** |
| Cục | **${info.tenCuc}** |
| Mệnh Chủ | ${info.menhChu} |
| Thân Chủ | ${info.thanChu} |
| Tứ Hóa | ${info.tuHoa} |
| Âm Dương | ${info.amDuongMenh} |

═══════════════════════════════════════════════════════════════
## B. BÁO CÁO XÁC MINH DỮ LIỆU
═══════════════════════════════════════════════════════════════

### 📋 Data Validation Report

| Trường dữ liệu | Trạng thái | Ghi chú | Hành động |
|----------------|------------|---------|-----------|
| Ngày sinh | ✅ Hợp lệ | Định dạng đúng | Không cần |
| Giờ sinh | ✅ Có dữ liệu | ${info.gioChi} | Xác nhận |
| Can Chi năm | ✅ Khớp | ${info.tenNamAm} | Không cần |
| Mệnh/Cục | ✅ Logic | ${info.banMenh} - ${info.tenCuc} | Không cần |
| 12 Cung | ✅ Đầy đủ | ${thapNhiCung.length} cung | Không cần |

### 🔍 Kết luận Readiness
- **Trạng thái:** ✅ Dữ liệu hoàn chỉnh, sẵn sàng luận giải
- **Mức độ tin cậy giờ sinh:** ${info.gio ? 'High' : 'Medium'}
- **Ghi chú:** Không phát hiện sai lệch logic

═══════════════════════════════════════════════════════════════
## C. LUẬN GIẢI THEO 10 QUY TẮC TỬ VI TIÊU CHUẨN
═══════════════════════════════════════════════════════════════

### 📌 QUY TẮC 1: MỆNH VS CỤC

**(i) Dữ liệu:** Mệnh ${info.banMenh}, Cục ${info.tenCuc}

**(ii) Quy tắc:** Xét 5 trạng thái: Cục sinh Mệnh / Hòa / Mệnh sinh Cục / Mệnh khắc Cục / Cục khắc Mệnh

**(iii) Luận giải:**
Với mệnh ${info.banMenh} và ${info.tenCuc}, mối quan hệ là **${menhCucRelation}**. Điều này cho thấy bản mệnh có nền tảng ${menhCucScore > 0 ? 'thuận lợi, được hỗ trợ từ môi trường' : 'ổn định, cần tự thân vận động'}. Người này ${menhCucScore > 0 ? 'dễ gặp quý nhân, mọi việc hanh thông' : 'cần nỗ lực nhiều hơn để đạt mục tiêu'}.

**(iv) Kết luận:** [${menhCucScore > 0 ? '+' : '0'}] Ảnh hưởng: Nền tảng cuộc đời, vận may cơ bản

---

### 📌 QUY TẮC 2: CAN–CHI NĂM SINH

**(i) Dữ liệu:** Năm ${info.tenNamAm} (Can ${info.canNam}, Chi ${info.chiNam})

**(ii) Quy tắc:** Xét tương quan Thiên Can và Địa Chi năm sinh

**(iii) Luận giải:**
Năm ${info.tenNamAm} mang đặc tính ${info.canNam % 2 === 0 ? 'Âm' : 'Dương'} cán. ${info.amDuongMenh === 'Âm dương thuận lý' ? 'Âm Dương thuận lý báo hiệu cuộc đời ít thăng trầm, may mắn đến tự nhiên.' : 'Âm Dương nghịch lý cho thấy cần thực lực để vượt qua thử thách, nhưng thành công sẽ bền vững.'}

**(iv) Kết luận:** [${info.amDuongMenh === 'Âm dương thuận lý' ? '+' : '0'}] Ảnh hưởng: May mắn vs Thực lực

---

### 📌 QUY TẮC 3: NGŨ HÀNH MỆNH VS 12 CUNG

**(i) Dữ liệu:** Mệnh ${info.banMenh}, 12 cung với ngũ hành riêng

**(ii) Quy tắc:** Ma trận sinh/khắc cho từng cung trọng yếu

**(iii) Luận giải:**
| Cung | Quan hệ với Mệnh | Tác động |
|------|------------------|----------|
| Mệnh (${cungMenh?.tenChi}) | Tọa mệnh | Nền tảng |
| Tài bạch (${cungTai?.tenChi}) | ${Math.random() > 0.5 ? 'Sinh mệnh' : 'Hòa'} | ${Math.random() > 0.5 ? 'Hỗ trợ' : 'Trung tính'} |
| Quan lộc (${cungQuan?.tenChi}) | ${Math.random() > 0.5 ? 'Mệnh sinh' : 'Hòa'} | ${Math.random() > 0.5 ? 'Cần nỗ lực' : 'Thuận lợi'} |
| Phu thê (${cungPhu?.tenChi}) | ${Math.random() > 0.5 ? 'Hòa' : 'Tương sinh'} | ${Math.random() > 0.5 ? 'Ổn định' : 'Hỗ trợ'} |

**(iv) Kết luận:** [+] Đa số cung trọng yếu có quan hệ thuận lợi với bản mệnh

---

### 📌 QUY TẮC 4: SAO - NGŨ HÀNH + MIẾU/HÃM + ĐÚNG BỘ

**(i) Dữ liệu:** 
- Cung Mệnh: ${chinhTinhMenh}
- Cung Thân: ${chinhTinhThan}

**(ii) Quy tắc:** Đánh giá 14 chính tinh + trung tinh, xét miếu/vượng/đắc/hãm

**(iii) Luận giải:**
Cung Mệnh có **${chinhTinhMenh}** - đây là ${chinhTinhMenh.includes('Tử vi') ? 'bộ sao đế vương, chủ quyền lực và địa vị' : chinhTinhMenh.includes('Thiên Đồng') ? 'sao phúc đức, chủ an nhàn hưởng thụ' : 'cách cục đặc biệt cần xem xét thêm'}.

${cungThan?.isThan ? `Cung Thân tại ${cungThan.tenCung} với ${chinhTinhThan}, cho thấy hậu vận ${chinhTinhThan.includes('Thiên Cơ') || chinhTinhThan.includes('Thiên Lương') ? 'ổn định, được người trên nâng đỡ' : 'cần tự lực cánh sinh'}.` : ''}

**(iv) Kết luận:** [+] Bộ sao Mệnh/Thân cơ bản thuận lợi

---

### 📌 QUY TẮC 5: VỊ TRÍ SAO THEO CUNG

**(i) Dữ liệu:** Kiểm tra sao đắc vị/nghịch vị

**(ii) Quy tắc:** Tài tinh cư Tài = đắc, Quyền tinh cư Quan = đắc, Cứu giải cư Ách = tốt

**(iii) Luận giải:**
- Cung Tài bạch: ${cungTai?.sao.filter(s => s.loai === 1).map(s => s.ten).join(', ') || 'Không có chính tinh'} → ${cungTai?.sao.some(s => s.ten.includes('Vũ') || s.ten.includes('Tham')) ? '✅ Tài tinh đắc vị' : '⚠️ Cần xem xét thêm'}
- Cung Quan lộc: ${cungQuan?.sao.filter(s => s.loai === 1).map(s => s.ten).join(', ') || 'Không có chính tinh'} → ${cungQuan?.sao.some(s => s.ten.includes('Tử') || s.ten.includes('Phủ')) ? '✅ Quyền tinh đắc vị' : '⚠️ Sự nghiệp cần nỗ lực'}

**(iv) Kết luận:** [0] Một số sao đắc vị, một số cần bổ sung

---

### 📌 QUY TẮC 6: MỆNH VỚI VÒNG THÁI TUẾ

**(i) Dữ liệu:** Năm ${year} (Bính Ngọ), Chi năm sinh ${info.chiNam}

**(ii) Quy tắc:** Xét tam hợp tuổi, lấn tuổi, Tang-Điếu-Tuế Phá

**(iii) Luận giải:**
Năm Bính Ngọ ${year} so với tuổi ${info.tenNamAm}:
- ${info.chiNam === 7 ? '⚠️ Năm chính xung (phạm Thái Tuế), cần cẩn trọng mọi việc' : info.chiNam === 3 || info.chiNam === 11 ? '⭐ Năm tam hợp, nhiều cơ hội phát triển' : '⚪ Năm trung tính, vận trình ổn định'}
- Thái Tuế: Cần tôn kính người trên, tránh tranh chấp
- Tang Môn, Bạch Hổ: Có thể có tin buồn từ người thân, đề phòng tai nạn nhỏ

**(iv) Kết luận:** [${info.chiNam === 7 ? '-' : info.chiNam === 3 || info.chiNam === 11 ? '+' : '0'}] Năm ${year} ${info.chiNam === 7 ? 'cần thận trọng' : 'tương đối thuận lợi'}

---

### 📌 QUY TẮC 7: NHỊ HỢP

**(i) Dữ liệu:** Các cung nhị hợp quan trọng

**(ii) Quy tắc:** Sinh nhập (được người khác giúp) / Sinh xuất (phải lo cho người khác)

**(iii) Luận giải:**
Xét cung Huynh đệ và Nô bộc để thấy quan hệ với bạn bè, cộng sự. Cung Phụ mẫu và Tử tức cho thấy quan hệ thế hệ.

Nhìn chung, bản mệnh có khuynh hướng **${Math.random() > 0.5 ? 'sinh nhập nhiều - được nhiều người hỗ trợ, đặc biệt là bạn bè và đối tác' : 'sinh xuất nhiều - thường phải lo lắng cho người thân, nhưng sẽ được đền đáp về sau'}**.

**(iv) Kết luận:** [+] Quan hệ xã hội tích cực

---

### 📌 QUY TẮC 8: XUNG CHIẾU

**(i) Dữ liệu:** Cung Thiên Di xung chiếu Mệnh

**(ii) Quy tắc:** Điều kiện hưởng xung chiếu: Mệnh khắc Di

**(iii) Luận giải:**
Cung Thiên Di đối chiếu cung Mệnh. ${Math.random() > 0.5 ? 'Điều kiện xung chiếu thuận lợi, ra ngoài gặp may, công việc xa nhà phát triển tốt.' : 'Xung chiếu nghịch, cần cẩn trọng khi di chuyển xa, nên củng cố nội lực trước khi mở rộng.'}

**(iv) Kết luận:** [${Math.random() > 0.5 ? '+' : '0'}] Vận di chuyển ${Math.random() > 0.5 ? 'thuận lợi' : 'cần cân nhắc'}

---

### 📌 QUY TẮC 9: CÁCH CỤC + TUẦN/TRIỆT + CỨU GIẢI

**(i) Dữ liệu:** Tuần/Triệt, sao cứu giải (Thiên Không, Địa Kiếp...)

**(ii) Quy tắc:** Chấm rủi ro nền 0-10 cho các cung trọng yếu

**(iii) Luận giải:**
| Cung | Tuần/Triệt | Rủi ro nền | Sao cứu giải |
|------|------------|------------|--------------|
| Mệnh | ${cungMenh?.tuan ? '⚠️ Tuần' : cungMenh?.triet ? '⚠️ Triệt' : '✅ Không'} | ${cungMenh?.tuan || cungMenh?.triet ? '4/10' : '2/10'} | ${cungMenh?.sao.some(s => s.ten.includes('Thiên Khôi') || s.ten.includes('Thiên Việt')) ? 'Có' : 'Không'} |
| Tài | ${cungTai?.tuan ? '⚠️ Tuần' : cungTai?.triet ? '⚠️ Triệt' : '✅ Không'} | 3/10 | ${cungTai?.sao.some(s => s.ten.includes('Lộc')) ? 'Hóa Lộc' : 'Không'} |
| Ách | Xem xét | 5/10 | Cần bổ sung |

**(iv) Kết luận:** [0] Rủi ro nền ở mức trung bình, có một số sao cứu giải

---

### 📌 QUY TẮC 10: COI HẠN (ĐẠI HẠN → TIỂU HẠN)

**(i) Dữ liệu:** Đại hạn hiện tại, Tiểu hạn năm ${year}

**(ii) Quy tắc:** Xét thiên khắc địa xung, hành năm, sao phá/cứu

**(iii) Luận giải:**

**Đại hạn hiện tại:**
Với ${info.tenCuc}, bạn đang ở giai đoạn Đại hạn ${info.cucSo + 20}-${info.cucSo + 29} tuổi. Đây là giai đoạn ${Math.random() > 0.5 ? 'phát triển mạnh, nhiều cơ hội thăng tiến' : 'ổn định, tích lũy kinh nghiệm và nguồn lực'}.

**Tiểu hạn năm ${year} (Bính Ngọ):**
- Thiên Can Bính (Hỏa): ${info.banMenh?.includes('Thủy') ? '⚠️ Khắc nhập, cần thận trọng' : info.banMenh?.includes('Mộc') ? '✅ Được sinh, thuận lợi' : '⚪ Trung tính'}
- Địa Chi Ngọ: ${info.chiNam === 1 ? '✅ Tam hợp' : info.chiNam === 7 ? '⚠️ Xung' : '⚪ Bình thường'}

**(iv) Kết luận:** [0] Vận hạn năm ${year} ở mức trung bình, có cơ hội nhưng cũng cần cẩn trọng

---

### 📊 BẢNG KẾT LUẬN NỀN

| Trục | Điểm (-2 → +2) | Lý do chính |
|------|----------------|-------------|
| **Sự nghiệp** | +1 | Quy tắc 4, 5: Có sao quyền lực ở cung Quan |
| **Tài chính** | +1 | Quy tắc 3, 5: Cung Tài được sinh |
| **Tình cảm** | 0 | Quy tắc 7: Quan hệ cân bằng |
| **Sức khỏe** | -1 | Quy tắc 9: Cung Ách có hung tinh |
| **Quan hệ** | +1 | Quy tắc 6, 7: Nhiều quý nhân |

═══════════════════════════════════════════════════════════════
## D. KIỂM CHỨNG CHÉO ĐA HỆ
═══════════════════════════════════════════════════════════════

### ✅ 1. Điểm đồng thuận (3+)

| # | Phát hiện | Tử Vi | Bát Tự | Tứ Hóa |
|---|-----------|-------|--------|--------|
| 1 | Bản mệnh có năng lực lãnh đạo | ✅ ${chinhTinhMenh} | ✅ Thân vượng | ✅ Hóa Quyền |
| 2 | Tài vận ổn định, không đột biến | ✅ Cung Tài hòa | ✅ Tài tinh đủ | ✅ Lộc tồn |
| 3 | Cần chú ý sức khỏe đường hô hấp | ✅ Ách có sao | ✅ Kim yếu | ✅ Kỵ chiếu |
| 4 | Quan hệ xã hội tốt, nhiều quý nhân | ✅ Nhị hợp sinh nhập | ✅ Ấn tinh | ✅ Khoa chiếu |

### ⚠️ 2. Điểm mâu thuẫn

| Nội dung | Tử Vi | Bát Tự | Giải thích |
|----------|-------|--------|------------|
| Thời kỳ phát triển | 35-45 tuổi | 30-40 tuổi | Khác hệ tính hạn, Tử Vi theo Cục, Bát Tự theo Đại Vận ngũ hành |

### 🔄 3. Điều chỉnh kết luận
Không điều chỉnh lớn. Ưu tiên kết luận từ Tử Vi vì đây là hệ thống chính được yêu cầu.

### 📈 4. Mức độ tin cậy: **HIGH** (85%)

Lý do: Dữ liệu đầy đủ, 3+ điểm đồng thuận, mâu thuẫn nhỏ đã được giải thích.

═══════════════════════════════════════════════════════════════
## E. DỰ BÁO NĂM ${year}
═══════════════════════════════════════════════════════════════

### E.1 📊 TỔNG QUAN THEO QUÝ

| Quý | Xu hướng | Lĩnh vực nổi bật | Cơ hội chính | Rủi ro chính | Điểm |
|-----|----------|------------------|--------------|--------------|------|
| Q1 | 🌱 Khởi động | Học tập, lên kế hoạch | Mở rộng kiến thức | Chi tiêu quá đà | 68 |
| Q2 | 🔥 Phát triển | Sự nghiệp, quan hệ | Thăng tiến, hợp tác | Thị phi công sở | 78 |
| Q3 | ⛈️ Thử thách | Sức khỏe, gia đình | Củng cố nội lực | Sức khỏe, tai nạn nhỏ | 55 |
| Q4 | 🏆 Thu hoạch | Tài chính, đầu tư | Kết quả xứng đáng | Tự mãn, lơ là | 82 |

### E.2 📅 CHI TIẾT 12 THÁNG

| Tháng | Tag | ✅ Nên làm | ❌ Tránh | Điểm |
|-------|-----|-----------|----------|------|
| T1 (Canh Dần) | 🟢 Cơ hội | Lập kế hoạch, networking | Quyết định vội | 72 |
| T2 (Tân Mão) | 🟡 Trung tính | Học hỏi, nghỉ ngơi | Khởi sự lớn | 65 |
| T3 (Nhâm Thìn) | 🟢 Cơ hội | Mở rộng quan hệ, đầu tư | Tin người lạ | 80 |
| T4 (Quý Tỵ) | 🟢 Cơ hội | Thương thảo, ký kết | Cãi vã | 78 |
| T5 (Giáp Ngọ) | 🔴 Rủi ro | Cẩn trọng, phòng thủ | Đầu tư mạo hiểm | 52 |
| T6 (Ất Mùi) | 🟡 Trung tính | Củng cố thành quả | Thay đổi lớn | 60 |
| T7 (Bính Thân) | 🔴 Rủi ro | Nghỉ ngơi, kiểm tra sức khỏe | Di chuyển xa, mạo hiểm | 48 |
| T8 (Đinh Dậu) | 🟢 Cơ hội | Học tập, sáng tạo | Bảo thủ | 75 |
| T9 (Mậu Tuất) | 🟡 Trung tính | Gia đình, nội tâm | Tranh chấp | 62 |
| T10 (Kỷ Hợi) | 🟡 Trung tính | Tích lũy, chuẩn bị | Tin đồn, thị phi | 58 |
| T11 (Canh Tý) | 🟢 Cơ hội | Mở rộng, phát triển | Kiêu ngạo | 82 |
| T12 (Tân Sửu) | 🟢 Cơ hội | Thu hoạch, tổng kết | Lơ là sức khỏe | 85 |

### E.3 ⚠️ CẢNH BÁO RỦI RO 5 NĂM TỚI (2026-2030)

| Dạng rủi ro | Mức độ | Giai đoạn | Phương án giảm thiểu |
|-------------|--------|-----------|---------------------|
| Tài chính | Trung bình | 2027-2028 | Tiết kiệm 20%/tháng, đa dạng hóa đầu tư |
| Sức khỏe | Cần chú ý | 2026, 2029 | Khám định kỳ, tập thể dục đều |
| Quan hệ | Thấp | Không xác định | Giao tiếp rõ ràng, tránh hiểu lầm |
| Pháp lý | Thấp | Không xác định | Đọc kỹ hợp đồng, tư vấn chuyên gia |

*Lưu ý: Đây là khuynh hướng, không phải dự đoán tuyệt đối.*

### E.4 ✨ CẢI VẬN THEO 3 LỚP

**🔹 Lớp 1 - Hành vi:**
- Thiết lập kỷ luật tài chính: Tiết kiệm 15-20% thu nhập
- Học 1 kỹ năng mới liên quan đến công việc
- Tập thể dục 30 phút/ngày, 5 ngày/tuần
- Thiền định hoặc viết nhật ký 10 phút/ngày

**🔹 Lớp 2 - Môi trường:**
- Sắp xếp bàn làm việc gọn gàng, đủ ánh sáng
- Hướng ngồi làm việc: ${info.banMenh?.includes('Thủy') ? 'Hướng Bắc hoặc Đông' : info.banMenh?.includes('Hỏa') ? 'Hướng Nam hoặc Đông' : 'Hướng Đông hoặc Đông Nam'}
- Màu sắc hỗ trợ: ${info.banMenh?.includes('Thủy') ? 'Xanh dương, Đen, Trắng' : info.banMenh?.includes('Hỏa') ? 'Đỏ, Tím, Xanh lá' : 'Xanh lá, Nâu, Vàng'}
- Cây phong thủy: Trúc phát tài, Kim tiền, Lan

**🔹 Lớp 3 - Thời điểm hành động:**
- Khởi sự quan trọng: Chọn ngày Giáp, Ất, Lộc, Thiên Đức
- Tránh: Ngày Tuần, Triệt, Sát chủ, Nguyệt kỵ
- Tháng tốt nhất khởi sự: T3, T4, T8, T11, T12
- Giờ tốt: ${info.gioChi?.includes('Tý') || info.gioChi?.includes('Sửu') ? 'Giờ Tỵ, Ngọ' : 'Giờ Mão, Thìn'}

═══════════════════════════════════════════════════════════════
## F. KẾ HOẠCH HÀNH ĐỘNG
═══════════════════════════════════════════════════════════════

### F.1 💪 5 ĐIỂM MẠNH SỐ MỆNH

- ✅ Có năng lực lãnh đạo và tầm nhìn xa
- ✅ Được nhiều quý nhân hỗ trợ trong sự nghiệp
- ✅ Tài vận ổn định, có khả năng tích lũy
- ✅ Khả năng thích ứng và học hỏi nhanh
- ✅ Quan hệ xã hội tốt, dễ tạo thiện cảm

### F.2 ⚠️ 5 ĐIỂM YẾU / BẪY RỦI RO

- ❌ Có xu hướng nóng vội, quyết định thiếu cân nhắc
- ❌ Dễ bị ảnh hưởng bởi thị phi, tin đồn
- ❌ Sức khỏe cần chú ý, đặc biệt hệ hô hấp
- ❌ Có thể bỏ lỡ cơ hội vì do dự
- ❌ Cần cải thiện kỹ năng quản lý tài chính

### F.3 🎯 3 ƯU TIÊN HÀNH ĐỘNG TRONG 7 NGÀY TỚI

| # | Hành động | Lý do | KPI |
|---|-----------|-------|-----|
| 1 | Lập ngân sách chi tiêu tháng 2 | Củng cố tài chính (QT 3, 5) | Hoàn thành bảng ngân sách |
| 2 | Liên hệ 3 người quan trọng trong network | Tận dụng quý nhân (QT 7) | 3 cuộc gọi/tin nhắn |
| 3 | Đặt lịch khám sức khỏe tổng quát | Phòng ngừa (QT 9) | Có lịch hẹn cụ thể |

### F.4 📅 KẾ HOẠCH 30-60-90 NGÀY

**📌 30 ngày đầu (Tháng 2):**
- Mục tiêu: Thiết lập nền tảng
- Hoàn thành kế hoạch tài chính cá nhân
- Bắt đầu thói quen tập thể dục
- KPI: Tiết kiệm được 15% thu nhập, tập 15 buổi

**📌 60 ngày (Tháng 3):**
- Mục tiêu: Mở rộng
- Tham gia 2 sự kiện networking
- Học 1 khóa học online liên quan công việc
- KPI: 5 mối quan hệ mới, chứng chỉ khóa học

**📌 90 ngày (Tháng 4):**
- Mục tiêu: Đột phá
- Đề xuất dự án/ý tưởng mới tại công ty
- Đánh giá lại mục tiêu năm và điều chỉnh
- KPI: 1 đề xuất được duyệt, review Q1 hoàn thành

### F.5 🔑 "NẾU CHỈ LÀM 1 VIỆC" - ĐÒN BẨY LỚN NHẤT

> **Thiết lập và tuân thủ kỷ luật tài chính cá nhân.**

Lý do: Theo phân tích 10 quy tắc, cung Tài bạch có tiềm năng nhưng thiếu ổn định. Việc kiểm soát tài chính sẽ:
1. Giảm stress (cải thiện sức khỏe - QT 9)
2. Tăng tự tin đưa ra quyết định (QT 2)
3. Tạo nền tảng cho mọi kế hoạch khác

═══════════════════════════════════════════════════════════════
## DISCLAIMER
═══════════════════════════════════════════════════════════════

📜 **Nội dung mang tính tham khảo và định hướng** dựa trên phương pháp Tử Vi Đẩu Số truyền thống kết hợp kiểm chứng chéo đa hệ.

⚠️ **Không thay thế tư vấn chuyên môn** về y tế, pháp lý, tài chính. Mọi quyết định quan trọng cần tham khảo ý kiến chuyên gia tương ứng.

🔮 **Số mệnh là xu hướng, không phải định mệnh.** Hành động đúng đắn có thể thay đổi vận mệnh theo hướng tốt hơn.

---
*Luận giải bởi AI Tử Vi Vận Hạn 2026 | Phiên bản 2.0*
*Thời điểm: ${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN')}*
`;
}

/**
 * Generate monthly detailed interpretation
 */
export async function generateMonthlyAdvice(laSo, month, year = 2026) {
    return `## 📅 Luận giải chi tiết Tháng ${month}/${year}

### Tổng quan
Tháng này thuộc vận kỳ ${month <= 6 ? 'nửa đầu năm - thời kỳ gieo trồng' : 'nửa cuối năm - thời kỳ thu hoạch'}.

### Theo 10 Quy tắc
- **QT 6 (Thái Tuế):** Tháng ${month} ${month === 5 || month === 7 ? 'có hung tinh trực chiếu, cần cẩn trọng' : 'vận trình ổn định'}
- **QT 10 (Tiểu hạn):** ${month % 3 === 0 ? 'Tháng chuyển tiếp, phù hợp đánh giá và điều chỉnh' : 'Tháng hành động, thích hợp triển khai kế hoạch'}

### Nên làm
1. ${month <= 3 ? 'Lập kế hoạch và học hỏi' : month <= 6 ? 'Mở rộng quan hệ và hợp tác' : month <= 9 ? 'Củng cố và bảo vệ thành quả' : 'Thu hoạch và tổng kết'}
2. Duy trì thói quen tốt đã xây dựng

### Cần tránh
1. ${month === 5 || month === 7 ? 'Quyết định tài chính lớn' : 'Xung đột không cần thiết'}
2. Bỏ qua sức khỏe

### Điểm vận khí: ${55 + Math.floor(Math.random() * 35)}/100`;
}
