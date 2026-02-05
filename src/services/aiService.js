/**
 * AI Service for Gemini integration
 */

const SYSTEM_PROMPT = `Bạn là "AI Tử Vi 2026" — trợ lý luận giải dựa trên Tử Vi Đẩu Số.
Nguyên tắc:
- KHÔNG bịa dữ liệu sao/hạn. Chỉ dùng JSON đầu vào.
- Trình bày rõ ràng, có "Cơ hội / Rủi ro".
- Dùng ngôn ngữ xác suất, không phán tuyệt đối.
- Không đưa lời khuyên y tế/pháp lý/tài chính.
- Văn phong tiếng Việt hiện đại, sang trọng.`;

export async function generateInterpretation(laSo, year = 2026, goals = "") {
    // In a real app, this would call Gemini API
    // For now, we will simulate or use a mock response if API Key is missing

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        return `## Luận giải tổng quan năm 2026 (Bính Ngọ)
    
Năm 2026 là năm Bính Ngọ (Thiên hà Thủy). Với lá số của bạn, đây là một năm có nhiều biến động nhưng cũng không thiếu cơ hội.

### 1. Sự nghiệp & Công danh
- **Cơ hội**: Các sao tốt chiếu mệnh cho thấy sự hanh thông trong việc mở rộng quan hệ.
- **Rủi ro**: Đề phòng các cạnh tranh không lành mạnh từ đồng nghiệp.

### 2. Tài lộc & May mắn
- Tài lộc ổn định, tuy nhiên cần tránh các khoản đầu tư rủi ro cao vào giữa năm.

### 3. Tình duyên & Gia đạo
- Gia đình êm ấm, là chỗ dựa vững chắc cho bạn.

### Lời khuyên cho mục tiêu: ${goals || "Phát triển bản thân"}
Hãy kiên trì với kế hoạch đã đề ra, thành quả sẽ đến vào cuối năm.`;
    }

    // Simulate API call logic here if key exists
    // For the actual implementation, you would use fetch to Gemini API
    return "AI Interpretation is currently simulated. Please provide a VITE_GEMINI_API_KEY to enable full functionality.";
}
