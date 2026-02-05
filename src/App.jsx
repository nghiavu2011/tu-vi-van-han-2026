import React, { useState, useEffect } from 'react';
import { lapLaSo } from './lib/tuvi';
import { getMonthlyFortune, calcFortuneScore, getDaiVan } from './lib/vanhan2026';
import { generateInterpretation } from './services/aiService';
import { saveProfile, getPinnedProfile } from './services/profileManager';
import { exportToPDF, downloadAsText } from './services/pdfExport';
import FormLaSo from './components/FormLaSo';
import LaSo from './components/LaSo';
import ProfileManager from './components/ProfileManager';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Calendar,
    LineChart as ChartIcon,
    Layout,
    ChevronRight,
    Users,
    Settings,
    ArrowLeft,
    Download,
    FileText,
    Share2,
    CheckCircle2,
    AlertTriangle,
    RefreshCw,
    Target
} from 'lucide-react';

const App = () => {
    const [screen, setScreen] = useState('welcome'); // welcome, form, result, profiles
    const [tab, setTab] = useState('overview'); // overview, monthly, 10year, chart
    const [laSoData, setLaSoData] = useState(null);
    const [fortuneScore, setFortuneScore] = useState(65);
    const [monthlyData, setMonthlyData] = useState([]);
    const [daiVanData, setDaiVanData] = useState([]);
    const [interpretation, setInterpretation] = useState('');
    const [loadingAI, setLoadingAI] = useState(false);
    const [goals, setGoals] = useState('');
    const [showExportMenu, setShowExportMenu] = useState(false);

    // Load pinned profile on start
    useEffect(() => {
        const pinned = getPinnedProfile();
        if (pinned) {
            setLaSoData(pinned.laSo);
            setInterpretation(pinned.interpretation || '');
            setFortuneScore(calcFortuneScore(pinned.laSo));
            setMonthlyData(getMonthlyFortune(pinned.laSo));
            setDaiVanData(getDaiVan(pinned.laSo));
        }
    }, []);

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

    const handleRegenerateAI = async () => {
        if (!laSoData) return;
        setLoadingAI(true);
        const result = await generateInterpretation(laSoData, 2026, goals);
        setInterpretation(result);
        setLoadingAI(false);
    };

    const handleSelectProfile = (profile) => {
        setLaSoData(profile.laSo);
        setInterpretation(profile.interpretation || '');
        setFortuneScore(calcFortuneScore(profile.laSo));
        setMonthlyData(getMonthlyFortune(profile.laSo));
        setDaiVanData(getDaiVan(profile.laSo));
        setScreen('result');
    };

    const handleSaveProfile = () => {
        if (laSoData) {
            saveProfile(laSoData, interpretation);
            alert('Đã lưu hồ sơ thành công!');
        }
    };

    const handleExportPDF = () => {
        exportToPDF(laSoData, interpretation, fortuneScore);
        setShowExportMenu(false);
    };

    const handleExportText = () => {
        downloadAsText(laSoData, interpretation);
        setShowExportMenu(false);
    };

    const getGoalLabel = (g) => {
        const map = {
            'career': 'Sự nghiệp',
            'finance': 'Tài chính',
            'relation': 'Tình duyên',
            'health': 'Sức khỏe'
        };
        return map[g] || 'Tổng quan';
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
            <AnimatePresence mode="wait">

                {/* Screen: Welcome */}
                {screen === 'welcome' && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="relative flex h-screen w-full flex-col overflow-hidden items-center justify-center p-6 text-center"
                    >
                        {/* Background Elements */}
                        <div className="absolute inset-0 pointer-events-none opacity-10">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-[100px]"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
                        </div>

                        <div className="relative z-10 max-w-md w-full">
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 bg-gradient-to-tr from-red-600 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl rotate-3">
                                    <Sparkles className="w-12 h-12 text-white" />
                                </div>
                            </div>

                            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-2">
                                TỬ VI 2026
                            </h1>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">
                                Luận giải Thiên Lương &amp; Kỷ nguyên số
                            </p>

                            <button
                                onClick={() => setScreen('form')}
                                className="w-full py-4 bg-red-600 text-white font-black uppercase tracking-wider rounded-xl shadow-lg hover:bg-red-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                            >
                                Lập Lá Số <ChevronRight className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => setScreen('profiles')}
                                className="w-full mt-3 py-4 bg-slate-100 text-slate-800 font-bold uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                            >
                                <Users className="w-5 h-5" /> Hồ sơ đã lưu
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Screen: Form */}
                {screen === 'form' && (
                    <motion.div
                        key="form"
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                        className="min-h-screen p-4 flex flex-col items-center"
                    >
                        <div className="w-full max-w-md">
                            <button onClick={() => setScreen('welcome')} className="mb-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 w-fit">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <FormLaSo onSubmit={handleFormSubmit} />
                        </div>
                    </motion.div>
                )}

                {/* Screen: Profiles */}
                {screen === 'profiles' && (
                    <motion.div
                        key="profiles"
                        initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                    >
                        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md p-4 flex items-center gap-4 border-b border-slate-100">
                            <button onClick={() => setScreen('welcome')} className="p-2 rounded-full bg-slate-100">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-lg font-black uppercase tracking-tight">Hồ sơ đã lưu</h1>
                        </div>
                        <ProfileManager
                            onSelectProfile={handleSelectProfile}
                            onNewProfile={() => setScreen('form')}
                            currentLaSo={laSoData}
                            currentInterpretation={interpretation}
                            fortuneScore={fortuneScore}
                        />
                    </motion.div>
                )}

                {/* Screen: Result */}
                {screen === 'result' && laSoData && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col h-screen overflow-hidden max-w-[1000px] mx-auto bg-white dark:bg-slate-950 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md sticky top-0 z-20">
                            <button onClick={() => setScreen('form')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                <ArrowLeft className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center">
                                <h2 className="font-black uppercase tracking-tight text-sm">{laSoData.info.hoTen || 'Lá Số'}</h2>
                                {goals && (
                                    <div className="flex items-center gap-1 mt-0.5 px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase">
                                        <Target className="w-3 h-3" />
                                        Mục tiêu: {getGoalLabel(goals)}
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button onClick={() => setShowExportMenu(!showExportMenu)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                    <Share2 className="w-5 h-5" />
                                </button>

                                {/* Export Menu */}
                                <AnimatePresence>
                                    {showExportMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 top-12 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 w-48 z-50 overflow-hidden"
                                        >
                                            <button onClick={handleSaveProfile} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-left text-sm font-bold">
                                                <Download className="w-4 h-4 text-blue-500" /> Lưu hồ sơ
                                            </button>
                                            <button onClick={handleExportPDF} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-left text-sm font-bold border-t border-slate-100 dark:border-slate-800">
                                                <FileText className="w-4 h-4 text-red-500" /> Xuất PDF
                                            </button>
                                            <button onClick={handleExportText} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-left text-sm font-bold border-t border-slate-100 dark:border-slate-800">
                                                <FileText className="w-4 h-4 text-green-500" /> Xuất TXT
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar pb-24 bg-slate-50 dark:bg-black">
                            {tab === 'overview' && (
                                <div className="p-4 space-y-4">
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Điểm Vận</span>
                                            <span className="text-4xl font-black text-red-600">{fortuneScore}</span>
                                        </div>
                                        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Xu Hướng</span>
                                            <span className="text-lg font-black text-slate-800 dark:text-white uppercase">
                                                {fortuneScore > 50 ? 'Khả quan' : 'Thận Trọng'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* AI Content */}
                                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="flex items-center gap-2 text-sm font-black uppercase text-slate-800 dark:text-white">
                                                <Sparkles className="w-4 h-4 text-yellow-500" />
                                                Luận Giải Chi Tiết
                                            </h3>
                                            {loadingAI && <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />}
                                        </div>

                                        {loadingAI ? (
                                            <div className="py-12 text-center">
                                                <div className="w-8 h-8 mx-auto border-2 border-red-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                                                <p className="text-xs font-bold text-slate-400 uppercase">Đang phân tích dữ liệu...</p>
                                            </div>
                                        ) : (
                                            <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-p:text-slate-600 dark:prose-p:text-slate-300">
                                                <div className="whitespace-pre-wrap text-[13px] leading-relaxed">
                                                    {interpretation}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {tab === 'monthly' && (
                                <div className="p-4 space-y-3">
                                    {monthlyData.map((m, i) => (
                                        <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-black uppercase">{m.name}</span>
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded ${m.score > 60 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{m.score}đ</span>
                                            </div>
                                            <p className="text-xs text-slate-500">{m.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {tab === '10year' && (
                                <div className="p-4 space-y-4">
                                    {daiVanData.map((d, i) => (
                                        <div key={i} className="relative pl-6 pb-6 border-l-2 border-slate-200 last:border-0">
                                            <span className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                            <div className="text-xs font-black text-red-600 mb-1">{d.range}</div>
                                            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                                                <div className="font-bold text-sm mb-1">{d.theme}</div>
                                                <p className="text-xs text-slate-500">{d.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {tab === 'chart' && (
                                <div className="p-2 overflow-x-auto min-h-full flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                                    <LaSo data={laSoData} />
                                </div>
                            )}
                        </div>

                        {/* Bottom Nav */}
                        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-2 flex justify-around max-w-[1000px] mx-auto z-50">
                            <NavButton active={tab === 'overview'} onClick={() => setTab('overview')} icon={<Layout className="w-5 h-5" />} label="Tổng quan" />
                            <NavButton active={tab === 'monthly'} onClick={() => setTab('monthly')} icon={<Calendar className="w-5 h-5" />} label="Tháng" />
                            <NavButton active={tab === '10year'} onClick={() => setTab('10year')} icon={<ChartIcon className="w-5 h-5" />} label="Đại vận" />
                            <NavButton active={tab === 'chart'} onClick={() => setTab('chart')} icon={<Settings className="w-5 h-5" />} label="Lá số" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const NavButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${active ? 'text-red-600 bg-red-50' : 'text-slate-400 hover:bg-slate-50'}`}
    >
        {icon}
        <span className="text-[9px] font-bold uppercase tracking-tight">{label}</span>
    </button>
);

export default App;
