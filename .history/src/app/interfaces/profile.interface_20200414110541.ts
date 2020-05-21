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
    address: string;
    background: string;
    name: string;
    employment: string;
    fillButtons: string;
    textButtons: string;
    iconsText: string;
    contactTitle: string;
    iconsTabs: string;
    iconsTabsFocused: string;
    iconHomeTab: string;
    segmentButton: string;
    segmentButtonFocused: string;
    nameProduct: string;
    descriptionProduct: string;
    priceProduct: string;
    backgroundCard: string;
    borderProducts: string;
}

export interface Contact {
    action: string;
    icon: string;
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
