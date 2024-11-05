export interface Customer {
    id: number;
    name: string;
    city: string;
    street: string;
    contact: string;
}

export interface PurchaseOrder {
    associateID: string;
    custID: number;
    amount: number;
}