import React, { useState } from 'react';

const FormLaSo = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        hoTen: '',
        ngay: '15',
        thang: '3',
        nam: '1990',
        gio: '3',
        gioiTinh: '1', // 1: Nam, 0: Nu
        goal: 'career'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Thông Tin Lá Số 2026</h2>
                <p className="text-sm text-slate-500">Nhập thông tin ngày sinh để xem vận hạn</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Họ tên</label>
                    <input
                        type="text" name="hoTen" value={formData.hoTen} onChange={handleChange}
                        placeholder="Ví dụ: Nguyễn Văn A"
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                    />
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Ngày sinh</label>
                        <input
                            type="number" name="ngay" value={formData.ngay} onChange={handleChange} min="1" max="31"
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Tháng</label>
                        <input
                            type="number" name="thang" value={formData.thang} onChange={handleChange} min="1" max="12"
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Năm</label>
                        <input
                            type="number" name="nam" value={formData.nam} onChange={handleChange} min="1900" max="2030"
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none dark:text-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Giờ sinh</label>
                        <select
                            name="gio" value={formData.gio} onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none dark:text-white"
                        >
                            {[...Array(24)].map((_, i) => (
                                <option key={i} value={i}>{i} giờ</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Giới tính</label>
                        <select
                            name="gioiTinh" value={formData.gioiTinh} onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none dark:text-white"
                        >
                            <option value="1">Nam</option>
                            <option value="0">Nữ</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Mục tiêu năm 2026</label>
                    <select
                        name="goal" value={formData.goal} onChange={handleChange}
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary outline-none dark:text-white"
                    >
                        <option value="career">Sự nghiệp & Công danh</option>
                        <option value="finance">Tài chính & Đầu tư</option>
                        <option value="relation">Tình duyên & Gia đạo</option>
                        <option value="health">Sức khỏe & Bình an</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-4 mt-4 bg-primary text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
                Lập Lá Số Ngay
            </button>
        </form>
    );
};

export default FormLaSo;
