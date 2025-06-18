export interface Client {
    id: number;
    name: string;
    email: string;
    balanceT: number;
}

export interface Payment {
    id: number;
    clientId: number;
    amount: number;
    date: string;
}

export interface RateDto {
    currentRate: number;
    updatedAt: string;
}

export interface Payment {
    id: number;
    clientId: number;
    amount: number;
    date: string;
}
