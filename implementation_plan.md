# Tử Vi Vận Hạn 2026 - Implementation Plan

Ứng dụng web lập lá số Tử Vi + luận giải AI cho năm 2026, với 3 lớp phân tích: Tổng quan năm, Nguyệt vận, và Đại vận 10 năm.

## User Review Required

> [!IMPORTANT]
> **Gemini API Key**: Cần API key để tích hợp AI luận giải. Bạn có sẵn API key không?

> [!IMPORTANT]
> **Trường phái luận giải**: App sẽ theo phái Thiên Lương (Văn Đằng Thái Thứ Lang) như code hiện có. Có muốn đổi không?

---

## Existing Code Analysis

Engine calculation đã hoàn thiện trong `tu_vi_huyen_hoc/src/lib/tuvi.js`:
- ✅ 14 Chính tinh (Vòng Tử Vi + Vòng Thiên Phủ)
- ✅ Vòng Thái Tuế, Lộc Tồn, Tràng Sinh
- ✅ 40+ phụ tinh (Văn Xương, Tả Phù, Kình Dương...)
- ✅ Tứ Hóa (Lộc, Quyền, Khoa, Kỵ)
- ✅ Tuần/Triệt
- ✅ Đại Hạn positions

**Cần bổ sung:**
- Nguyệt vận (Tiểu hạn theo tháng năm 2026)
- Điểm vận khí (scoring algorithm)
- AI interpretation module

---

## Proposed Changes

### Core Engine Enhancement

#### [MODIFY] [tuvi.js](file:///c:/Users/NMteam/.gemini/antigravity/scratch/real_estate_scoring/sql/Tu%20Vi%20Van%20Han%202026/src/lib/tuvi.js)
- Port from existing `tu_vi_huyen_hoc`
- Add `calcNguyetVan(year, month)` for monthly fortune
- Add `calcDaiVan(startYear, endYear)` for 10-year periods
- Add `calcVanKhiScore()` returning 0-100 score

#### [NEW] [vanhan2026.js](file:///c:/Users/NMteam/.gemini/antigravity/scratch/real_estate_scoring/sql/Tu%20Vi%20Van%20Han%202026/src/lib/vanhan2026.js)
- `getMonthlyFortune(laSo, year)` - 12 tháng fortune
- `getYearOverview(laSo, year)` - Tổng quan năm
- `get10YearPeriod(laSo, startAge)` - Đại vận

---

### AI Interpretation

#### [NEW] [aiService.js](file:///c:/Users/NMteam/.gemini/antigravity/scratch/real_estate_scoring/sql/Tu%20Vi%20Van%20Han%202026/src/services/aiService.js)
```javascript
// System prompt (hidden)
const SYSTEM_PROMPT = `Bạn là "AI Tử Vi 2026" — trợ lý luận giải dựa trên Tử Vi Đẩu Số.
Nguyên tắc:
- KHÔNG bịa dữ liệu sao/hạn. Chỉ dùng JSON đầu vào.
- Trình bày rõ ràng, có "Cơ hội / Rủi ro".
- Dùng ngôn ngữ xác suất, không phán tuyệt đối.
- Không đưa lời khuyên y tế/pháp lý/tài chính.
- Văn phong tiếng Việt hiện đại.`;

// Functions
generateInterpretation(lasoJSON, year, goals)
generateMonthlyAdvice(lasoJSON, month)
```

---

### UI Components

#### [NEW] Project Structure
```
Tu Vi Van Han 2026/
├── src/
│   ├── components/
│   │   ├── FormLaSo.jsx      # Birth info input
│   │   ├── LaSo.jsx          # 12-cung chart
│   │   ├── TabNavigation.jsx # 4 tabs navigation
│   │   ├── TongQuan.jsx      # Year overview + score
│   │   ├── NguyetVan.jsx     # Monthly cards
│   │   ├── DaiVan.jsx        # 10-year timeline
│   │   ├── VanKhiChart.jsx   # Score visualization
│   │   └── ProfileManager.jsx
│   ├── lib/
│   │   ├── tuvi.js           # Star placement engine
│   │   └── vanhan2026.js     # Fortune calculation
│   ├── services/
│   │   └── aiService.js      # Gemini integration
│   ├── App.jsx
│   └── index.css             # Design system
├── index.html
└── package.json
```

#### Key UI Features
| Screen | Description |
|--------|-------------|
| S0-Home | Hero CTA "Tạo lá số 2026" |
| S1-Form | Name, DOB, gender, hour, target year |
| S2-Result | 4 tabs: Tổng quan, Nguyệt vận, Đại vận, 12 Cung |
| S3-Monthly | 12 month cards with expand |
| S4-Chart | 12-cung with zoom panel |
| S5-Profiles | Saved charts list, search, pin |

---

### Design System

#### Color Palette (Dark Theme)
```css
:root {
  --bg-primary: #0f172a;      /* Slate 900 */
  --bg-secondary: #1e293b;    /* Slate 800 */
  --accent-gold: #d97706;     /* Amber 600 */
  --accent-red: #dc2626;      /* Red 600 */
  --text-primary: #f8fafc;    /* Slate 50 */
  --text-dim: #94a3b8;        /* Slate 400 */
  
  /* Five Elements */
  --color-kim: #FFD700;
  --color-moc: #22C55E;
  --color-thuy: #3B82F6;
  --color-hoa: #EF4444;
  --color-tho: #F59E0B;
}
```

---

## Verification Plan

### Automated Tests

**Chart Accuracy Test:**
```bash
cd "c:\Users\NMteam\.gemini\antigravity\scratch\real_estate_scoring\sql\Tu Vi Van Han 2026"
npm test -- --run
```
- Compare output với thienluong.net cho case: Giáp Tý 1984, giờ Dần, Nam

### Manual Verification

1. **Form Input Test:**
   - Nhập: Tên "Test User", 15/03/1990, 3h00, Nam
   - Verify: Lá số hiển thị đúng 12 cung + sao

2. **Monthly Fortune Test:**
   - Chọn năm 2026, xem tab Nguyệt vận
   - Verify: 12 tháng hiển thị với cơ hội/rủi ro

3. **AI Interpretation Test:**
   - Tạo lá số → Click "Luận giải AI"
   - Verify: Nhận được text có cấu trúc A-G theo template

4. **Responsive Test:**
   - Resize browser 375px (mobile)
   - Verify: Chart và form hiển thị đúng

---

## Questions for User

1. **API Key:** Bạn có Gemini API key sẵn để dùng cho AI interpretation không?

2. **Hosting:** App sẽ chạy local hay deploy lên web?

3. **Data persistence:** Dùng localStorage (local only) hay cần backend để sync across devices?
