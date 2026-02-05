// Tu Vi Thien Luong - Complete Star Placement Algorithm
// Based on doanguyen/lasotuvi Python implementation
// Converted to JavaScript for web application

import { Solar, Lunar } from 'lunar-javascript';

// ============== CONSTANTS ==============

export const THIEN_CAN = [
    null, // index 0 unused
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

// Ban Menh (Nap Am names)
const BAN_MENH = {
    'K1': 'Hải trung kim', 'T1': 'Giản hạ thủy', 'H1': 'Tích lịch hỏa',
    'O1': 'Bích thượng thổ', 'M1': 'Tang đố mộc', 'T2': 'Đại khê thủy',
    'H2': 'Lư trung hỏa', 'O2': 'Thành đầu thổ', 'M2': 'Tùng bá mộc',
    'K2': 'Kim bạch kim', 'H3': 'Phú đăng hỏa', 'O3': 'Sa trung thổ',
    'M3': 'Đại lâm mộc', 'K3': 'Bạch lạp kim', 'T3': 'Trường lưu thủy',
    'K4': 'Sa trung kim', 'T4': 'Thiên hà thủy', 'H4': 'Thiên thượng hỏa',
    'O4': 'Lộ bàn thổ', 'M4': 'Dương liễu mộc', 'T5': 'Truyền trung thủy',
    'H5': 'Sơn hạ hỏa', 'O5': 'Đại trạch thổ', 'M5': 'Thạch lựu mộc',
    'K5': 'Kiếm phong kim', 'H6': 'Sơn đầu hỏa', 'O6': 'Ốc thượng thổ',
    'M6': 'Bình địa mộc', 'K6': 'Xoa xuyến kim', 'T6': 'Đại hải thủy',
};

// Nap Am Matrix
const MATRAN_NAP_AM = [
    null, // 0
    ['K1', null, 'T1', null, 'H1', null, 'O1', null, 'M1', null], // 1 Ty
    [null, 'K1', null, 'T1', null, 'H1', null, 'O1', null, 'M1'], // 2 Suu
    ['T2', null, 'H2', null, 'O2', null, 'M2', null, 'K2', null], // 3 Dan
    [null, 'T2', null, 'H2', null, 'O2', null, 'M2', null, 'K2'], // 4 Mao
    ['H3', null, 'O3', null, 'M3', null, 'K3', null, 'T3', null], // 5 Thin
    [null, 'H3', null, 'O3', null, 'M3', null, 'K3', null, 'T3'], // 6 Ty
    ['K4', null, 'T4', null, 'H4', null, 'O4', null, 'M4', null], // 7 Ngo
    [null, 'K4', null, 'T4', null, 'H4', null, 'O4', null, 'M4'], // 8 Mui
    ['T5', null, 'H5', null, 'O5', null, 'M5', null, 'K5', null], // 9 Than
    [null, 'T5', null, 'H5', null, 'O5', null, 'M5', null, 'K5'], // 10 Dau
    ['H6', null, 'O6', null, 'M6', null, 'K6', null, 'T6', null], // 11 Tuat
    [null, 'H6', null, 'O6', null, 'M6', null, 'K6', null, 'T6'], // 12 Hoi
];

// Dac Tinh (Status) Matrix for main stars
const DAC_TINH_MATRIX = {
    1: ['Tử vi', 'B', 'Đ', 'M', 'B', 'V', 'M', 'M', 'Đ', 'M', 'B', 'V', 'B'],
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
};

// Tu Hoa mapping by Year Can
const TU_HOA = {
    1: { loc: 'Liêm trinh', quyen: 'Phá quân', khoa: 'Vũ khúc', ky: 'Thái dương' },
    2: { loc: 'Thiên cơ', quyen: 'Thiên lương', khoa: 'Tử vi', ky: 'Thái âm' },
    3: { loc: 'Thiên đồng', quyen: 'Thiên cơ', khoa: 'Văn xương', ky: 'Liêm trinh' },
    4: { loc: 'Thái âm', quyen: 'Thiên đồng', khoa: 'Thiên cơ', ky: 'Cự môn' },
    5: { loc: 'Tham lang', quyen: 'Thái âm', khoa: 'Hữu bật', ky: 'Thiên cơ' },
    6: { loc: 'Vũ khúc', quyen: 'Tham lang', khoa: 'Thiên lương', ky: 'Văn khúc' },
    7: { loc: 'Thái dương', quyen: 'Vũ khúc', khoa: 'Thái âm', ky: 'Thiên đồng' },
    8: { loc: 'Cự môn', quyen: 'Thái dương', khoa: 'Văn khúc', ky: 'Văn xương' },
    9: { loc: 'Thiên lương', quyen: 'Tử vi', khoa: 'Tả phù', ky: 'Vũ khúc' },
    10: { loc: 'Phá quân', quyen: 'Cự môn', khoa: 'Thái âm', ky: 'Tham lang' },
};

// ============== UTILITY FUNCTIONS ==============

function dichCung(cungBanDau, ...args) {
    let cungSauKhiDich = cungBanDau;
    for (const soCungDich of args) {
        cungSauKhiDich += soCungDich;
    }
    // Proper modulo that handles negative numbers
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
    } catch {
        return null;
    }
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

    while (cuc < ngayAm) {
        cuc += cucBanDau;
        cungDan += 1;
    }

    let saiLech = cuc - ngayAm;
    if (saiLech % 2 === 1) {
        saiLech = -saiLech;
    }

    return dichCung(cungDan, saiLech);
}

function timTrangSinh(cucSo) {
    switch (cucSo) {
        case 6: return 3;  // Hoa luc cuc -> Dan
        case 4: return 6;  // Kim tu cuc -> Ty
        case 2:
        case 5: return 9;  // Thuy nhi, Tho ngu -> Than
        case 3: return 12; // Moc tam cuc -> Hoi
        default: return 3;
    }
}

function getDacTinh(saoId, cungSo) {
    const matrix = DAC_TINH_MATRIX[saoId];
    if (matrix && matrix[cungSo]) {
        return matrix[cungSo];
    }
    return null;
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

    const gioiTinhSo = gioiTinh ? 1 : -1; // Nam = 1, Nu = -1

    // 2. TIM CUNG MENH VA CUNG THAN
    const cungMenh = dichCung(3, thangAm - 1, -(gioChiIndex - 1));
    const cungThan = dichCung(3, thangAm - 1, gioChiIndex - 1);

    // 3. TIM CUC
    const hanhCuc = timCuc(cungMenh, canNam);
    const cucInfo = NGU_HANH[hanhCuc];
    const cucSo = cucInfo ? cucInfo.cuc : 2;
    const tenCuc = cucInfo ? cucInfo.tenCuc : 'Cục?';

    // 4. TIM BAN MENH (NAP AM NAM SINH)
    const banMenhKey = nguHanhNapAm(chiNam, canNam, false);
    const banMenhTen = nguHanhNapAm(chiNam, canNam, true) || 'Mệnh';

    // 5. AM DUONG THUAN/NGHICH LY
    const cungAmDuong = cungMenh % 2 === 1 ? 1 : -1;
    const amDuongMenh = (cungAmDuong * gioiTinhSo === 1)
        ? 'Âm dương thuận lý'
        : 'Âm dương nghịch lý';

    // 6. KHOI TAO 12 CUNG
    // Tinh Can khoi cua cung Dan dua tren Can Nam (Ngu Ho Don)
    const canCungDan = ((canNam % 5) * 2 + 3) % 10 || 10;

    const thapNhiCung = [];
    for (let i = 1; i <= 12; i++) {
        const distFromDan = (i - 3 + 12) % 12;
        const canCung = (canCungDan + distFromDan - 1) % 10 + 1;

        thapNhiCung.push({
            cungSo: i,
            tenChi: DIA_CHI[i].ten,
            tenCan: THIEN_CAN[canCung].ten,
            hanhCung: DIA_CHI[i].nguHanh,
            tenCung: '',
            isMenh: i === cungMenh,
            isThan: i === cungThan,
            sao: [],
            daiHan: 0,
        });
    }

    // 7. AN TEN CUNG (Menh -> Phu Mau -> ...)
    for (let i = 0; i < 12; i++) {
        const cungIndex = dichCung(cungMenh, i);
        thapNhiCung[cungIndex - 1].tenCung = CUNG_CHU[i + 1];
    }

    // 8. AN DAI HAN
    for (let i = 0; i < 12; i++) {
        const cung = thapNhiCung[i];
        const khoangCach = (cung.cungSo - cungMenh + 12) % 12;
        const dh = cucSo + (gioiTinhSo === 1 ? khoangCach : (12 - khoangCach) % 12) * 10;
        cung.daiHan = dh;
    }

    // ============== AN SAO ==============

    // 9. TIM VI TRI TU VI
    const viTriTuVi = timTuVi(cucSo, ngayAm);

    // 10. AN CHINH TINH VONG TU VI (Nghich)
    const vongTuVi = [
        { id: 1, ten: 'Tử vi', offset: 0 },
        { id: 6, ten: 'Thiên cơ', offset: -1 },
        { id: 5, ten: 'Thái dương', offset: -3 },
        { id: 4, ten: 'Vũ khúc', offset: -4 },
        { id: 3, ten: 'Thiên đồng', offset: -5 },
        { id: 2, ten: 'Liêm trinh', offset: -8 },
    ];

    vongTuVi.forEach(sao => {
        const viTri = dichCung(viTriTuVi, sao.offset);
        const dacTinh = getDacTinh(sao.id, viTri);
        thapNhiCung[viTri - 1].sao.push({
            ten: sao.ten,
            nguHanh: ['O', 'H', 'T', 'K', 'H', 'M'][sao.id - 1],
            loai: 1, // Chinh tinh
            dacTinh,
        });
    });

    // 11. AN CHINH TINH VONG THIEN PHU (Thuan)
    // Thien Phu doi xung voi Tu Vi qua truc Dan-Than
    const viTriThienPhu = dichCung(3, -(viTriTuVi - 3)) || 12;

    const vongThienPhu = [
        { id: 7, ten: 'Thiên phủ', offset: 0, nguHanh: 'O' },
        { id: 8, ten: 'Thái âm', offset: 1, nguHanh: 'T' },
        { id: 9, ten: 'Tham lang', offset: 2, nguHanh: 'T' },
        { id: 10, ten: 'Cự môn', offset: 3, nguHanh: 'T' },
        { id: 11, ten: 'Thiên tướng', offset: 4, nguHanh: 'T' },
        { id: 12, ten: 'Thiên lương', offset: 5, nguHanh: 'M' },
        { id: 13, ten: 'Thất sát', offset: 6, nguHanh: 'K' },
        { id: 14, ten: 'Phá quân', offset: 10, nguHanh: 'T' },
    ];

    vongThienPhu.forEach(sao => {
        const viTri = dichCung(viTriThienPhu, sao.offset);
        const dacTinh = getDacTinh(sao.id, viTri);
        thapNhiCung[viTri - 1].sao.push({
            ten: sao.ten,
            nguHanh: sao.nguHanh,
            loai: 1,
            dacTinh,
        });
    });

    // 12. AN VONG THAI TUE
    const vongThaiTue = [
        'Thái tuế', 'Thiếu dương', 'Tang môn', 'Thiếu âm', 'Quan phù', 'Tử phù',
        'Tuế phá', 'Long đức', 'Bạch hổ', 'Phúc đức', 'Điếu khách', 'Trực phù'
    ];

    vongThaiTue.forEach((ten, i) => {
        const viTri = dichCung(chiNam, i);
        const loai = ['Tang môn', 'Quan phù', 'Tử phù', 'Tuế phá', 'Bạch hổ', 'Điếu khách'].includes(ten) ? 12 : 5;
        thapNhiCung[viTri - 1].sao.push({ ten, nguHanh: 'H', loai });
    });

    // 13. AN THIEN KHONG (dong cung voi Thieu Duong - Thien Luong school)
    const viTriThienKhong = dichCung(chiNam, 1);
    thapNhiCung[viTriThienKhong - 1].sao.push({
        ten: 'Thiên không',
        nguHanh: 'T',
        loai: 11,
    });

    // 14. AN LOC TON
    const viTriLocTon = THIEN_CAN[canNam].vitriDiaBan;
    thapNhiCung[viTriLocTon - 1].sao.push({
        ten: 'Lộc tồn',
        nguHanh: 'O',
        loai: 3,
    });

    // 15. AN KINH DUONG, DA LA
    const viTriKinhDuong = dichCung(viTriLocTon, 1);
    const viTriDaLa = dichCung(viTriLocTon, -1);
    thapNhiCung[viTriKinhDuong - 1].sao.push({ ten: 'Kình dương', nguHanh: 'K', loai: 11 });
    thapNhiCung[viTriDaLa - 1].sao.push({ ten: 'Đà la', nguHanh: 'K', loai: 11 });

    // 16. AN VAN XUONG, VAN KHUC (theo gio)
    const viTriVanXuong = dichCung(11, -(gioChiIndex - 1));
    const viTriVanKhuc = dichCung(3, gioChiIndex - 1);
    thapNhiCung[viTriVanXuong - 1].sao.push({ ten: 'Văn xương', nguHanh: 'K', loai: 6 });
    thapNhiCung[viTriVanKhuc - 1].sao.push({ ten: 'Văn khúc', nguHanh: 'T', loai: 6 });

    // 17. AN TA PHU, HUU BAT (theo thang)
    const viTriTaPhu = dichCung(5, thangAm - 1);
    const viTriHuuBat = dichCung(9, -(thangAm - 1));
    thapNhiCung[viTriTaPhu - 1].sao.push({ ten: 'Tả phù', nguHanh: 'O', loai: 2 });
    thapNhiCung[viTriHuuBat - 1].sao.push({ ten: 'Hữu bật', nguHanh: 'O', loai: 2 });

    // 18. AN DIA KHONG, DIA KIEP (theo gio)
    const viTriDiaKhong = dichCung(12, -(gioChiIndex - 1));
    const viTriDiaKiep = dichCung(12, gioChiIndex - 1);
    thapNhiCung[viTriDiaKhong - 1].sao.push({ ten: 'Địa không', nguHanh: 'H', loai: 11 });
    thapNhiCung[viTriDiaKiep - 1].sao.push({ ten: 'Địa kiếp', nguHanh: 'H', loai: 11 });

    // 19. AN VONG TRANG SINH
    const viTriTrangSinh = timTrangSinh(cucSo);
    const chieuTrangSinh = gioiTinhSo; // Nam thuan, Nu nghich
    const vongTrangSinhTen = [
        'Tràng sinh', 'Mộc dục', 'Quan đới', 'Lâm quan', 'Đế vượng', 'Suy',
        'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'
    ];

    vongTrangSinhTen.forEach((ten, i) => {
        const viTri = dichCung(viTriTrangSinh, chieuTrangSinh * i);
        thapNhiCung[viTri - 1].sao.push({ ten, nguHanh: 'T', loai: 2, vongTrangSinh: true });
    });

    // 20. AN HONG LOAN, THIEN HY (theo nam)
    const viTriHongLoan = dichCung(4, -(chiNam - 1));
    const viTriThienHy = dichCung(viTriHongLoan, 6);
    thapNhiCung[viTriHongLoan - 1].sao.push({ ten: 'Hồng loan', nguHanh: 'T', loai: 8 });
    thapNhiCung[viTriThienHy - 1].sao.push({ ten: 'Thiên hỷ', nguHanh: 'T', loai: 5 });

    // 21. AN DAO HOA (theo chi nam)
    const daoHoaMap = { 1: 10, 2: 7, 3: 4, 4: 1, 5: 10, 6: 7, 7: 4, 8: 1, 9: 10, 10: 7, 11: 4, 12: 1 };
    const viTriDaoHoa = daoHoaMap[chiNam] || 1;
    thapNhiCung[viTriDaoHoa - 1].sao.push({ ten: 'Đào hoa', nguHanh: 'M', loai: 8 });

    // 22. AN THIEN MA (theo chi nam)
    const thienMaMap = { 1: 3, 2: 12, 3: 9, 4: 6, 5: 3, 6: 12, 7: 9, 8: 6, 9: 3, 10: 12, 11: 9, 12: 6 };
    const viTriThienMa = thienMaMap[chiNam] || 3;
    thapNhiCung[viTriThienMa - 1].sao.push({ ten: 'Thiên mã', nguHanh: 'H', loai: 3 });

    // 23. AN THIEN KHOI, THIEN VIET (theo can nam)
    const thienKhoiMap = { 1: 2, 2: 1, 3: 12, 4: 12, 5: 2, 6: 1, 7: 8, 8: 8, 9: 4, 10: 4 };
    const thienVietMap = { 1: 8, 2: 7, 3: 10, 4: 10, 5: 8, 6: 7, 7: 2, 8: 2, 9: 6, 10: 6 };
    const viTriThienKhoi = thienKhoiMap[canNam] || 2;
    const viTriThienViet = thienVietMap[canNam] || 8;
    thapNhiCung[viTriThienKhoi - 1].sao.push({ ten: 'Thiên khôi', nguHanh: 'H', loai: 6 });
    thapNhiCung[viTriThienViet - 1].sao.push({ ten: 'Thiên việt', nguHanh: 'H', loai: 6 });

    // 24. AN THIEN HINH (theo thang)
    const viTriThienHinh = dichCung(10, thangAm - 1);
    thapNhiCung[viTriThienHinh - 1].sao.push({ ten: 'Thiên hình', nguHanh: 'H', loai: 15 });

    // 25. AN THIEN Y (theo thang)
    const thienYMap = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11, 11: 12, 12: 1 };
    const viTriThienY = thienYMap[thangAm] || 2;
    thapNhiCung[viTriThienY - 1].sao.push({ ten: 'Thiên y', nguHanh: 'T', loai: 5 });

    // 26. AN THIEN KHOC, THIEN HU (theo chi nam)
    const thienKhocMap = { 1: 7, 2: 8, 3: 9, 4: 10, 5: 11, 6: 12, 7: 1, 8: 2, 9: 3, 10: 4, 11: 5, 12: 6 };
    const thienHuMap = { 1: 7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1, 8: 12, 9: 11, 10: 10, 11: 9, 12: 8 };
    thapNhiCung[thienKhocMap[chiNam] - 1].sao.push({ ten: 'Thiên khốc', nguHanh: 'T', loai: 12 });
    thapNhiCung[thienHuMap[chiNam] - 1].sao.push({ ten: 'Thiên hư', nguHanh: 'T', loai: 12 });

    // 27. AN LONG TRI, PHUONG CAC (theo chi nam)
    const longTriMap = { 1: 5, 2: 6, 3: 7, 4: 8, 5: 9, 6: 10, 7: 11, 8: 12, 9: 1, 10: 2, 11: 3, 12: 4 };
    const phuongCacMap = { 1: 11, 2: 12, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10 };
    thapNhiCung[longTriMap[chiNam] - 1].sao.push({ ten: 'Long trì', nguHanh: 'T', loai: 3 });
    thapNhiCung[phuongCacMap[chiNam] - 1].sao.push({ ten: 'Phượng các', nguHanh: 'O', loai: 3 });

    // 28. AN QUOC AN, DUONG PHU (theo chi nam)
    const quocAnMap = { 1: 4, 2: 5, 3: 6, 4: 7, 5: 8, 6: 9, 7: 10, 8: 11, 9: 12, 10: 1, 11: 2, 12: 3 };
    const duongPhuMap = { 1: 8, 2: 9, 3: 10, 4: 11, 5: 12, 6: 1, 7: 2, 8: 3, 9: 4, 10: 5, 11: 6, 12: 7 };
    thapNhiCung[quocAnMap[chiNam] - 1].sao.push({ ten: 'Quốc ấn', nguHanh: 'O', loai: 6 });
    thapNhiCung[duongPhuMap[chiNam] - 1].sao.push({ ten: 'Đường phù', nguHanh: 'M', loai: 4 });

    // 29. AN TAM THAI, BAT TOA (theo ngay am)
    const viTriTamThai = dichCung(1, ngayAm - 1);
    const viTriBatToa = dichCung(1, -(ngayAm - 1));
    thapNhiCung[viTriTamThai - 1].sao.push({ ten: 'Tam thai', nguHanh: 'M', loai: 7 });
    thapNhiCung[viTriBatToa - 1].sao.push({ ten: 'Bát tọa', nguHanh: 'T', loai: 7 });

    // 30. AN AN QUANG, THIEN QUY (theo ngay am)
    const viTriAnQuang = dichCung(8, ngayAm - 1);
    const viTriThienQuy = dichCung(4, -(ngayAm - 1));
    thapNhiCung[viTriAnQuang - 1].sao.push({ ten: 'Ân quang', nguHanh: 'M', loai: 3 });
    thapNhiCung[viTriThienQuy - 1].sao.push({ ten: 'Thiên quý', nguHanh: 'O', loai: 3 });

    // 31. AN CO THAN, QUA TU (theo chi nam)
    const coThanMap = { 1: 3, 2: 3, 3: 6, 4: 6, 5: 6, 6: 9, 7: 9, 8: 9, 9: 12, 10: 12, 11: 12, 12: 3 };
    const quaTuMap = { 1: 11, 2: 11, 3: 2, 4: 2, 5: 2, 6: 5, 7: 5, 8: 5, 9: 8, 10: 8, 11: 8, 12: 11 };
    thapNhiCung[coThanMap[chiNam] - 1].sao.push({ ten: 'Cô thần', nguHanh: 'O', loai: 13 });
    thapNhiCung[quaTuMap[chiNam] - 1].sao.push({ ten: 'Quả tú', nguHanh: 'O', loai: 13 });

    // 32. AN HOA TINH, LINH TINH (theo chi nam + gio)
    const hoaTinhBase = { 1: 3, 2: 10, 3: 3, 4: 10, 5: 3, 6: 10, 7: 3, 8: 10, 9: 3, 10: 10, 11: 3, 12: 10 };
    const linhTinhBase = { 1: 10, 2: 3, 3: 10, 4: 3, 5: 10, 6: 3, 7: 10, 8: 3, 9: 10, 10: 3, 11: 10, 12: 3 };
    const viTriHoaTinh = dichCung(hoaTinhBase[chiNam], gioChiIndex - 1);
    const viTriLinhTinh = dichCung(linhTinhBase[chiNam], gioChiIndex - 1);
    thapNhiCung[viTriHoaTinh - 1].sao.push({ ten: 'Hỏa tinh', nguHanh: 'H', loai: 11 });
    thapNhiCung[viTriLinhTinh - 1].sao.push({ ten: 'Linh tinh', nguHanh: 'H', loai: 11 });

    // 33. AN VONG BAC SI (theo can nam, thuan/nghich)
    const vongBacSi = ['Bác sĩ', 'Lực sĩ', 'Thanh long', 'Tiểu hao', 'Tướng quân', 'Tấu thư',
        'Phi liêm', 'Hỷ thần', 'Bệnh phù', 'Đại hao', 'Phục binh', 'Quan phủ'];
    const bacSiChieu = (canNam % 2 === 1) ? 1 : -1; // Duong thuan, Am nghich
    vongBacSi.forEach((ten, i) => {
        const viTri = dichCung(viTriLocTon, bacSiChieu * i);
        const loai = ['Tiểu hao', 'Phi liêm', 'Bệnh phù', 'Đại hao', 'Phục binh', 'Quan phủ'].includes(ten) ? 12 : 5;
        thapNhiCung[viTri - 1].sao.push({ ten, nguHanh: 'T', loai });
    });

    // 34. AN TU HOA
    const tuHoa = TU_HOA[canNam];
    if (tuHoa) {
        // Find and mark stars with Hóa
        for (let i = 0; i < 12; i++) {
            thapNhiCung[i].sao.forEach(sao => {
                if (sao.ten.toLowerCase() === tuHoa.loc.toLowerCase()) {
                    sao.hoa = 'Lộc';
                    sao.cat = 'tot';
                }
                if (sao.ten.toLowerCase() === tuHoa.quyen.toLowerCase()) {
                    sao.hoa = 'Quyền';
                    sao.cat = 'tot';
                }
                if (sao.ten.toLowerCase() === tuHoa.khoa.toLowerCase()) {
                    sao.hoa = 'Khoa';
                    sao.cat = 'tot';
                }
                if (sao.ten.toLowerCase() === tuHoa.ky.toLowerCase()) {
                    sao.hoa = 'Kỵ';
                    sao.cat = 'xau';
                }
            });
        }
    }

    // 35. AN LUU NIEN VAN TINH (theo can nam)
    const lnVanTinhMap = { 1: 6, 2: 7, 3: 9, 4: 10, 5: 9, 6: 10, 7: 12, 8: 1, 9: 3, 10: 4 };
    thapNhiCung[lnVanTinhMap[canNam] - 1].sao.push({ ten: 'Ln.Văn tinh', nguHanh: 'H', loai: 6, cat: 'tot' });

    // 36. AN GIAI THAN (dong cung Phuong Cac)
    thapNhiCung[phuongCacMap[chiNam] - 1].sao.push({ ten: 'Giải thần', nguHanh: 'M', loai: 3, cat: 'tot' });

    // 37. AN THIEN GIAI, DIA GIAI (theo thang)
    const viTriThienGiai = dichCung(9, thangAm - 1);
    const viTriDiaGiai = dichCung(8, thangAm - 1);
    thapNhiCung[viTriThienGiai - 1].sao.push({ ten: 'Thiên giải', nguHanh: 'H', loai: 3, cat: 'tot' });
    thapNhiCung[viTriDiaGiai - 1].sao.push({ ten: 'Địa giải', nguHanh: 'T', loai: 3, cat: 'tot' });

    // 38. AN THIEN QUAN, THIEN PHUC (theo can nam)
    const thienQuanMap = { 1: 8, 2: 5, 3: 6, 4: 3, 5: 4, 6: 10, 7: 12, 8: 10, 9: 11, 10: 7 };
    const thienPhucMap = { 1: 10, 2: 9, 3: 1, 4: 12, 5: 4, 6: 3, 7: 7, 8: 6, 9: 7, 10: 6 };
    thapNhiCung[thienQuanMap[canNam] - 1].sao.push({ ten: 'Thiên quan', nguHanh: 'H', loai: 5, cat: 'tot' });
    thapNhiCung[thienPhucMap[canNam] - 1].sao.push({ ten: 'Thiên phúc', nguHanh: 'H', loai: 5, cat: 'tot' });

    // 39. CATEGORIZE REMAINING STARS
    thapNhiCung.forEach(cung => {
        cung.sao.forEach(sao => {
            if (!sao.cat) {
                if ([11, 12, 13, 15].includes(sao.loai)) {
                    sao.cat = 'xau';
                } else if (sao.loai === 1) {
                    sao.cat = 'trung';
                } else {
                    sao.cat = 'tot';
                }
            }
        });
    });

    // 40. TIM TUAN TRIET (Tuan/Triet positions)
    const tuanTriet = timTuanTriet(canNam, chiNam);
    tuanTriet.tuan.forEach(cung => {
        if (cung >= 1 && cung <= 12) thapNhiCung[cung - 1].tuan = true;
    });
    tuanTriet.triet.forEach(cung => {
        if (cung >= 1 && cung <= 12) thapNhiCung[cung - 1].triet = true;
    });

    // ============== RETURN ==============
    return {
        thapNhiCung,
        cungMenh,
        cungThan,
        info: {
            hoTen: '',
            gioiTinh: gioiTinh ? 'Nam' : 'Nữ',
            ngayDuong: `${ngay}/${thang}/${nam}`,
            namSinh: nam,
            thangSinh: thang,
            ngayAm,
            thangAm,
            namAm, // number
            tenNamAm: `${THIEN_CAN[canNam].ten} ${DIA_CHI[chiNam].ten}`,
            tenThangAm: `${THIEN_CAN[((canNam % 5) * 2 + thangAm + 1) % 10 || 10].ten} ${DIA_CHI[dichCung(3, thangAm - 1)].ten}`,
            tenNgayAm: `${lunar.getDayGan()} ${lunar.getDayZhi()}`,
            gioChi: `${lunar.getTimeGan()} ${lunar.getTimeZhi()}`,
            canNam: THIEN_CAN[canNam].ten,
            chiNam: DIA_CHI[chiNam].ten,
            gioSinh: DIA_CHI[gioChiIndex].ten,
            tenCuc,
            cucSo,
            banMenh: banMenhTen,
            amDuongMenh,
            menhChu: DIA_CHI[chiNam]?.menhChu || '',
            thanChu: DIA_CHI[chiNam]?.thanChu || '',
            tuHoa: tuHoa ? `${tuHoa.loc} - ${tuHoa.quyen} - ${tuHoa.khoa} - ${tuHoa.ky}` : '',
        }
    };
}

// Helper: Tim Tuan Triet
function timTuanTriet(canNam, chiNam) {
    // Tuan: 2 cung truoc Can theo Chi
    // Triet: 2 cung sau Can
    const tuanStart = dichCung(chiNam, -(canNam - 1) - 1);
    const tuanEnd = dichCung(tuanStart, 1);

    const trietStart = dichCung(chiNam, (10 - canNam + 1));
    const trietEnd = dichCung(trietStart, 1);

    return {
        tuan: [tuanStart, tuanEnd],
        triet: [trietStart, trietEnd],
    };
}

// Export for testing
export { dichCung, timTuVi, timCuc, nguHanhNapAm };
