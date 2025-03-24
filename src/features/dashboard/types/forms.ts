// src/features/dashboard/types/forms.ts

export enum Role {
    Admin = "admin",
    Logistics = "logistics",
    User = "user",
}

export interface UserForm {
    email: string;
    password: string;
    role: Role;
}

export interface RouteForm {
    name: string;
}

export interface TransporterForm {
    name: string;
    capacity: number;
    available: boolean;
}
