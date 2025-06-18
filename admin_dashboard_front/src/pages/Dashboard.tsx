import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientsTable from '../components/ClientsTable';
import RateBlock from '../components/RateBlock';
import api from '../api';
import type {Client} from '../types';
import PaymentHistory from "../components/PaymentHistroy.tsx";

export default function Dashboard() {
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const navigate = useNavigate();

    const fetchClients = async () => {
        try {
            const resp = await api.get<Client[]>('/clients');
            setClients(resp.data);
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSelectClient = (client: Client) => {
        setSelectedClient(client);
    };

    const handleCloseHistory = () => {
        setSelectedClient(null);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <header className="bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <h1 className="text-2xl font-bold text-indigo-400">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-gray-300 hover:text-red-500 transition"
                    >
                        Выйти
                    </button>
                </div>
            </header>

            <main className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ClientsTable clients={clients} onSelectClient={handleSelectClient} />
                    </div>
                    <div>
                        <RateBlock onUpdate={fetchClients} />
                    </div>
                </div>
            </main>

            {selectedClient && (
                <PaymentHistory
                    clientId={selectedClient.id}
                    clientName={selectedClient.name}
                    onClose={handleCloseHistory}
                />
            )}
        </div>
    );
}
