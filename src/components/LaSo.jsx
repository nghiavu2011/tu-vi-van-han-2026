import React from 'react';
import { clsx } from 'clsx';

// --- CONFIGURATION & MAPPING ---

// Grid positions for 12 cung (traditional layout)
// Row 1: 6, 7, 8, 9 (Tỵ, Ngọ, Mùi, Thân)
// Row 2: 5,        10 (Thìn,      Dậu)
// Row 3: 4,        11 (Mão,       Tuất)
// Row 4: 3, 2, 1, 12 (Dần, Sửu, Tý, Hợi)
// Index mapping:
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
const BORDER_COORDS = {
    6: { top: '12%', left: '25%', vertical: true },   // Ty-Ngo
    7: { top: '12%', left: '50%', vertical: true },   // Ngo-Mui
    8: { top: '12%', left: '75%', vertical: true },   // Mui-Than
    9: { top: '25%', left: '88%', vertical: false },  // Than-Dau
    10: { top: '50%', left: '88%', vertical: false }, // Dau-Tuat
    11: { top: '75%', left: '88%', vertical: false }, // Tuat-Hoi
    12: { top: '88%', left: '75%', vertical: true },  // Hoi-Ty
    1: { top: '88%', left: '50%', vertical: true },   // Ty-Suu
    2: { top: '88%', left: '25%', vertical: true },   // Suu-Dan
    3: { top: '75%', left: '12%', vertical: false },  // Dan-Mao
    4: { top: '50%', left: '12%', vertical: false },  // Mao-Thin
    5: { top: '25%', left: '12%', vertical: false },  // Thin-Ty
};

// Element Colors (Standard Tu Vi)
// K=Kim(White/Gray), M=Moc(Green), T=Thuy(Black/Blue), H=Hoa(Red), O=Tho(Yellow/Brown)
const ELEMENT_COLORS = {
    'K': 'text-slate-500 dark:text-slate-400 font-bold',
    'M': 'text-green-600 dark:text-green-400 font-bold',
    'T': 'text-blue-900 dark:text-blue-300 font-bold',
    'H': 'text-red-600 dark:text-red-400 font-bold',
    'O': 'text-yellow-600 dark:text-yellow-400 font-bold',
};

// Star Element Mapping (Supplementary)
const STAR_ELEMENTS = {
    'Tử vi': 'O', 'Liêm trinh': 'H', 'Thiên đồng': 'T', 'Vũ khúc': 'K', 'Thái dương': 'H',
    'Thiên cơ': 'M', 'Thiên phủ': 'O', 'Thái âm': 'T', 'Tham lang': 'T', 'Cự môn': 'T',
    'Thiên tướng': 'T', 'Thiên lương': 'M', 'Thất sát': 'K', 'Phá quân': 'T',
    'Văn xương': 'K', 'Văn khúc': 'T', 'Tả phù': 'O', 'Hữu bật': 'O',
    'Thiên khôi': 'H', 'Thiên việt': 'H', 'Lộc tồn': 'O', 'Kình dương': 'K',
    'Đà la': 'K', 'Hỏa tinh': 'H', 'Linh tinh': 'H', 'Đia không': 'H', 'Địa kiếp': 'H',
    'Hóa lộc': 'M', 'Hóa quyền': 'M', 'Hóa khoa': 'T', 'Hóa kỵ': 'T'
};

const getStarColor = (starName, definedElement) => {
    // Use defined element from data if available, else lookup, else default to Black
    const element = definedElement || STAR_ELEMENTS[starName] || STAR_ELEMENTS[starName.split(' ')[0]];
    return ELEMENT_COLORS[element] || 'text-slate-800 dark:text-slate-200 font-bold';
};

const LaSo = ({ data }) => {
    if (!data) return null;
    const { thapNhiCung, info } = data;

    // --- Helper to render Tuan/Triet markers ---
    const renderBarriers = (type) => {
        // Find all cung IDs that have this barrier
        const affectedIDs = thapNhiCung.filter(c => c[type.toLowerCase()]).map(c => c.cungSo);

        // Find the "center" of the group. 
        // Logic: Tuan/Triet usually affects a pair (e.g., 6 and 7). 
        // We look for pairs (i, i+1) or (12, 1).
        const pairs = [];
        affectedIDs.forEach(id => {
            const nextId = id === 12 ? 1 : id + 1;
            if (affectedIDs.includes(nextId)) {
                pairs.push(id);
            }
        });

        return pairs.map(startId => {
            const coords = BORDER_COORDS[startId];
            if (!coords) return null;

            return (
                <div
                    key={`${type}-${startId}`}
                    className="absolute z-20 flex items-center justify-center pointer-events-none"
                    style={{
                        top: coords.top,
                        left: coords.left,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div className="bg-black text-white px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-tighter border border-white shadow-sm">
                        {type}
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto p-2 sm:p-4 bg-white dark:bg-slate-950 font-sans">
            <div className="relative aspect-[4/5] sm:aspect-square w-full border-2 border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 shadow-2xl rounded-sm overflow-hidden">

                {/* 4x4 Grid Container */}
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-[1px] bg-slate-300 dark:bg-slate-700">

                    {/* CENTER INFO PANEL */}
                    <div className="col-start-2 col-end-4 row-start-2 row-end-4 bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center p-2 z-10 border-[1px] border-slate-800 m-[-1px]">
                        {/* Header Decoration */}
                        <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-primary opacity-20"></div>
                        <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-primary opacity-20"></div>

                        <h2 className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-500 uppercase tracking-widest mb-1">{info.hoTen || "QUÝ BẠN"}</h2>

                        <div className="w-full max-w-xs space-y-2 mt-4 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                            <div className="flex justify-between border-b border-dashed border-slate-300 pb-1">
                                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Năm sinh</span>
                                <span className="font-bold">{info.namSinh} ({info.tenNamAm})</span>
                            </div>
                            <div className="flex justify-between border-b border-dashed border-slate-300 pb-1">
                                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Ngày sinh</span>
                                <span className="font-bold">{info.ngayAm} / {info.thangAm} Âm lịch</span>
                            </div>
                            <div className="flex justify-between border-b border-dashed border-slate-300 pb-1">
                                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Giờ sinh</span>
                                <span className="font-bold">{info.gioSinh} ({info.gioChi})</span>
                            </div>
                            <div className="flex justify-between border-b border-dashed border-slate-300 pb-1">
                                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Bản Mệnh</span>
                                <span className="font-bold text-red-600">{info.banMenh}</span>
                            </div>
                            <div className="flex justify-between border-b border-dashed border-slate-300 pb-1">
                                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Cục</span>
                                <span className="font-bold">{info.tenCuc}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Âm Dương</span>
                                <span className="font-bold">{info.amDuongMenh}</span>
                            </div>
                        </div>

                        <div className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Thiên Lương Tử Vi đẩu số
                        </div>
                    </div>

                    {/* 12 CUNG CELLS */}
                    {thapNhiCung.map((cung, idx) => {
                        const pos = GRID_MAP[cung.cungSo];
                        return (
                            <div
                                key={idx}
                                className={clsx(
                                    "bg-white dark:bg-slate-900 relative p-1 flex flex-col",
                                    // Borders are handled by Gap, but we add specificity if needed
                                )}
                                style={{ gridRow: pos.row, gridColumn: pos.col }}
                            >
                                {/* Header: Can Chi & Cung Name */}
                                <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-1 mb-1 shadow-sm">
                                    <span className={clsx("text-[10px] font-black uppercase", getStarColor('', cung.hanhCung))}>
                                        {cung.tenCan} {cung.tenChi}
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-black bg-slate-800 text-white px-1.5 py-0.5 rounded-[2px] uppercase tracking-tighter shadow-sm">
                                        {cung.tenCung}
                                        {cung.isThan && <span className="ml-1 text-yellow-400">(Thân)</span>}
                                    </span>
                                </div>

                                {/* Main Stars - Centered & Large */}
                                <div className="flex flex-col items-center justify-center min-h-[30px] my-1">
                                    {cung.sao.filter(s => s.loai === 1).map((s, i) => (
                                        <div key={i} className={clsx("text-sm sm:text-base font-black uppercase leading-tight tracking-tight drop-shadow-sm", getStarColor(s.ten, s.nguHanh))}>
                                            {s.ten} <span className="text-[9px] align-top opacity-70 ml-[-2px]">{s.dacTinh && `(${s.dacTinh})`}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Minor Stars - Two Columns */}
                                <div className="flex-1 grid grid-cols-2 gap-x-1 content-start overflow-hidden">
                                    {/* Left Col: Good Stars */}
                                    <div className="flex flex-col gap-0.5">
                                        {cung.sao.filter(s => s.loai > 1 && s.cat === 'tot').map((s, i) => (
                                            <span key={i} className={clsx("text-[9px] sm:text-[10px] leading-tight truncate", getStarColor(s.ten, s.nguHanh))}>
                                                {s.ten}{s.hoa ? <span className="text-[8px] bg-red-100 dark:bg-red-900 text-red-600 px-[1px] rounded ml-[1px]">{s.hoa}</span> : ''}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Right Col: Bad Stars */}
                                    <div className="flex flex-col gap-0.5 items-end text-right">
                                        {cung.sao.filter(s => s.loai > 1 && s.cat === 'xau').map((s, i) => (
                                            <span key={i} className={clsx("text-[9px] sm:text-[10px] leading-tight truncate pl-1", getStarColor(s.ten, s.nguHanh))}>
                                                {s.hoa ? <span className="text-[8px] bg-red-100 dark:bg-red-900 text-red-600 px-[1px] rounded mr-[1px]">{s.hoa}</span> : ''}
                                                {s.ten}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer: Trang Sinh & Dai Han */}
                                <div className="mt-auto flex justify-between items-end pt-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                        {/* Look for Trang Sinh loop star if available, or just placeholder */}
                                        {cung.sao.find(s => ['Trường sinh', 'Mộc dục', 'Quan đới', 'Lâm quan', 'Đế vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'].includes(s.ten))?.ten}
                                    </span>
                                    <span className="text-xs font-black text-slate-800 dark:text-slate-200">{cung.daiHan}</span>
                                </div>
                            </div>
                        );
                    })}

                    {/* OVERLAYS: Tuan / Triet Markers */}
                    {renderBarriers('TUẦN')}
                    {renderBarriers('TRIỆT')}

                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex gap-4 justify-center text-[10px] font-bold uppercase text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500"></span> Kim</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-600"></span> Mộc</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-900"></span> Thủy</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600"></span> Hỏa</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-600"></span> Thổ</span>
            </div>
        </div>
    );
};

export default LaSo;
