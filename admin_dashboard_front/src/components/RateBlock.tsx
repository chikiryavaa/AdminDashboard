import React, { useEffect, useState } from 'react';
import api from '../api';
import type { RateDto } from '../types';

interface Props {
    onUpdate: () => void;
}

export default function RateBlock({ onUpdate }: Props) {
    const [rate, setRate] = useState<number | null>(null);
    const [updatedAt, setUpdatedAt] = useState<string | null>(null);
    const [input, setInput] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    const fetchRate = async () => {
        setLoading(true);
        setError(null);
        try {
            const resp = await api.get<RateDto>('/rate');
            setRate(resp.data.currentRate);
            setUpdatedAt(resp.data.updatedAt);
        } catch (err) {
            console.error(err);
            setError('Ошибка при загрузке курса');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRate();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const newRate = parseFloat(input);
        if (isNaN(newRate)) {
            setError('Введите корректное число');
            return;
        }
        setUpdating(true);
        try {
            const resp = await api.post<RateDto>('/rate', { currentRate: newRate });
            setRate(resp.data.currentRate);
            setUpdatedAt(resp.data.updatedAt);
            setInput('');
            onUpdate();
        } catch (err) {
            console.error(err);
            setError('Ошибка при обновлении');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="bg-gray-800 rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Курс токена</h2>
            {loading ? (
                <p className="text-gray-400">Загрузка...</p>
            ) : error ? (
                <div className="bg-red-800 text-red-300 px-3 py-2 rounded mb-3">
                    {error}
                </div>
            ) : (
                // Заменили rate !== null && (...) на тернарный оператор
                rate !== null ? (
                    <div className="mb-4">
                        <p className="text-gray-200">
                            Текущий курс:{' '}
                            <span className="font-bold text-indigo-300">{rate}</span>
                        </p>
                        {updatedAt ? (
                            <p className="text-sm text-gray-400">
                                Последнее обновление: {new Date(updatedAt).toLocaleString()}
                            </p>
                        ) : null}
                    </div>
                ) : null
            )}

            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                    type="number"
                    step="0.01"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={updating}
                    min={0}
                    className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50"
                    placeholder="Новый курс"
                />
                <button
                    type="submit"
                    disabled={updating}
                    className={`px-4 py-2 font-semibold rounded-lg text-white transition-shadow ${
                        updating
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-500 shadow-md hover:shadow-lg'
                    }`}
                >
                    {updating ? 'Обновление...' : 'Обновить'}
                </button>
            </form>
        </div>
    );
}
