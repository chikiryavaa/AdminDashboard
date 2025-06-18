import { useEffect, useState } from 'react';
import api from '../api';
import type { Payment } from '../types';

interface Props {
    clientId: number;
    clientName: string;
    onClose: () => void;
}

export default function PaymentHistory({ clientId, clientName, onClose }: Props) {
    const [payments, setPayments] = useState<Payment[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            setError(null);
            try {
                const resp = await api.get<Payment[]>(`/payments/client/${clientId}`);
                setPayments(resp.data);
            } catch (err) {
                console.error(err);
                setError('Ошибка при загрузке истории платежей');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [clientId]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl mx-4 md:mx-0 p-6 text-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">История платежей: {clientName}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-200 focus:outline-none"
                    >
                        X
                    </button>
                </div>

                {loading ? (
                    <p className="text-gray-400">Загрузка...</p>
                ) : error ? (
                    <div className="bg-red-700 text-red-200 px-3 py-2 rounded mb-4">{error}</div>
                ) : payments && payments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase">
                                    ID
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase">
                                    Дата
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300 uppercase">
                                    Количество
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {payments.map((p, idx) => (
                                <tr
                                    key={p.id}
                                    className={idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
                                >
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                                        {p.id}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                                        {new Date(p.date).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-300">
                                        {p.amount}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400">Нет платежей для этого клиента.</p>
                )}

                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold transition"
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
}
