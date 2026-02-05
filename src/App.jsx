import React, { useState, useEffect } from 'react';
import { lapLaSo } from './lib/tuvi';
import { getMonthlyFortune, calcFortuneScore, getDaiVan } from './lib/vanhan2026';
import { generateInterpretation } from './services/aiService';
import FormLaSo from './components/FormLaSo';
import LaSo from './components/LaSo';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Calendar,
    LineChart as ChartIcon,
    Layout,
    ChevronRight,
    History,
    Settings,
    ArrowLeft,
    Search,
    CheckCircle2,
    AlertTriangle
} from 'lucide-react';

const App = () => {
    const [screen, setScreen] = useState('welcome'); // welcome, form, result
    const [tab, setTab] = useState('overview'); // overview, monthly, 10year, chart
    const [laSoData, setLaSoData] = useState(null);
    const [fortuneScore, setFortuneScore] = useState(65);
    const [monthlyData, setMonthlyData] = useState([]);
    const [daiVanData, setDaiVanData] = useState([]);
    const [interpretation, setInterpretation] = useState('');
    const [loadingAI, setLoadingAI] = useState(false);
    const [goals, setGoals] = useState('');

    const handleFormSubmit = async (formData) => {
        const data = lapLaSo(
            parseInt(formData.ngay),
            parseInt(formData.thang),
            parseInt(formData.nam),
            parseInt(formData.gio),
            formData.gioiTinh === '1'
        );
        data.info.hoTen = formData.hoTen;

        setLaSoData(data);
        setFortuneScore(calcFortuneScore(data));
        setMonthlyData(getMonthlyFortune(data));
        setDaiVanData(getDaiVan(data));
        setGoals(formData.goal);
        setScreen('result');

        // Auto generate AI interpretation
        setLoadingAI(true);
        const result = await generateInterpretation(data, 2026, formData.goal);
        setInterpretation(result);
        setLoadingAI(false);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display">
            <AnimatePresence mode="wait">

                {/* Screen: Welcome */}
                {screen === 'welcome' && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="relative flex h-screen w-full flex-col overflow-hidden items-center justify-center p-6 text-center"
                    >
                        <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
                            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-primary/30 to-transparent"></div>
                            <div className="absolute top-20 -left-10 w-40 h-40 border-[1px] border-primary rounded-full"></div>
                        </div>

                        <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-primary/20 rounded-full flex items-center justify-center"
                            >
                                <div className="w-48 h-48 border border-primary/40 rounded-full"></div>
                            </motion.div>
                            <Sparkles className="w-24 h-24 text-primary" />
                        </div>

                        <div className="z-10 space-y-4 max-w-sm">
                            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-2">
                                Năm Bính Ngọ 2026
                            </div>
                            <h1 className="text-5xl font-black tracking-tight leading-tight">
                                TỬ VI <br />VẬN HẠN <span className="text-primary">2026</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400">
                                Khám phá hành trình định mệnh và nắm bắt vận may trong năm Bính Ngọ.
                            </p>
                            <button
                                onClick={() => setScreen('form')}
                                className="w-full mt-8 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                            >
                                Bắt đầu ngay <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Screen: Form */}
                {screen === 'form' && (
                    <motion.div
                        key="form"
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                        className="min-h-screen flex flex-col p-6 items-center"
                    >
                        <button onClick={() => setScreen('welcome')} className="self-start mb-8 p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <FormLaSo onSubmit={handleFormSubmit} />
                    </motion.div>
                )}

                {/* Screen: Result */}
                {screen === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col h-screen overflow-hidden max-w-[1000px] mx-auto bg-white dark:bg-slate-950 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
                            <button onClick={() => setScreen('form')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h2 className="font-black uppercase tracking-tight text-sm">Lá Số {laSoData.info.hoTen}</h2>
                            <button onClick={() => setScreen('welcome')} className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                <History className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex bg-slate-50 dark:bg-slate-900/50 p-1 m-4 rounded-xl border border-slate-100 dark:border-slate-800">
                            <TabButton active={tab === 'overview'} onClick={() => setTab('overview')} icon={<Layout className="w-4 h-4" />} label="Tổng quan" />
                            <TabButton active={tab === 'monthly'} onClick={() => setTab('monthly')} icon={<Calendar className="w-4 h-4" />} label="Tháng" />
                            <TabButton active={tab === '10year'} onClick={() => setTab('10year')} icon={<ChartIcon className="w-4 h-4" />} label="Đại vận" />
                            <TabButton active={tab === 'chart'} onClick={() => setTab('chart')} icon={<ChartIcon className="w-4 h-4" />} label="12 Cung" />
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar pb-24">
                            {tab === 'overview' && (
                                <div className="space-y-6">
                                    {/* Luck Score Gauge */}
                                    <div className="flex flex-col items-center justify-center py-4 px-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                        <div className="relative flex items-center justify-center">
                                            <svg className="w-56 h-56 transform -rotate-90">
                                                <circle className="text-slate-100 dark:text-slate-800" cx="112" cy="112" fill="transparent" r="95" stroke="currentColor" strokeWidth="8"></circle>
                                                <motion.circle
                                                    initial={{ strokeDashoffset: 597 }} animate={{ strokeDashoffset: 597 - (597 * fortuneScore / 100) }}
                                                    className="text-primary" cx="112" cy="112" fill="transparent" r="95" stroke="currentColor" strokeDasharray="597" strokeLinecap="round" strokeWidth="12"
                                                ></motion.circle>
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Điểm Vận Khí</span>
                                                <span className="text-6xl font-black text-primary leading-none">{fortuneScore}</span>
                                                <span className="text-sm font-bold text-slate-800 dark:text-white">
                                                    {fortuneScore > 80 ? "Đại Cát" : fortuneScore > 60 ? "Cát Tường" : fortuneScore > 40 ? "Bình Hòa" : "Cần Thận Trọng"}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-center text-xs text-slate-500 leading-relaxed font-medium">
                                            Năm Bính Ngọ 2026 mang đến luồng sinh khí mạnh mẽ cho bản mệnh. Đây là thời kỳ quan trọng để tích lũy và bứt phá.
                                        </p>
                                    </div>

                                    {/* Monthly Trend Chart */}
                                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                                        <div className="flex justify-between items-end mb-6">
                                            <div>
                                                <h3 className="text-base font-black uppercase tracking-tight">Thịnh Suy Theo Tháng</h3>
                                                <p className="text-[10px] font-bold text-slate-400">Biểu đồ biến thiên vận thế 12 tháng</p>
                                            </div>
                                            <span className="text-primary font-black text-xs">+15% vs 2025</span>
                                        </div>
                                        <div className="relative h-32 w-full mb-4">
                                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                                                <line className="text-slate-100 dark:text-slate-800" stroke="currentColor" strokeDasharray="4" x1="0" x2="400" y1="75" y2="75"></line>
                                                <path d="M0,100 C40,100 60,30 100,30 C140,30 160,120 200,120 C240,120 260,10 300,10 C340,10 360,60 400,60" fill="none" stroke="url(#gradient-line)" strokeLinecap="round" strokeWidth="6"></path>
                                                <defs>
                                                    <linearGradient id="gradient-line" x1="0%" x2="100%" y1="0%" y2="0%">
                                                        <stop offset="0%" stopColor="#f59f0a"></stop>
                                                        <stop offset="100%" stopColor="#fbbf24"></stop>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                                            {['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'].map(t => <span key={t}>{t}</span>)}
                                        </div>
                                    </div>

                                    {/* AI Interpretation */}
                                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2 mb-4 text-primary">
                                            <Sparkles className="w-5 h-5 fill-current" />
                                            <h3 className="font-black uppercase tracking-tight">Luận giải AI</h3>
                                        </div>
                                        {loadingAI ? (
                                            <div className="flex flex-col items-center justify-center py-10 gap-3">
                                                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                <p className="text-xs font-bold text-slate-400">Gemini đang phân tích lá số...</p>
                                            </div>
                                        ) : (
                                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                                <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                                    {interpretation}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {tab === 'monthly' && (
                                <div className="grid grid-cols-1 gap-4">
                                    {monthlyData.map((m, i) => (
                                        <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/30 transition-all group">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                                                        <Calendar className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tight">{m.name}</h3>
                                                        <p className="text-[10px] text-slate-400 font-bold">{m.canChi} - {m.tiet}</p>
                                                    </div>
                                                </div>
                                                <div className={`text-xs font-black px-2 py-1 rounded ${m.score > 70 ? 'bg-green-100 text-green-700' : m.score > 50 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                                    {m.score}đ
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                                                {m.desc}
                                            </p>
                                            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-50 dark:border-slate-800">
                                                <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg text-[10px] font-bold text-green-600">
                                                    <CheckCircle2 className="w-3 h-3" /> CƠ HỘI: {m.opportunity}
                                                </div>
                                                <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-lg text-[10px] font-bold text-primary">
                                                    <AlertTriangle className="w-3 h-3" /> RỦI RO: {m.risk}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {tab === '10year' && (
                                <div className="space-y-4">
                                    {daiVanData.map((d, i) => (
                                        <div key={i} className="relative pl-8 pb-8 border-l-2 border-slate-100 dark:border-slate-800 last:pb-0">
                                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-950"></div>
                                            <div className="bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl">
                                                <div className="text-sm font-black text-primary mb-1">{d.range}</div>
                                                <h4 className="font-bold text-slate-800 dark:text-white mb-2">{d.theme}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{d.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {tab === 'chart' && (
                                <div className="overflow-x-auto">
                                    <LaSo data={laSoData} />
                                </div>
                            )}
                        </div>

                        {/* Bottom Nav */}
                        <div className="flex justify-around items-center p-4 border-t border-slate-100 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md fixed bottom-0 left-0 right-0 max-w-[1000px] mx-auto">
                            <NavButton active={tab === 'overview'} onClick={() => setTab('overview')} icon={<Layout className="w-6 h-6" />} label="Tổng quan" />
                            <NavButton active={tab === 'monthly'} onClick={() => setTab('monthly')} icon={<Calendar className="w-6 h-6" />} label="Tháng" />
                            <NavButton active={tab === '10year'} onClick={() => setTab('10year')} icon={<ChartIcon className="w-6 h-6" />} label="Đại vận" />
                            <NavButton active={tab === 'chart'} onClick={() => setTab('chart')} icon={<Settings className="w-6 h-6" />} label="Lá số" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${active ? 'bg-white dark:bg-slate-800 shadow-sm text-primary' : 'text-slate-400'}`}
    >
        {icon} {label}
    </button>
);

const NavButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-primary' : 'text-slate-400'}`}
    >
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
);

export default App;
