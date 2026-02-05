import React from 'react';
import { clsx } from 'clsx';
// import { motion } from 'framer-motion';

// --- CONFIGURATION & MAPPING ---

// Grid positions (1-indexed for CSS Grid)
const GRID_MAP = {
    1: { row: 4, col: 3 }, // Tý
    2: { row: 4, col: 2 }, // Sửu
    3: { row: 4, col: 1 }, // Dần
    4: { row: 3, col: 1 }, // Mão
    5: { row: 2, col: 1 }, // Thìn
    6: { row: 1, col: 1 }, // Tỵ
    7: { row: 1, col: 2 }, // Ngọ
    8: { row: 1, col: 3 }, // Mùi
    9: { row: 1, col: 4 }, // Thân
    10: { row: 2, col: 4 }, // Dậu
    11: { row: 3, col: 4 }, // Tuất
    12: { row: 4, col: 4 }, // Hợi
};

// Coordinates for Tuan/Triet markers (percentage based on 4x4 grid)
// Keys are the "Start" Cung ID of the pair (clockwise). e.g., '6' means between Tỵ(6) and Ngọ(7).
// NOTE: These coords are for the BORDER SHARED by the pair.
const BORDER_COORDS = {
    6: { top: '0%', left: '25%', vertical: true },   // Ty-Ngo (Top Edge) -> Actually adjacent cells.
    // 4x4 Grid.
    // Row 1: 6, 7, 8, 9. Border between 6 and 7 is at 25% width of row?
    // Let's use absolute positioning relative to container.
    // 6 (R1, C1), 7 (R1, C2). Border is vertical at 25% W, around 12% H (Top row).
    // Let's assume uniform 25% cells.
    6: { top: '12.5%', left: '25%', vertical: true },
    7: { top: '12.5%', left: '50%', vertical: true },
    8: { top: '12.5%', left: '75%', vertical: true },
    9: { top: '25%', left: '87.5%', vertical: false }, // Than (R1,C4) - Dau (R2,C4). Border at 25% H.
    10: { top: '50%', left: '87.5%', vertical: false },
    11: { top: '75%', left: '87.5%', vertical: false },
    12: { top: '87.5%', left: '75%', vertical: true }, // Hoi (R4,C4) - Ty (R4,C3). Border at 75% W? No, 75% left.
    // Wait, 12 is at 4,4. 1 is at 4,3. Border is at 75%. Correct.
    1: { top: '87.5%', left: '50%', vertical: true },
    2: { top: '87.5%', left: '25%', vertical: true },
    3: { top: '75%', left: '12.5%', vertical: false }, // Dan (R4,C1) - Mao (R3,C1). Border at 75% H.
    4: { top: '50%', left: '12.5%', vertical: false },
    5: { top: '25%', left: '12.5%', vertical: false },
};

// Element Colors
const ELEMENT_COLORS = {
    'K': 'text-gray-500 font-bold',
    'M': 'text-green-600 font-bold',
    'T': 'text-slate-900 font-bold', // Thuy = Black/Dark Blue
    'H': 'text-red-600 font-bold',
    'O': 'text-yellow-600 font-bold',
};

const LaSo = ({ data }) => {
    if (!data) return null;
    const { thapNhiCung, info } = data;

    // Helper to find pairs for Tuan/Triet
    const renderBarriers = (type) => {
        const markers = [];
        // Check all pairs
        for (let i = 1; i <= 12; i++) {
            const current = thapNhiCung.find(c => c.cungSo === i);
            const nextID = (i % 12) + 1;
            const next = thapNhiCung.find(c => c.cungSo === nextID);

            // If both have the flag, place marker
            if (current[type.toLowerCase()] && next[type.toLowerCase()]) {
                const coords = BORDER_COORDS[i];
                if (coords) {
                    markers.push(
                        <div
                            key={`${type}-${i}`}
                            className="absolute z-20 flex items-center justify-center pointer-events-none"
                            style={{
                                top: coords.top,
                                left: coords.left,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <div className="bg-black text-white text-[10px] items-center justify-center flex px-1 py-[2px] shadow-sm font-black uppercase tracking-tighter"
                                style={{
                                    border: '1px solid white'
                                }}>
                                {type}
                            </div>
                        </div>
                    );
                }
            }
        }
        return markers;
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto p-2 bg-white font-serif text-slate-900">
            <div className="relative aspect-square w-full border-2 border-slate-900 bg-slate-100 shadow-2xl overflow-hidden">

                {/* 4x4 Grid */}
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-[1px] bg-slate-400">

                    {/* CENTER INFO */}
                    <div className="col-start-2 col-end-4 row-start-2 row-end-4 bg-white flex flex-col items-center justify-center text-center p-4 border border-slate-900 m-[-1px] z-10">
                        {/* Decorative lines */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-200"></div>

                        <h2 className="text-2xl font-black text-red-600 uppercase mb-2">{info.hoTen || "DƯƠNG SỐ"}</h2>

                        <div className="text-sm space-y-1 font-medium text-slate-800">
                            <p className="uppercase"><span className="text-slate-500">Năm:</span> <b>{info.tenNamAm}</b> ({info.canNam})</p>
                            <p><span className="text-slate-500">Tháng:</span> <b>{info.thangAm}</b> <span className="text-slate-500">Ngày:</span> <b>{info.ngayAm}</b></p>
                            <p><span className="text-slate-500">Giờ:</span> <b>{info.gioChi}</b></p>

                            <hr className="w-16 border-t border-slate-300 my-2 mx-auto" />

                            <p><span className="text-red-600 font-bold uppercase">{info.banMenh}</span></p>
                            <p className="font-bold">{info.tenCuc}</p>
                            <p className="italic text-slate-500 text-xs">{info.amDuongMenh}</p>
                        </div>

                        <div className="mt-8 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                            Tử Vi Thiên Lương
                        </div>
                    </div>

                    {/* 12 CUNG */}
                    {thapNhiCung.map((cung, idx) => {
                        const pos = GRID_MAP[cung.cungSo];
                        // Filter Main Stars
                        const chinhTinh = cung.sao.filter(s => s.loai === 1);
                        const phuTinhTot = cung.sao.filter(s => s.loai !== 1 && (s.cat === 'tot' || s.hoa));
                        const phuTinhXau = cung.sao.filter(s => s.loai !== 1 && s.cat === 'xau' && !s.hoa);

                        return (
                            <div
                                key={idx}
                                className={clsx(
                                    "bg-white relative p-1 flex flex-col items-center",
                                )}
                                style={{ gridRow: pos.row, gridColumn: pos.col }}
                            >
                                {/* Header: Can Chi & Cung Name */}
                                <div className="w-full flex justify-between items-start border-b border-dashed border-slate-300 pb-1 mb-1">
                                    <span className={clsx("text-[9px] font-bold uppercase", ELEMENT_COLORS[cung.hanhCung] || 'text-slate-500')}>
                                        {cung.tenCan} {cung.tenChi}
                                    </span>
                                    <span className={clsx("text-[10px] font-black uppercase tracking-tighter",
                                        cung.isMenh || cung.isThan ? "text-white bg-red-600 px-1" : "text-slate-900 bg-slate-200 px-1"
                                    )}>
                                        {cung.tenCung}
                                        {cung.isThan && <span className="ml-1 text-[8px] opacity-80">(THÂN)</span>}
                                    </span>
                                </div>

                                {/* MAIN STARS */}
                                <div className="flex flex-col items-center justify-center my-1">
                                    {chinhTinh.map((s, i) => (
                                        <div key={i} className={clsx("text-sm sm:text-[15px] font-black uppercase leading-tight tracking-tight", ELEMENT_COLORS[s.nguHanh] || 'text-black')}>
                                            {s.ten}
                                            {s.dacTinh && <span className={clsx("text-[10px] ml-1 font-normal",
                                                ['M', 'V'].includes(s.dacTinh) ? 'text-red-500' : 'text-slate-400'
                                            )}>({s.dacTinh})</span>}
                                        </div>
                                    ))}
                                    {chinhTinh.length === 0 && <span className="text-xs text-slate-300 italic">Vô Chính Diệu</span>}
                                </div>

                                {/* MINOR STARS - 2 Columns */}
                                <div className="w-full flex-1 flex justify-between text-[10px] leading-3 overflow-hidden">
                                    {/* LEFT: GOOD */}
                                    <div className="flex flex-col items-start w-1/2 pr-0.5">
                                        {phuTinhTot.map((s, i) => (
                                            <span key={i} className={clsx("truncate w-full font-semibold",
                                                s.hoa ? 'text-purple-600 font-bold' : (ELEMENT_COLORS[s.nguHanh] || 'text-slate-700')
                                            )}>
                                                {s.ten}{s.hoa ? ` (${s.hoa})` : ''}
                                            </span>
                                        ))}
                                    </div>

                                    {/* RIGHT: BAD */}
                                    <div className="flex flex-col items-end w-1/2 pl-0.5 text-right">
                                        {phuTinhXau.map((s, i) => (
                                            <span key={i} className={clsx("truncate w-full font-semibold",
                                                ELEMENT_COLORS[s.nguHanh] || 'text-slate-500'
                                            )}>
                                                {s.ten}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* FOOTER */}
                                <div className="w-full mt-auto flex justify-between items-end pt-1 border-t border-slate-100">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                                        {cung.sao.find(s => s.vongTrangSinh)?.ten}
                                    </span>
                                    <span className="text-[14px] font-black text-slate-800">{cung.daiHan}</span>
                                </div>
                            </div>
                        );
                    })}

                    {/* OVERLAYS */}
                    {renderBarriers('TUẦN')}
                    {renderBarriers('TRIỆT')}

                </div>
            </div>
        </div>
    );
};

export default LaSo;
