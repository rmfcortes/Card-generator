export interface Producto {
    codigo?: string;
    descripcion: string;
    id: string;
    nombre: string;
    pasillo: string;
    precio: number;
    unidad?: string;
    url: string;
}

export interface Pasillo {
    nombre: string;
    prioridad: number;
    productos: Producto[];
}
