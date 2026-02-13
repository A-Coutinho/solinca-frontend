import type { ApiResponseType, DropdownItems, GymClassType, MetaResponseType } from "./customTypes";

export const API_URL = "https://api.antoniocoutinho.pt";
export const API_ALL = API_URL + "/solinca/all";
export const API_AFTERWORK = API_URL + "/solinca/afterwork";
export const API_TOMORROW = API_URL + "/solinca/tomorrow";
export const API_FAVS = API_URL + "/solinca/favs";
export const API_FAVS_TOMORROW = API_URL + "/solinca/favs_tomorrow";
export const API_FAVS_TOMORROW_NIGHT = API_URL + "/solinca/favs_tomorrow_night";
export const API_META = API_URL + "/solinca/meta";

async function getApiData(_apiEndpoint: string) {
    let _output;
    try {
        const response = await fetch(_apiEndpoint);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();

        _output = result;
    } catch (error) {
        console.error(error);
        _output = { error: error };
    }

    return _output;
}

export async function getApi_all(): Promise<ApiResponseType> {
    return await getApiData(API_ALL);
}
export async function getApi_afterwork(): Promise<ApiResponseType> {
    return await getApiData(API_AFTERWORK);
}
export async function getApi_tomorrow(): Promise<ApiResponseType> {
    return await getApiData(API_TOMORROW);
}
export async function getApi_favs(): Promise<ApiResponseType> {
    return await getApiData(API_FAVS);
}
export async function getApi_favs_tomorrow(): Promise<ApiResponseType> {
    return await getApiData(API_FAVS_TOMORROW);
}
export async function getApi_favs_tomorrow_night(): Promise<ApiResponseType> {
    return await getApiData(API_FAVS_TOMORROW_NIGHT);
}
export async function getApi_meta(): Promise<MetaResponseType> {
    return await getApiData(API_META);
}

export function getDdlItems(_value: string[], _label: string[], _noSorting?: boolean) {
    const _itemListDDL: DropdownItems[] = [];

    for (let index = 0; index < _value.length; index++) {
        const _itemDDL: DropdownItems = {
            label: _label[index],
            value: _value[index],
        };
        _itemListDDL.push(_itemDDL);
    }

    return _noSorting ? _itemListDDL : _itemListDDL.sort((a, b) => a.label.localeCompare(b.label));
}

export function getStartTime(timeRange: string) {
    return timeRange.split(" - ")[0];
}

export function groupByTime(classes: GymClassType[]) {
    const map: Record<string, any[]> = {};

    classes.forEach((c) => {
        const start = getStartTime(c.time);

        if (!map[start]) {
            map[start] = [];
        }

        map[start].push(c);
    });

    return Object.keys(map)
        .sort((a, b) => a.localeCompare(b))
        .map((time) => ({ time, items: map[time] }));
}
