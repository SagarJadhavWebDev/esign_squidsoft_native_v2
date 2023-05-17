export interface Pokedex {
  success: boolean;
  data: Country[];
  message: string;
}

export interface Country {
  name: string;
  iso3: string;
  numeric_code: string;
  iso2: string;
  phonecode: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: null | string;
  region: Region;
  subregion: string;
  timezones: Timezone[];
  translations: any;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
  flag: number;
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Asia = "Asia",
  Empty = "",
  Europe = "Europe",
  Oceania = "Oceania",
  Polar = "Polar",
}

export interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface StateData {
  success: boolean;
  data: State[];
  message: string;
}

export interface State {
  name: string;
  country_code: any;
  fips_code: null | string;
  iso2: string;
  type: any;
  latitude: string;
  longitude: string;
  flag: number;
}

export interface CityData {
    success: boolean;
    data:    City[];
    message: string;
}

export interface City {
    name:         string;
    state_code:   any;
    country_code: any;
    latitude:     string;
    longitude:    string;
    flag:         number;
}
