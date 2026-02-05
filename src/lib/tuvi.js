// Tu Vi Thien Luong - Logic An Sao
// Cập nhật lại logic Tuần Triệt và màu sắc Ngũ Hành chuẩn

import { Solar, Lunar } from 'lunar-javascript';

// ============== CONSTANTS ==============

export const THIEN_CAN = [
    null,
    { id: 1, ten: 'Giáp', nguHanh: 'M', vitriDiaBan: 3, amDuong: 1 },
    { id: 2, ten: 'Ất', nguHanh: 'M', vitriDiaBan: 4, amDuong: -1 },
    { id: 3, ten: 'Bính', nguHanh: 'H', vitriDiaBan: 6, amDuong: 1 },
    { id: 4, ten: 'Đinh', nguHanh: 'H', vitriDiaBan: 7, amDuong: -1 },
    { id: 5, ten: 'Mậu', nguHanh: 'O', vitriDiaBan: 6, amDuong: 1 },
    { id: 6, ten: 'Kỷ', nguHanh: 'O', vitriDiaBan: 7, amDuong: -1 },
    { id: 7, ten: 'Canh', nguHanh: 'K', vitriDiaBan: 9, amDuong: 1 },
    { id: 8, ten: 'Tân', nguHanh: 'K', vitriDiaBan: 10, amDuong: -1 },
    { id: 9, ten: 'Nhâm', nguHanh: 'T', vitriDiaBan: 12, amDuong: 1 },
    { id: 10, ten: 'Quý', nguHanh: 'T', vitriDiaBan: 1, amDuong: -1 },
];

export const DIA_CHI = [
    null,
    { id: 1, ten: 'Tý', nguHanh: 'T', menhChu: 'Tham lang', thanChu: 'Linh tinh', amDuong: 1 },
    { id: 2, ten: 'Sửu', nguHanh: 'O', menhChu: 'Cự môn', thanChu: 'Thiên tướng', amDuong: -1 },
    { id: 3, ten: 'Dần', nguHanh: 'M', menhChu: 'Lộc tồn', thanChu: 'Thiên lương', amDuong: 1 },
    { id: 4, ten: 'Mão', nguHanh: 'M', menhChu: 'Văn khúc', thanChu: 'Thiên đồng', amDuong: -1 },
    { id: 5, ten: 'Thìn', nguHanh: 'O', menhChu: 'Liêm trinh', thanChu: 'Văn xương', amDuong: 1 },
    { id: 6, ten: 'Tỵ', nguHanh: 'H', menhChu: 'Vũ khúc', thanChu: 'Thiên cơ', amDuong: -1 },
    { id: 7, ten: 'Ngọ', nguHanh: 'H', menhChu: 'Phá quân', thanChu: 'Hỏa tinh', amDuong: 1 },
    { id: 8, ten: 'Mùi', nguHanh: 'O', menhChu: 'Vũ khúc', thanChu: 'Thiên tướng', amDuong: -1 },
    { id: 9, ten: 'Thân', nguHanh: 'K', menhChu: 'Liêm trinh', thanChu: 'Thiên lương', amDuong: 1 },
    { id: 10, ten: 'Dậu', nguHanh: 'K', menhChu: 'Văn khúc', thanChu: 'Thiên đồng', amDuong: -1 },
    { id: 11, ten: 'Tuất', nguHanh: 'O', menhChu: 'Lộc tồn', thanChu: 'Văn xương', amDuong: 1 },
    { id: 12, ten: 'Hợi', nguHanh: 'T', menhChu: 'Cự môn', thanChu: 'Thiên cơ', amDuong: -1 },
];

export const CUNG_CHU = [
    null,
    'Mệnh', 'Phụ mẫu', 'Phúc đức', 'Điền trạch', 'Quan lộc', 'Nô bộc',
    'Thiên di', 'Tật ách', 'Tài bạch', 'Tử tức', 'Phu thê', 'Huynh đệ'
];

// Ngu Hanh mapping
const NGU_HANH = {
    'K': { id: 1, ten: 'Kim', cuc: 4, tenCuc: 'Kim tứ cục', css: 'kim' },
    'M': { id: 2, ten: 'Mộc', cuc: 3, tenCuc: 'Mộc tam cục', css: 'moc' },
    'T': { id: 3, ten: 'Thủy', cuc: 2, tenCuc: 'Thủy nhị cục', css: 'thuy' },
    'H': { id: 4, ten: 'Hỏa', cuc: 6, tenCuc: 'Hỏa lục cục', css: 'hoa' },
    'O': { id: 5, ten: 'Thổ', cuc: 5, tenCuc: 'Thổ ngũ cục', css: 'tho' },
};

// Nap Am Matrix (rút gọn)
const MATRAN_NAP_AM = [
    null,
    ['K1', null, 'T1', null, 'H1', null, 'O1', null, 'M1', null],
    [null, 'K1', null, 'T1', null, 'H1', null, 'O1', null, 'M1'],
    ['T2', null, 'H2', null, 'O2', null, 'M2', null, 'K2', null],
    [null, 'T2', null, 'H2', null, 'O2', null, 'M2', null, 'K2'],
    ['H3', null, 'O3', null, 'M3', null, 'K3', null, 'T3', null],
    [null, 'H3', null, 'O3', null, 'M3', null, 'K3', null, 'T3'],
    ['K4', null, 'T4', null, 'H4', null, 'O4', null, 'M4', null],
    [null, 'K4', null, 'T4', null, 'H4', null, 'O4', null, 'M4'],
    ['T5', null, 'H5', null, 'O5', null, 'M5', null, 'K5', null],
    [null, 'T5', null, 'H5', null, 'O5', null, 'M5', null, 'K5'],
    ['H6', null, 'O6', null, 'M6', null, 'K6', null, 'T6', null],
    [null, 'H6', null, 'O6', null, 'M6', null, 'K6', null, 'T6'],
];

// Ban Menh names (rút gọn)
const BAN_MENH = {
    'K1': 'Hải trung kim', 'T1': 'Giản hạ thủy', 'H1': 'Tích lịch hỏa', 'O1': 'Bích thượng thổ', 'M1': 'Tang đố mộc',
    'T2': 'Đại khê thủy', 'H2': 'Lư trung hỏa', 'O2': 'Thành đầu thổ', 'M2': 'Tùng bá mộc', 'K2': 'Kim bạch kim',
    'H3': 'Phú đăng hỏa', 'O3': 'Sa trung thổ', 'M3': 'Đại lâm mộc', 'K3': 'Bạch lạp kim', 'T3': 'Trường lưu thủy',
    'K4': 'Sa trung kim', 'T4': 'Thiên hà thủy', 'H4': 'Thiên thượng hỏa', 'O4': 'Lộ bàn thổ', 'M4': 'Dương liễu mộc',
    'T5': 'Truyền trung thủy', 'H5': 'Sơn hạ hỏa', 'O5': 'Đại trạch thổ', 'M5': 'Thạch lựu mộc', 'K5': 'Kiếm phong kim',
    'H6': 'Sơn đầu hỏa', 'O6': 'Ốc thượng thổ', 'M6': 'Bình địa mộc', 'K6': 'Xoa xuyến kim', 'T6': 'Đại hải thủy'
};

// Dac Tinh Matrix for main stars (V/M/Đ/H)
const DAC_TINH_MATRIX = {
    1: ['Tử vi', 'B', 'Đ', 'M', 'B', 'V', 'M', 'M', 'Đ', 'M', 'B', 'V', 'B'],
    2: ['Liêm trinh', 'V', 'Đ', 'V', 'H', 'M', 'H', 'V', 'Đ', 'V', 'H', 'M', 'H'],
    // ... (Existing matrix logic implied, kept concise for rewrite)
};
// Re-adding full matrix to ensure accuracy
Object.assign(DAC_TINH_MATRIX, {
    1: ['Tử vi', 'B', 'Đ', 'M', 'B', 'V', 'M', 'M', 'Đ', 'M', 'B', 'V', 'B'], // Ty -> Hoi
    2: ['Liêm trinh', 'V', 'Đ', 'V', 'H', 'M', 'H', 'V', 'Đ', 'V', 'H', 'M', 'H'],
    3: ['Thiên đồng', 'V', 'H', 'M', 'Đ', 'H', 'Đ', 'H', 'H', 'M', 'H', 'H', 'Đ'],
    4: ['Vũ khúc', 'V', 'M', 'V', 'Đ', 'M', 'H', 'V', 'M', 'V', 'Đ', 'M', 'H'],
    5: ['Thái dương', 'H', 'Đ', 'V', 'V', 'V', 'M', 'M', 'Đ', 'H', 'H', 'H', 'H'],
    6: ['Thiên cơ', 'Đ', 'Đ', 'H', 'M', 'M', 'V', 'Đ', 'Đ', 'V', 'M', 'M', 'H'],
    7: ['Thiên phủ', 'M', 'V', 'M', 'Đ', 'M', 'V', 'M', 'M', 'M', 'Đ', 'M', 'V'],
    8: ['Thái âm', 'V', 'Đ', 'H', 'H', 'H', 'H', 'H', 'Đ', 'V', 'M', 'M', 'M'],
    9: ['Tham lang', 'H', 'M', 'Đ', 'H', 'V', 'H', 'H', 'M', 'Đ', 'H', 'V', 'H'],
    10: ['Cự môn', 'V', 'H', 'V', 'M', 'H', 'H', 'V', 'H', 'Đ', 'M', 'H', 'Đ'],
    11: ['Thiên tướng', 'V', 'Đ', 'M', 'H', 'V', 'Đ', 'V', 'Đ', 'M', 'H', 'V', 'Đ'],
    12: ['Thiên lương', 'V', 'Đ', 'V', 'V', 'M', 'H', 'M', 'Đ', 'V', 'H', 'M', 'H'],
    13: ['Thất sát', 'M', 'Đ', 'M', 'H', 'H', 'V', 'M', 'Đ', 'M', 'H', 'H', 'V'],
    14: ['Phá quân', 'M', 'V', 'H', 'H', 'Đ', 'H', 'M', 'V', 'H', 'H', 'Đ', 'H'],
});

// Tu Hoa mapping
const TU_HOA = {
    1: { loc: 'Liêm trinh', quyen: 'Phá quân', khoa: 'Vũ khúc', ky: 'Thái dương' }, // Giap
    2: { loc: 'Thiên cơ', quyen: 'Thiên lương', khoa: 'Tử vi', ky: 'Thái âm' }, // At
    3: { loc: 'Thiên đồng', quyen: 'Thiên cơ', khoa: 'Văn xương', ky: 'Liêm trinh' }, // Binh
    4: { loc: 'Thái âm', quyen: 'Thiên đồng', khoa: 'Thiên cơ', ky: 'Cự môn' }, // Dinh
    5: { loc: 'Tham lang', quyen: 'Thái âm', khoa: 'Hữu bật', ky: 'Thiên cơ' }, // Mau
    6: { loc: 'Vũ khúc', quyen: 'Tham lang', khoa: 'Thiên lương', ky: 'Văn khúc' }, // Ky
    7: { loc: 'Thái dương', quyen: 'Vũ khúc', khoa: 'Thái âm', ky: 'Thiên đồng' }, // Canh
    8: { loc: 'Cự môn', quyen: 'Thái dương', khoa: 'Văn khúc', ky: 'Văn xương' }, // Tan
    9: { loc: 'Thiên lương', quyen: 'Tử vi', khoa: 'Tả phù', ky: 'Vũ khúc' }, // Nham
    10: { loc: 'Phá quân', quyen: 'Cự môn', khoa: 'Thái âm', ky: 'Tham lang' }, // Quy
};

// ============== UTILITY FUNCTIONS ==============

function dichCung(cungBanDau, ...args) {
    let cungSauKhiDich = cungBanDau;
    for (const soCungDich of args) {
        cungSauKhiDich += soCungDich;
    }
    const result = ((cungSauKhiDich % 12) + 12) % 12;
    return result === 0 ? 12 : result;
}

function nguHanhNapAm(diaChi, thienCan, xuatBanMenh = false) {
    try {
        const nh = MATRAN_NAP_AM[diaChi][thienCan - 1];
        if (nh && ['K', 'M', 'T', 'H', 'O'].includes(nh[0])) {
            return xuatBanMenh ? BAN_MENH[nh] : nh[0];
        }
        return null;
    } catch { return null; }
}

function timCuc(viTriCungMenh, canNam) {
    const canThangGieng = (canNam * 2 + 1) % 10 || 10;
    let canThangMenh = ((viTriCungMenh - 3 + 12) % 12 + canThangGieng) % 10;
    if (canThangMenh === 0) canThangMenh = 10;
    return nguHanhNapAm(viTriCungMenh, canThangMenh);
}

function timTuVi(cucSo, ngayAm) {
    let cungDan = 3;
    let cuc = cucSo;
    const cucBanDau = cucSo;
    while (cuc < ngayAm) { cuc += cucBanDau; cungDan += 1; }
    let saiLech = cuc - ngayAm;
    if (saiLech % 2 === 1) saiLech = -saiLech;
    return dichCung(cungDan, saiLech);
}

function timTrangSinh(cucSo) {
    // Thuy Nhi, Tho Ngu -> Than (9)
    // Moc Tam -> Hoi (12)
    // Kim Tu -> Ty (6)
    // Hoa Luc -> Dan (3)
    switch (cucSo) {
        case 6: return 3;
        case 4: return 6;
        case 2:
        case 5: return 9;
        case 3: return 12;
        default: return 9;
    }
}

function getDacTinh(saoId, cungSo) {
    const matrix = DAC_TINH_MATRIX[saoId];
    return matrix ? matrix[cungSo] : null;
}

// ============== MAIN FUNCTION ==============

export function lapLaSo(ngay, thang, nam, gio, gioiTinh) {
    // 1. CHUYEN DOI LICH
    const solar = Solar.fromYmdHms(nam, thang, ngay, gio, 0, 0);
    const lunar = Lunar.fromSolar(solar);

    const ngayAm = lunar.getDay();
    const thangAm = lunar.getMonth();
    const namAm = lunar.getYear();
    const canNam = (namAm + 6) % 10 + 1;
    const chiNam = (namAm + 8) % 12 + 1;
    const gioChiIndex = Math.floor((gio + 1) / 2) % 12 + 1;
    const gioiTinhSo = gioiTinh ? 1 : -1;

    // 2. TIM CUNG MENH VA CUNG THAN
    const cungMenh = dichCung(3, thangAm - 1, -(gioChiIndex - 1));
    const cungThan = dichCung(3, thangAm - 1, gioChiIndex - 1);

    // 3. TIM CUC
    const hanhCuc = timCuc(cungMenh, canNam);
    const cucInfo = NGU_HANH[hanhCuc];
    const cucSo = cucInfo ? cucInfo.cuc : 2;
    const tenCuc = cucInfo ? cucInfo.tenCuc : 'Thủy nhị cục';

    // 4. TIM BAN MENH
    const banMenhKey = nguHanhNapAm(chiNam, canNam, false);
    const banMenhTen = nguHanhNapAm(chiNam, canNam, true) || 'Mệnh';

    // 5. AM DUONG THUAN/NGHICH LY
    const cungAmDuong = cungMenh % 2 === 1 ? 1 : -1;
    const amDuongMenh = (cungAmDuong * (THIEN_CAN[canNam].amDuong) === 1)
        ? 'Âm dương thuận lý' : 'Âm dương nghịch lý';
    // Note: Check logic Am Duong Thuan Ly is based on Year Can vs Cung Menh? 
    // Standard: Year Can parity vs Menh location parity?
    // Actually it's Tuoi Am/Duong vs Menh o cung Am/Duong.
    // Can Nam Am/Duong = THIEN_CAN[canNam].amDuong.
    // Cung Menh Am/Duong = (cungMenh % 2 == 1) ? Duong : Am.
    // If equal -> Thuan Ly.
    // Code above checks: cungAmDuong * canNam.amDuong === 1? If both 1 or both -1, result 1. correct.

    // 6. KHOI TAO CUNG
    const canCungDan = ((canNam % 5) * 2 + 3) % 10 || 10;
    const thapNhiCung = [];
    for (let i = 1; i <= 12; i++) {
        const distFromDan = (i - 3 + 12) % 12;
        const canCung = (canCungDan + distFromDan - 1) % 10 + 1;
        thapNhiCung.push({
            cungSo: i,
            tenChi: DIA_CHI[i].ten,
            tenCan: THIEN_CAN[canCung].ten, // Can cua Cung
            hanhCung: DIA_CHI[i].nguHanh,
            tenCung: '',
            isMenh: i === cungMenh,
            isThan: i === cungThan,
            sao: [],
            daiHan: 0,
            tuan: false,
            triet: false
        });
    }

    // 7. AN TEN CUNG
    for (let i = 0; i < 12; i++) {
        const cungIndex = dichCung(cungMenh, i);
        thapNhiCung[cungIndex - 1].tenCung = CUNG_CHU[i + 1];
    }

    // 8. AN DAI HAN
    for (let i = 0; i < 12; i++) {
        const cung = thapNhiCung[i];
        const khoangCach = (cung.cungSo - cungMenh + 12) % 12;
        // Nam Duong Nu Am -> Thuan, Nam Am Nu Duong -> Nghich
        // Can Nam am/duong:
        const namDuong = (THIEN_CAN[canNam].amDuong === 1);
        const chieuDaiHan = (namDuong && gioiTinh) || (!namDuong && !gioiTinh) ? 1 : -1;

        let steps = (cung.cungSo - cungMenh);
        if (chieuDaiHan === -1) {
            steps = (cungMenh - cung.cungSo);
        }
        steps = (steps + 12) % 12;

        cung.daiHan = cucSo + steps * 10;
    }

    // 9. TU VI
    const viTriTuVi = timTuVi(cucSo, ngayAm);
    const vongTuVi = [
        { id: 1, ten: 'Tử vi', offset: 0 }, { id: 2, ten: 'Liêm trinh', offset: -8 },
        { id: 3, ten: 'Thiên đồng', offset: -5 }, { id: 4, ten: 'Vũ khúc', offset: -4 },
        { id: 5, ten: 'Thái dương', offset: -3 }, { id: 6, ten: 'Thiên cơ', offset: -1 }
    ];
    vongTuVi.forEach(s => {
        const pos = dichCung(viTriTuVi, s.offset);
        const dt = getDacTinh(s.id, pos);
        thapNhiCung[pos - 1].sao.push({ ten: s.ten, loai: 1, dacTinh: dt, nguHanh: ['O', ('H'), 'T', 'K', 'H', 'M'][s.id - 1] });
    });

    // 10. THIEN PHU
    const viTriThienPhu = dichCung(3, -(viTriTuVi - 3)) || 12;
    const vongThienPhu = [
        { id: 7, ten: 'Thiên phủ', offset: 0, nh: 'O' }, { id: 8, ten: 'Thái âm', offset: 1, nh: 'T' },
        { id: 9, ten: 'Tham lang', offset: 2, nh: 'T' }, { id: 10, ten: 'Cự môn', offset: 3, nh: 'T' },
        { id: 11, ten: 'Thiên tướng', offset: 4, nh: 'T' }, { id: 12, ten: 'Thiên lương', offset: 5, nh: 'M' },
        { id: 13, ten: 'Thất sát', offset: 6, nh: 'K' }, { id: 14, ten: 'Phá quân', offset: 10, nh: 'T' }
    ];
    vongThienPhu.forEach(s => {
        const pos = dichCung(viTriThienPhu, s.offset);
        const dt = getDacTinh(s.id, pos);
        thapNhiCung[pos - 1].sao.push({ ten: s.ten, loai: 1, dacTinh: dt, nguHanh: s.nh });
    });

    // 11. AN PHU TINH CO BAN
    // Loc Ton
    const viTriLocTon = THIEN_CAN[canNam].vitriDiaBan;
    thapNhiCung[viTriLocTon - 1].sao.push({ ten: 'Lộc tồn', nguHanh: 'O', loai: 3, cat: 'tot' });
    thapNhiCung[dichCung(viTriLocTon, 1) - 1].sao.push({ ten: 'Kình dương', nguHanh: 'K', loai: 11, cat: 'xau' });
    thapNhiCung[dichCung(viTriLocTon, -1) - 1].sao.push({ ten: 'Đà la', nguHanh: 'K', loai: 11, cat: 'xau' });

    // Van Xuong / Van Khuc
    thapNhiCung[dichCung(11, -(gioChiIndex - 1)) - 1].sao.push({ ten: 'Văn xương', nguHanh: 'K', loai: 6, cat: 'tot' });
    thapNhiCung[dichCung(5, (gioChiIndex - 1)) - 1].sao.push({ ten: 'Văn khúc', nguHanh: 'T', loai: 6, cat: 'tot' }); // Use 5 for Thin

    // Ta Phu / Huu Bat
    thapNhiCung[dichCung(5, thangAm - 1) - 1].sao.push({ ten: 'Tả phù', nguHanh: 'O', loai: 2, cat: 'tot' });
    thapNhiCung[dichCung(11, -(thangAm - 1)) - 1].sao.push({ ten: 'Hữu bật', nguHanh: 'O', loai: 2, cat: 'tot' });

    // Thai Tue
    const vongThaiTue = ['Thái tuế', 'Thiếu dương', 'Tang môn', 'Thiếu âm', 'Quan phù', 'Tử phù', 'Tuế phá', 'Long đức', 'Bạch hổ', 'Phúc đức', 'Điếu khách', 'Trực phù'];
    vongThaiTue.forEach((ten, i) => {
        const pos = dichCung(chiNam, i);
        const cat = ['Thái tuế', 'Thiếu dương', 'Thiếu âm', 'Long đức', 'Phúc đức'].includes(ten) ? 'tot' : 'xau';
        thapNhiCung[pos - 1].sao.push({ ten, nguHanh: 'H', loai: 12, cat });
    });

    // Thien Khoi / Thien Viet (Can Nam)
    const khoiVietMap = {
        1: [2, 8], 2: [1, 9], 3: [12, 10], 4: [10, 12], 5: [2, 8],
        6: [1, 9], 7: [2, 8], 8: [7, 3], 9: [4, 6], 10: [4, 6] // Corrected standard
    };
    // Standard Khoi Viet: Giap Mau Canh - Nguu Duong (Suu Mui). 
    // At Ky - Thu Hau (Ty Than). 
    // Binh Dinh - Tru Ke (Hoi Dau). 
    // Nham Quy - Tho Xa (Ty Mao). 
    // Tan - Phung Ho (Ngo Dan).
    // Lets use the map from simple logic provided in previous versions or generic standard.
    // Giap (Suu Mui), At (Ty Than), Binh (Hoi Dau), Dinh (Hoi Dau), Mau (Suu Mui), Ky (Ty Than), Canh (Suu Mui ?? check), Tan (Ngo Dan), Nham (Ty Mao), Quy (Ty Mao).
    // Using mapping from previous step was 1 -> 2 (Suu) and 8 (Mui). Correct.
    const kv = khoiVietMap[canNam] || [2, 8];
    thapNhiCung[kv[0] - 1].sao.push({ ten: 'Thiên khôi', nguHanh: 'H', loai: 6, cat: 'tot' });
    thapNhiCung[kv[1] - 1].sao.push({ ten: 'Thiên việt', nguHanh: 'H', loai: 6, cat: 'tot' });

    // TUAN / TRIET
    // Tuan rules: Giap Ty (1) -> Tuan tai 11, 12. 
    // Formula: Start of cycle = Chi - (Can - 1). If <= 0 += 12.
    // Tuan positions: Start - 2, Start - 1.
    const posGiap = ((chiNam - (canNam - 1)) + 12 - 1) % 12 + 1; // 1-12
    const tuan1 = ((posGiap - 2 - 1 + 12) % 12) + 1;
    const tuan2 = ((posGiap - 1 - 1 + 12) % 12) + 1;

    // Triet rules: Can Giap/Ky (1,6) -> Than Dau (9,10)
    const trietMap = { 1: [9, 10], 6: [9, 10], 2: [7, 8], 7: [7, 8], 3: [5, 6], 8: [5, 6], 4: [3, 4], 9: [3, 4], 5: [1, 2], 10: [1, 2] };
    const trietPos = trietMap[canNam] || [0, 0];

    thapNhiCung[tuan1 - 1].tuan = true;
    thapNhiCung[tuan2 - 1].tuan = true;
    thapNhiCung[trietPos[0] - 1].triet = true;
    thapNhiCung[trietPos[1] - 1].triet = true;

    // 12. TU HOA
    const th = TU_HOA[canNam];
    if (th) {
        for (let i = 0; i < 12; i++) {
            thapNhiCung[i].sao.forEach(s => {
                const sl = s.ten.toLowerCase();
                if (sl === th.loc.toLowerCase()) s.hoa = 'Lộc';
                if (sl === th.quyen.toLowerCase()) s.hoa = 'Quyền';
                if (sl === th.khoa.toLowerCase()) s.hoa = 'Khoa';
                if (sl === th.ky.toLowerCase()) { s.hoa = 'Kỵ'; s.cat = 'xau'; }
            });
        }
    }

    return {
        thapNhiCung,
        cungMenh,
        cungThan,
        info: {
            hoTen: '',
            ngayDuong: `${ngay}/${thang}/${nam}`,
            namSinh: nam,
            gioiTinh: gioiTinh ? 'Nam' : 'Nữ',
            tenNamAm: `${THIEN_CAN[canNam].ten} ${DIA_CHI[chiNam].ten}`,
            ngayAm, thangAm, namAm,
            gioChi: DIA_CHI[gioChiIndex].ten,
            banMenh: banMenhTen,
            tenCuc: tenCuc,
            amDuongMenh,
            menhChu: DIA_CHI[chiNam]?.menhChu,
            thanChu: DIA_CHI[chiNam]?.thanChu,
            tuHoa: th ? `${th.loc}/${th.quyen}/${th.khoa}/${th.ky}` : ''
        }
    };
}

export { dichCung };
