import { Font } from 'ngx-font-picker/lib/font-picker.interfaces';

export interface MainProfile {
    colors: Colors;
    font?: Fonts;
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
    addContact?: boolean;
}

export interface Fonts {
    name: Font;
    emplyment: Font;
    contactLabel: Font;
    follow: Font;
    segment: Font;
    header: Font;
    product_name: Font;
    product_price: Font;
    product_description: Font;
}

export interface Colors {
    address: string;
    background: string;
    backgroundGradient?: string;
    backgroundGradientValue?: string;
    name: string;
    employment: string;
    fillButtons: string;
    textButtons: string;
    iconsText: string;
    contactTitle: string;
    followTitle: string;
    iconsTabs: string;
    iconsTabsFocused: string;
    iconHomeTab: string;
    segmentButton: string;
    segmentButtonFocused: string;
    nameProduct: string;
    descriptionProduct: string;
    priceProduct: string;
    backgroundCard: string;
}

export interface Contact {
    action: string;
    icon: string;
}

export interface Address {
    address: string;
    lat: number;
    lng: number;
    pin?: string;
    poi?: string;
    dark?: boolean;
}

export interface Social {
    icon: string;
    page: string;
}
