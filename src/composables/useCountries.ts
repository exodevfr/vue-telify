import { ref } from 'vue'
import { Country } from '../types/Country'
import { getConfig } from '../config'
import { useI18n } from 'vue-i18n'

const defaultCountry = [
  { name: 'France', code: 'fr' }
]

const europeCountries = [
  ...defaultCountry,
  { name: 'Germany', code: 'de' },
  { name: 'Austria', code: 'at' },
  { name: 'Belgium', code: 'be' },
  { name: 'Bulgaria', code: 'bg' },
  { name: 'Cyprus', code: 'cy' },
  { name: 'Croatia', code: 'hr' },
  { name: 'Denmark', code: 'dk' },
  { name: 'Spain', code: 'es' },
  { name: 'Estonia', code: 'ee' },
  { name: 'Finland', code: 'fi' },
  { name: 'Greece', code: 'gr' },
  { name: 'Hungary', code: 'hu' },
  { name: 'Ireland', code: 'ie' },
  { name: 'Italy', code: 'it' },
  { name: 'Latvia', code: 'lv' },
  { name: 'Lithuania', code: 'lt' },
  { name: 'Luxembourg', code: 'lu' },
  { name: 'Malta', code: 'mt' },
  { name: 'Netherlands', code: 'nl' },
  { name: 'Poland', code: 'pl' },
  { name: 'Portugal', code: 'pt' },
  { name: 'Czech Republic', code: 'cz' },
  { name: 'Romania', code: 'ro' },
  { name: 'Slovakia', code: 'sk' },
  { name: 'Slovenia', code: 'si' },
  { name: 'Sweden', code: 'se' }
]

const domTomCountries: { name: string; code: string }[] = [
  { name: 'Guadeloupe', code: 'gp' },
  { name: 'Martinique', code: 'mq' },
  { name: 'Guyane', code: 'gf' },
  { name: 'Réunion', code: 're' },
  { name: 'Mayotte', code: 'yt' },
  { name: 'Saint-Martin', code: 'mf' },
  { name: 'Saint-Barthélemy', code: 'bl' },
  { name: 'Saint-Pierre-et-Miquelon', code: 'pm' },
  { name: 'Wallis-et-Futuna', code: 'wf' },
  { name: 'Polynésie française', code: 'pf' },
  { name: 'Nouvelle-Calédonie', code: 'nc' },
]

// TODO: Tous les pays du monde

const countryLists: { [key: string]: Country[] } = {
  default: defaultCountry,
  europe: europeCountries,
  domtom: domTomCountries,
  all: Array.from(new Set([...defaultCountry, ...europeCountries, ...domTomCountries]))
}

// Traduction of countries
function translateCountryNames(countriesList: Country[], t: Function): Country[] {
  return countriesList.map(country => {
    const formattedName = country.name.replace(/\s+/g, '_').toLowerCase();
    
    return {
      ...country,
      name: t(`countries.${formattedName}`)
    };
  });
}

export const useCountries = () => {
  const { t } = useI18n()
  const countries = ref<Country[]>([])
  const options = getConfig()

  function setCountriesByOption() {
    const selectedOptions = options.countryListOptions || ['default']
    const combinedCountries = selectedOptions.flatMap(option => countryLists[option.toLowerCase()] || [])
    countries.value = translateCountryNames(combinedCountries.length > 0 ? [...new Set(combinedCountries)] : defaultCountry, t)
  }

  setCountriesByOption()

  return { countries }
}