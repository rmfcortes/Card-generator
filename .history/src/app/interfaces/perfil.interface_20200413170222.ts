export interface MainProfile {
    colors: Colors;
    contact: Contact[];
    email: string;
    company: string;
    photo: string;
    name: string;
    template: string;
    cover: string;
    employment: string;
    phone: string;
    address: Address;
    view: string;
    whatsApp: string;
    web?: string;
    social_net?: Social[];
}

export interface Colors {
    direccion: string;
    background: string;
    nombre: string;
    puesto: string;
    botonesFill: string;
    botonesText: string;
    iconosText: string;
    contactoTitulo: string;
    iconosTabs: string;
    iconosTabsFocused: string;
    iconHomeTab: string;
    segmentButton: string;
    segmentButtonFocused: string;
    nombreProd: string;
    descripcionProd: string;
    precioProd: string;
    fondoCard: string;
    borderProds: string;
}

export interface Contact {
    funcion: string;
    icon: string
}

export interface Address {
    address: string;
    lat: number;
    lng: number;
}

export interface Social {
    icon: string;
    page: string;
}
