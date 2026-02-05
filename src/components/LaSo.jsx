import React from 'react';
import { clsx } from 'clsx';

const CUNG_NAMES = [
    "Trống",
    "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ",
    "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"
];

// Grid positions for 12 cung (traditional layout)
// Row 1: 6, 7, 8, 9 (Tỵ, Ngọ, Mùi, Thân)
// Row 2: 5,        10 (Thìn,      Dậu)
// Row 3: 4,        11 (Mão,       Tuất)
// Row 4: 3, 2, 1, 12 (Dần, Sửu, Tý, Hợi)
// Index mapping:
const GRID_MAP = [
    null,
    { row: 4, col: 3 }, // Tý
    { row: 4, col: 2 }, // Sửu
    { row: 4, col: 1 }, // Dần
    { row: 3, col: 1 }, // Mão
    { row: 2, col: 1 }, // Thìn
    { row: 1, col: 1 }, // Tỵ
    { row: 1, col: 2 }, // Ngọ
    { row: 1, col: 3 }, // Mùi
    { row: 1, col: 4 }, // Thân
    { row: 2, col: 4 }, // Dậu
    { row: 3, col: 4 }, // Tuất
    { row: 4, col: 4 }, // Hợi
];

const HanhColor = {
    'K': 'text-yellow-600 dark:text-yellow-400',
    'M': 'text-green-600 dark:text-green-400',
    'T': 'text-blue-600 dark:text-blue-400',
    'H': 'text-red-600 dark:text-red-400',
    'O': 'text-orange-600 dark:text-orange-400',
};

const LaSo = ({ data }) => {
    if (!data) return null;

    const { thapNhiCung, info } = data;

    return (
        <div className="w-full max-w-[1000px] mx-auto p-2 sm:p-4">
            <div className="grid grid-cols-4 grid-rows-4 gap-1 aspect-square sm:aspect-auto sm:h-[800px] bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden shadow-2xl">

                {/* Central Info Panel */}
                <div className="col-start-2 col-end-4 row-start-2 row-end-4 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center p-4 z-10">
                    <h2 className="text-xl sm:text-2xl font-black text-primary uppercase tracking-widest">{info.hoTen || "Lá Số Tử Vi"}</h2>
                    <div className="mt-2 space-y-1 text-xs sm:text-sm">
                        <p className="font-bold underline decoration-primary">Năm {info.namSinh} ({info.tenNamAm})</p>
                        <p>Sinh ngày: {info.ngayDuong} ({info.ngayAm}/{info.thangAm} Âm)</p>
                        <p>Giờ: {info.gioSinh} ({info.gioChi})</p>
                        <p className="mt-2 text-primary font-bold">Mệnh: {info.banMenh}</p>
                        <p className="text-primary font-bold">{info.tenCuc} - {info.amDuongMenh}</p>
                    </div>
                </div>

                {/* 12 Cung */}
                {thapNhiCung.map((cung, idx) => {
                    const pos = GRID_MAP[cung.cungSo];
                    return (
                        <div
                            key={idx}
                            className={clsx(
                                "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 sm:p-2 flex flex-col relative overflow-hidden transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-default",
                                pos.row === 1 ? "border-t-0" : "",
                                pos.col === 1 ? "border-l-0" : "",
                            )}
                            style={{ gridRow: pos.row, gridColumn: pos.col }}
                        >
                            {/* Header: Cung Name & Chi */}
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] sm:text-xs font-black text-white bg-primary px-1 rounded uppercase tracking-tighter">
                                    {cung.tenCung}
                                </span>
                                <span className={clsx("text-xs font-bold", HanhColor[cung.hanhCung])}>
                                    {cung.tenCan} {cung.tenChi}
                                </span>
                            </div>

                            {/* Stars List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-0.5">
                                {/* Chính tinh */}
                                {cung.sao.filter(s => s.loai === 1).map((s, i) => (
                                    <div key={i} className="text-xs sm:text-sm font-extrabold text-red-700 dark:text-red-400 uppercase leading-none mb-0.5">
                                        {s.ten} {s.dacTinh && `(${s.dacTinh})`}
                                    </div>
                                ))}

                                {/* Phụ tinh - Better Stars */}
                                <div className="flex flex-wrap gap-x-1 mt-1 border-t border-slate-100 dark:border-slate-800 pt-1">
                                    {cung.sao.filter(s => s.loai > 1 && s.cat === 'tot').map((s, i) => (
                                        <span key={i} className="text-[9px] sm:text-[11px] font-medium text-blue-600 dark:text-blue-400">
                                            {s.ten}{s.hoa ? `-${s.hoa}` : ''}
                                        </span>
                                    ))}
                                </div>

                                {/* Phụ tinh - Harmful Stars */}
                                <div className="flex flex-wrap gap-x-1 mt-0.5">
                                    {cung.sao.filter(s => s.loai > 1 && s.cat === 'xau').map((s, i) => (
                                        <span key={i} className="text-[9px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400">
                                            {s.ten}{s.hoa ? `-${s.hoa}` : ''}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Footer: Dai Han */}
                            <div className="mt-auto pt-1 flex justify-between items-end border-t border-slate-50 dark:border-slate-800">
                                <span className="text-[9px] font-bold text-slate-400">{cung.daiHan}</span>
                                {cung.tuan && <span className="text-[9px] font-bold text-amber-600">TUẦN</span>}
                                {cung.triet && <span className="text-[9px] font-bold text-amber-600">TRIỆT</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LaSo;
