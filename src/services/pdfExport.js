/**
 * PDF Export Service - Xuất lá số và luận giải ra PDF
 */

/**
 * Generate PDF from interpretation and chart data
 */
export async function exportToPDF(laSo, interpretation, fortuneScore) {
    const { info, thapNhiCung } = laSo;

    // Create print-friendly HTML content
    const content = generatePrintHTML(info, thapNhiCung, interpretation, fortuneScore);

    // Open print dialog
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();

    // Wait for content to load then print
    setTimeout(() => {
        printWindow.print();
    }, 500);
}

/**
 * Generate print-friendly HTML
 */
function generatePrintHTML(info, thapNhiCung, interpretation, fortuneScore) {
    const cungMenh = thapNhiCung.find(c => c.tenCung === 'Mệnh');
    const cungThan = thapNhiCung.find(c => c.isThan);

    return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Lá Số Tử Vi - ${info.hoTen || 'Chưa đặt tên'}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: 'Segoe UI', Arial, sans-serif; 
      line-height: 1.6; 
      color: #1a1a1a;
      padding: 20mm;
      font-size: 11pt;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 3px solid #f59f0a;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 24pt;
      color: #f59f0a;
      margin-bottom: 5px;
    }
    .header h2 {
      font-size: 14pt;
      font-weight: normal;
      color: #666;
    }
    .section {
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 14pt;
      font-weight: bold;
      color: #f59f0a;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
      margin-bottom: 10px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 20px;
    }
    .info-item {
      background: #f8f8f8;
      padding: 10px;
      border-radius: 5px;
    }
    .info-label {
      font-size: 9pt;
      color: #888;
      text-transform: uppercase;
    }
    .info-value {
      font-size: 12pt;
      font-weight: bold;
      color: #333;
    }
    .score-box {
      text-align: center;
      background: linear-gradient(135deg, #f59f0a, #fbbf24);
      color: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .score-value {
      font-size: 48pt;
      font-weight: bold;
    }
    .score-label {
      font-size: 12pt;
      opacity: 0.9;
    }
    .chart-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, auto);
      gap: 2px;
      border: 2px solid #333;
      margin-bottom: 20px;
    }
    .cung {
      border: 1px solid #ccc;
      padding: 5px;
      font-size: 8pt;
      min-height: 80px;
    }
    .cung-name {
      font-weight: bold;
      color: #f59f0a;
      font-size: 9pt;
    }
    .cung-chi {
      font-size: 8pt;
      color: #666;
    }
    .chinh-tinh {
      color: #c00;
      font-weight: bold;
      font-size: 9pt;
    }
    .center-info {
      grid-column: 2 / 4;
      grid-row: 2 / 4;
      background: #f8f8f8;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 15px;
    }
    .interpretation {
      white-space: pre-wrap;
      font-size: 10pt;
      line-height: 1.8;
    }
    .interpretation h2, .interpretation h3 {
      color: #f59f0a;
      margin-top: 15px;
      margin-bottom: 10px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #ddd;
      text-align: center;
      font-size: 9pt;
      color: #888;
    }
    @media print {
      body { padding: 15mm; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📜 LÁ SỐ TỬ VI ${new Date().getFullYear()}</h1>
    <h2>${info.hoTen || 'Chưa đặt tên'} - ${info.gioiTinh}</h2>
  </div>

  <div class="section">
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Ngày sinh dương</div>
        <div class="info-value">${info.ngayDuong}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Ngày sinh âm</div>
        <div class="info-value">${info.ngayAm}/${info.thangAm} - ${info.tenNamAm}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Giờ sinh</div>
        <div class="info-value">${info.gioChi}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Cục</div>
        <div class="info-value">${info.tenCuc}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Mệnh</div>
        <div class="info-value">${info.banMenh}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Âm Dương</div>
        <div class="info-value">${info.amDuongMenh}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Mệnh Chủ</div>
        <div class="info-value">${info.menhChu}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Thân Chủ</div>
        <div class="info-value">${info.thanChu}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="score-box">
      <div class="score-value">${fortuneScore}</div>
      <div class="score-label">ĐIỂM VẬN KHÍ NĂM 2026</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">📊 BIỂU ĐỒ 12 CUNG</div>
    <div class="chart-grid">
      ${generateChartHTML(thapNhiCung)}
    </div>
  </div>

  <div class="section">
    <div class="section-title">🔮 LUẬN GIẢI VẬN MỆNH</div>
    <div class="interpretation">${formatInterpretation(interpretation)}</div>
  </div>

  <div class="footer">
    <p>Xuất bởi Tử Vi Vận Hạn 2026 | tu-vi-van-han-2026.vercel.app</p>
    <p>Ngày xuất: ${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN')}</p>
    <p>⚠️ Nội dung chỉ mang tính tham khảo theo phương pháp Tử Vi Đẩu Số</p>
  </div>
</body>
</html>
`;
}

/**
 * Generate chart HTML grid
 */
function generateChartHTML(thapNhiCung) {
    // Grid positions mapping (row, col to cungSo)
    const gridPositions = [
        [6, 7, 8, 9],   // Row 1: Tỵ, Ngọ, Mùi, Thân
        [5, 0, 0, 10],  // Row 2: Thìn, CENTER, CENTER, Dậu
        [4, 0, 0, 11],  // Row 3: Mão, CENTER, CENTER, Tuất
        [3, 2, 1, 12]   // Row 4: Dần, Sửu, Tý, Hợi
    ];

    let html = '';

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cungSo = gridPositions[row][col];

            if (cungSo === 0) {
                // Center info block (only render once for top-left of center)
                if (row === 1 && col === 1) {
                    const info = thapNhiCung[0]?.info || {};
                    html += `<div class="center-info">
            <strong>LÁ SỐ TỬ VI</strong>
            <div style="margin-top:10px;font-size:10pt;">
              Năm ${info?.tenNamAm || ''}<br>
              ${info?.tenCuc || ''}<br>
              ${info?.banMenh || ''}
            </div>
          </div>`;
                }
                continue;
            }

            const cung = thapNhiCung.find(c => c.cungSo === cungSo);
            if (cung) {
                const chinhTinh = cung.sao.filter(s => s.loai === 1).map(s => s.ten).join(', ');
                html += `<div class="cung">
          <div class="cung-name">${cung.tenCung}</div>
          <div class="cung-chi">${cung.tenCan} ${cung.tenChi}</div>
          <div class="chinh-tinh">${chinhTinh}</div>
          <div style="font-size:7pt;color:#666;margin-top:3px;">Đại hạn: ${cung.daiHan}</div>
        </div>`;
            }
        }
    }

    return html;
}

/**
 * Format interpretation for print (convert markdown to HTML)
 */
function formatInterpretation(text) {
    if (!text) return '';

    return text
        .replace(/## (.*)/g, '<h2>$1</h2>')
        .replace(/### (.*)/g, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/- (.*)/g, '• $1<br>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
}

/**
 * Download interpretation as text file
 */
export function downloadAsText(laSo, interpretation) {
    const { info } = laSo;

    const content = `
═══════════════════════════════════════════════════════════════
                    LÁ SỐ TỬ VI NĂM 2026
═══════════════════════════════════════════════════════════════

Họ tên: ${info.hoTen || 'Chưa đặt tên'}
Ngày sinh: ${info.ngayDuong} (${info.ngayAm}/${info.thangAm} Âm lịch)
Năm sinh: ${info.tenNamAm}
Giờ sinh: ${info.gioChi}
Giới tính: ${info.gioiTinh}

Mệnh: ${info.banMenh}
Cục: ${info.tenCuc}
Mệnh Chủ: ${info.menhChu}
Thân Chủ: ${info.thanChu}
Tứ Hóa: ${info.tuHoa}

═══════════════════════════════════════════════════════════════
                    LUẬN GIẢI VẬN MỆNH
═══════════════════════════════════════════════════════════════

${interpretation}

───────────────────────────────────────────────────────────────
Xuất bởi: Tử Vi Vận Hạn 2026 | tu-vi-van-han-2026.vercel.app
Ngày xuất: ${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN')}
───────────────────────────────────────────────────────────────
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `TuVi_${info.hoTen || 'LaSo'}_${Date.now()}.txt`;
    a.click();

    URL.revokeObjectURL(url);
}
