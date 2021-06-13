import { Cliente } from "../models/cliente.model";


export interface CargarCliente {
    totalClientes: number,
    clientes: Cliente[];
}