
import React from 'react';
import { useAppData } from '../hooks/useAppData';
import { UserRole } from '../types';

const LoginScreen: React.FC = () => {
    const { login } = useAppData();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-cyan-200 p-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-2">
                    <i className="fas fa-star text-yellow-400"></i> Sao Ngoan
                </h1>
                <p className="text-slate-600 text-lg">Chào mừng đến với ứng dụng làm việc tốt!</p>
            </div>
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Bạn là ai?</h2>
                <button
                    onClick={() => login(UserRole.Parent)}
                    className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform transform hover:scale-105"
                >
                    <i className="fas fa-user-tie mr-3"></i>
                    Tài khoản Bố/Mẹ
                </button>
                <button
                    onClick={() => login(UserRole.Child)}
                    className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform transform hover:scale-105"
                >
                    <i className="fas fa-child mr-3"></i>
                    Tài khoản của Con
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;
