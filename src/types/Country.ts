import { Ref } from 'vue'

export interface Country {
  name: string,
  code: string
}

export interface optionCountry {
  defaultCountry?: boolean,
  europeCountries?: boolean,
  domtomCountries?: boolean,
  allCountries?: boolean
}
