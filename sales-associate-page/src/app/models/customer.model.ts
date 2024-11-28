export interface Customer {
    id: number;
    name: string;
    city: string;
    street: string;
    contact: string;
}

export interface EnterQuotes {
    isFinalized: boolean;
    associateID: string;
    custID: number;
    price: number;
    email: string;
    description: string;
    secretNotes: string;
}

export interface associateLogin {
    username: string;
    passwrd: string;
}