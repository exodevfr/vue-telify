import { ConfigOptions } from "./types/ConfigOptions";

const defaultOptions: ConfigOptions = {
  countryListOptions: ['default'],
  language: 'fr'
}

let options: ConfigOptions = { ...defaultOptions };

export const configure = (userOptions: ConfigOptions) => {
  options = { ...defaultOptions, ...userOptions }
}

export const getConfig = (): ConfigOptions => options;
