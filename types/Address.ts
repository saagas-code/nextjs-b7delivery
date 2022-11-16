export type Address = {
    id: number;
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    completement?: string
}