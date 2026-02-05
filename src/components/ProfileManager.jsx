import React, { useState, useEffect } from 'react';
import {
    getAllProfiles,
    saveProfile,
    deleteProfile,
    pinProfile,
    unpinProfile,
    getPinnedProfileId,
    searchProfiles,
    exportProfileAsJSON
} from '../services/profileManager';
import { exportToPDF, downloadAsText } from '../services/pdfExport';
import {
    Search,
    Star,
    StarOff,
    Trash2,
    Download,
    FileText,
    FileDown,
    Plus,
    User,
    Calendar,
    ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileManager = ({ onSelectProfile, onNewProfile, currentLaSo, currentInterpretation, fortuneScore }) => {
    const [profiles, setProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [pinnedId, setPinnedId] = useState(null);
    const [showSaveModal, setShowSaveModal] = useState(false);

    useEffect(() => {
        loadProfiles();
    }, []);

    const loadProfiles = () => {
        const all = searchQuery ? searchProfiles(searchQuery) : getAllProfiles();
        setProfiles(all);
        setPinnedId(getPinnedProfileId());
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        const results = searchProfiles(e.target.value);
        setProfiles(results);
    };

    const handleSaveCurrentProfile = () => {
        if (currentLaSo) {
            saveProfile(currentLaSo, currentInterpretation);
            loadProfiles();
            setShowSaveModal(false);
        }
    };

    const handleDeleteProfile = (id) => {
        if (confirm('Bạn có chắc muốn xóa hồ sơ này?')) {
            deleteProfile(id);
            loadProfiles();
        }
    };

    const handlePinProfile = (id) => {
        if (pinnedId === id) {
            unpinProfile();
        } else {
            pinProfile(id);
        }
        setPinnedId(getPinnedProfileId());
        loadProfiles();
    };

    const handleExportPDF = (profile) => {
        exportToPDF(profile.laSo, profile.interpretation, fortuneScore || 65);
    };

    const handleExportText = (profile) => {
        downloadAsText(profile.laSo, profile.interpretation);
    };

    const handleExportJSON = (profile) => {
        exportProfileAsJSON(profile.id);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-black uppercase tracking-tight">Quản Lý Hồ Sơ</h1>
                <button
                    onClick={onNewProfile}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                    <Plus className="w-4 h-4" /> Tạo mới
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Tìm kiếm theo tên hoặc năm sinh..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-primary outline-none"
                    />
                </div>
            </div>

            {/* Save Current Button */}
            {currentLaSo && (
                <button
                    onClick={() => setShowSaveModal(true)}
                    className="w-full mb-4 py-3 bg-gradient-to-r from-primary to-orange-500 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                    <Download className="w-5 h-5" /> Lưu lá số hiện tại
                </button>
            )}

            {/* Profile List */}
            <div className="space-y-3">
                <AnimatePresence>
                    {profiles.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="font-bold">Chưa có hồ sơ nào</p>
                            <p className="text-sm mt-1">Tạo lá số mới để bắt đầu</p>
                        </div>
                    ) : (
                        profiles.map((profile) => (
                            <motion.div
                                key={profile.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 cursor-pointer" onClick={() => onSelectProfile(profile)}>
                                        <div className="flex items-center gap-2">
                                            {pinnedId === profile.id && (
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            )}
                                            <h3 className="font-bold text-slate-800 dark:text-white">{profile.hoTen}</h3>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {profile.ngaySinh}
                                            </span>
                                            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">{profile.tenNamAm}</span>
                                            <span>{profile.banMenh}</span>
                                        </div>
                                        <div className="text-[10px] text-slate-300 mt-2">
                                            Tạo: {new Date(profile.createdAt).toLocaleDateString('vi-VN')}
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300" />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50 dark:border-slate-800">
                                    <button
                                        onClick={() => handlePinProfile(profile.id)}
                                        className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 ${pinnedId === profile.id ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-50 dark:bg-slate-800 text-slate-500'}`}
                                    >
                                        {pinnedId === profile.id ? <StarOff className="w-3 h-3" /> : <Star className="w-3 h-3" />}
                                        {pinnedId === profile.id ? 'Bỏ ghim' : 'Ghim'}
                                    </button>
                                    <button
                                        onClick={() => handleExportPDF(profile)}
                                        className="flex-1 py-2 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center gap-1"
                                    >
                                        <FileText className="w-3 h-3" /> PDF
                                    </button>
                                    <button
                                        onClick={() => handleExportText(profile)}
                                        className="flex-1 py-2 rounded-lg text-xs font-bold bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center gap-1"
                                    >
                                        <FileDown className="w-3 h-3" /> TXT
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProfile(profile.id)}
                                        className="flex-1 py-2 rounded-lg text-xs font-bold bg-red-50 dark:bg-red-900/20 text-red-600 flex items-center justify-center gap-1"
                                    >
                                        <Trash2 className="w-3 h-3" /> Xóa
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Save Modal */}
            <AnimatePresence>
                {showSaveModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowSaveModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-sm shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-black mb-4">Lưu hồ sơ</h3>
                            <p className="text-sm text-slate-500 mb-4">
                                Lưu lá số "{currentLaSo?.info?.hoTen || 'Chưa đặt tên'}" vào danh sách hồ sơ?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowSaveModal(false)}
                                    className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSaveCurrentProfile}
                                    className="flex-1 py-3 rounded-xl bg-primary text-white font-bold"
                                >
                                    Lưu
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileManager;
