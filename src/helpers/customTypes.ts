export type DropboxFile = {
    name: string;
    path_lower: string;
    link: string;
    is_downloadable: boolean;
    id: string;
    cover?: string;
    tracklist?: string;
};

export const breakpoints = {
    smallphone: "480px",
    phone: "600px",
    tablet: "768px",
    desktop: "1024px",
    largeDesktop: "1280px",
};

export const media = {
    smallphone: `(max-width: ${breakpoints.smallphone})`,
    phone: `(max-width: ${breakpoints.phone})`,
    tablet: `(max-width: ${breakpoints.tablet})`,
    desktop: `(max-width: ${breakpoints.desktop})`,
    largeDesktop: `(max-width: ${breakpoints.largeDesktop})`,
};

export enum MediaSize {
    xs = 480,
    sm = 640,
    md = 768,
    lg = 1024,
    xl = 1280,
}

export const fontSizes = {
    xs: "12px",
    sm: "14px",
    base: "16px",
    md: "18px",
    lg: "20px",
    xl: "24px",
    xxl: "30px",
};

export const mediaSolinca = {
    calendarClassBorder: "1px solid grey",
    calendarDayBorder: "1px solid black",
};

export type ApiResponseType = {
    classes: GymClassType[];
};
export type GymClassType = {
    day: string;
    time: string;
    name: string;
    gym: string;
    location: string;
};

export type MetaResponseType = {
    gyms: Array<string>;
    classes_geral: Array<string>;
    classes_water: Array<string>;
};

export const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export interface DropdownItems {
    label: string;
    value: string;
}
