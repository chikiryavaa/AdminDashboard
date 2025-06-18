import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const resp = await api.post<{ token: string }>('/auth/login', { email, password });
            const { token } = resp.data;
            console.log(token);
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Неверные учётные данные');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
            <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-xl max-w-md w-full p-8">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Admin Dashboard</h2>
                {error && (
                    <div className="bg-red-800 text-red-300 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-300 mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            placeholder="admin@mirra.dev"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-shadow shadow-md hover:shadow-lg"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
