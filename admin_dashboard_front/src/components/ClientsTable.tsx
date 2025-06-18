import type {Client} from '../types';

interface Props {
    clients: Client[];
    onSelectClient?: (client: Client) => void;
}

export default function ClientsTable({ clients, onSelectClient }: Props) {
    return (
        <div className="bg-gray-800 rounded-2xl shadow p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Клиенты</h2>
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        ID
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Имя
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Email
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Баланс
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Действия
                    </th>
                </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                {clients.length > 0 ? (
                    clients.map((c, idx) => (
                        <tr
                            key={c.id}
                            className={idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
                        >
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                                {c.id}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                                {c.name}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                                {c.email}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-300">
                                {c.balanceT}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                                {onSelectClient && (
                                    <button
                                        onClick={() => onSelectClient(c)}
                                        className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition"
                                    >
                                        История
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={5}
                            className="px-4 py-6 text-center text-gray-400"
                        >
                            Нет клиентов
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
