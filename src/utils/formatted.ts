import { usePhoneLength } from '../composables/usePhoneLength'
const { phoneLength } = usePhoneLength()

export const getPhonePrefix = (code: string) => {
  const getPhonePrefix: { [key: string]: string } = {
    // A
    ad: '+376',
    al: '+355',
    at: '+43',
    // B
    ba: '+387',
    be: '+32',
    bg: '+359',
    bl: '+590',
    by: '+375',
    // C
    ch: '+41',
    cy: '+357',
    cz: '+420',
    // D
    de: '+49',
    dk: '+45',
    // E
    ee: '+372',
    es: '+34',
    // F
    fi: '+358',
    fr: '+33',
    // G
    gb: '+44',
    gf: '+594',
    gp: '+590',
    gr: '+30',
    // H
    hr: '+385',
    hu: '+36',
    // I
    ie: '+353',
    is: '+354',
    it: '+39',
    // L
    li: '+423',
    lt: '+370',
    lu: '+352',
    lv: '+371',
    // M
    mt: '+356',
    mc: '+377',
    md: '+373',
    me: '+382',
    mf: '+590',
    mk: '+389',
    mq: '+596',
    // N
    nl: '+31',
    nc: '+687',
    no: '+47',
    // P
    pt: '+351',
    pf: '+689',
    pl: '+48',
    pm: '+508',
    // R
    re: '+262',
    ro: '+40',
    rs: '+381',
    ru: '+7',
    // S
    si: '+386',
    sk: '+421',
    sm: '+378',
    se: '+46',
    // U
    ua: '+380',
    // V
    va: '+39',
    // W
    wf: '+681',
    // Y
    yt: '+262',
  }

  return getPhonePrefix[code] || ''
}

// export const formatPhoneNumber = (code: string, phoneNumber: string): string => {
//   // 1. Dictionnaire contenant les formats pour chaque pays
//   const formats: { [key: string]: string } = {
//       fr: '## ## ## ## ##', // France
//       es: '### ### ###',    // Spain
//       it: '### #######',    // Italy
//       be: '### ### ###',    // Belgium
//       ch: '## ### ## ##'    // Switzerland
//   };
//   // 2. Sélectionne le format correspondant au code du pays
//   const format = formats[code];
//   let formattedNumber = '';
//   let numberIndex = 0;
//   // 3. Enlève tous les caractères non numériques du numéro de téléphone
//   const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
//   // 4. Parcourt chaque caractère du format
//   for (let i = 0; i < format.length; i++) {
//       if (format[i] === '#') {
//           // 5. Remplace les '#' par les chiffres du numéro nettoyé
//           if (cleanPhoneNumber[numberIndex]) {
//               formattedNumber += cleanPhoneNumber[numberIndex];
//               numberIndex++;
//           } else {
//               // 6. Arrête le parcours si plus de chiffres disponibles
//               break;
//           }
//       } else {
//           // 7. Ajoute les autres caractères du format (comme les espaces)
//           formattedNumber += format[i];
//       }
//   }
//   // 8. Retourne le numéro formaté
//   return formattedNumber;
// }

// export const useFormatPhoneNumber = (code: string, phoneToFormat: string): any => {
//   if (!phoneToFormat) {
//     return ''
//   }

//   // const formats: { [key: string]: RegExp } = {
//   //   fr: /(\d{2})(?=(\d{2})+(?!\d))/g, // France: xx xx xx xx xx
//   //   es: /(\d{2})(?=(\d{2})+(?!\d))/g, // Spain: xx xx xx xx xx
//   //   it: /(\d{3})(?=(\d{4})+(?!\d))/g, // Italy: xx xxxx xxxxx
//   //   be: /(\d{3})(?=(\d{3})+(?!\d))/g, // Belgium: xxx xx xx xx
//   //   ch: /(\d{2})(?=(\d{3})+(?!\d))/g  // Switzerland: xxx xxx xx xx
//   // }

//   const formats: { [key: string]: RegExp } = {
//   fr: /(\d{2})(?=(\d{2})+(?!\d))/g, // France: xx xx xx xx xx
//   es: /(\d{2})(?=(\d{2})+(?!\d))/g, // Spain: xx xx xx xx xx
//   it: /(\d{3})(?=(\d{3})+(?!\d))/g, // Italy: xxx xxxx xxxx
//   be: /(\d{3})(?=(\d{2})+(?!\d))/g, // Belgium: xxx xx xx xx
//   ch: /(\d{2})(?=(\d{3})+(?!\d))/g  // Switzerland: xx xxx xx xx
//   }

//   const format = formats[code] || /(\d{2})(?=\d)/g

//   return phoneToFormat
//     .replace(/\s+/g, '') // Remove existing spaces
//     .replace(format, '$1 ') // Apply country-specific format
// }

export const useFormatPhoneNumber = (code: string, phoneToFormat: string): any => {
  if (!phoneToFormat) {
    return ''
  }

  const formats: { [key: string]: Array<{ regex: RegExp, template: string }> } = {
    // A
    at: [
      // Mobile
      {
        regex: /^6(\d{2})(\d{3})(\d{2})(\d{4})$/,
        template: '6$1 $2 $3 $4'  // Exemple: 6cc ccc cc cccc
      },
      // Fixe
      {
        regex: /^1(\d{2})(\d{3})(\d{4})$/,
        template: '1$1 $2 $3'  // Exemple: 1xx xxx xxxx
      }
    ],
    // B
    be: [
      // Numéros fixes (zones avec indicatif à 1 chiffre, par exemple Bruxelles, Anvers, Liège, Gand)
      {
        regex: /^([2349])(\d{3})(\d{2})(\d{2})$/,
        template: '$1 $2 $3 $4'  // Exemple: 2 123 45 67, 3 123 45 67
      },
      // Numéros fixes (zones avec indicatif à 2 chiffres)
      {
        regex: /^(\d{2})(\d{2})(\d{2})(\d{2})$/,
        template: '$1 $2 $3 $4'  // Exemple: 71 23 45 67
      },
      // Numéros mobiles
      {
        regex: /^4(\d{2})(\d{2})(\d{2})(\d{2})$/,
        template: '4$1 $2 $3 $4'  // Exemple: 470 12 34 56, 486 12 34 56
      }
    ],
    bg: [
      // Numéros fixes pour Sofia (indicatif 2)
      {
        regex: /^2(\d{3})(\d{4})$/,
        template: '2 $1 $2'  // Exemple: 2 123 4567
      },
      // Numéros fixes pour autres régions (indicatif à 3 chiffres)
      {
        regex: /^(\d{3})(\d{6})$/,
        template: '$1 $2'  // Exemple: 123 456789
      },
      // Numéros mobiles (commencent par 87, 88, 89)
      {
        regex: /^8(\d{2})(\d{3})(\d{3})$/,
        template: '8$1 $2 $3'  // Exemple: 87 123 456
      },
      {
        regex: /^(\d{2})(\d{3})(\d{3})$/,
        template: '$1 $2 $3'  // Exemple: 87 123 456
      }
    ],
    // C
    ch: [
      { 
        regex: /^(\d{2})(\d{3})(\d{2})(\d{2})$/, 
        template: '$1 $2 $3 $4' 
      }
    ],
    cy: [
      // Numéros fixes
      {
        regex: /^2(\d{2})(\d{4})$/,
        template: '2$1 $2'  // Exemple: 2xx xxxx
      },
      // Numéros mobiles
      {
        regex: /^9(\d{1})(\d{3})(\d{3})$/,
        template: '9$1 $2 $3'  // Exemple: 9x xxx xxx
      }
    ],
    cz: [
      // Numéros fixes
      {
        regex: /^(?:\+420|420)?(\d{2})(\d{3})(\d{3})(\d{3})$/,
        template: '$1 $2 $3 $4', // Exemple: 22 123 456 789
      },
      // Numéros mobiles
      {
        regex: /^(?:\+420)?([67]\d{2})(\d{3})(\d{3})$/,
        template: '$1 $2 $3', // Exemple: 602 123 456
      },
    ],
    // D
    de: [
      // Mobile 
      {
        regex: /^1(\d{2})(\d{3})(\d{2})(\d{3})$/,
        template: '1$1 $2 $3 $4' 
      },
      // Fixe
      {
        regex: /^(\d{3})(\d{7})$/,
        template: '$1 $2' 
      },
      {
        regex: /^(\d{4})(\d{7})$/,
        template: '$1 $2'
      }
    ],
    dk: [
      {
        regex: /^(\d{2})(\d{2})(\d{2})(\d{2})$/,
        template: '$1 $2 $3 $4'  // Exemple: xx xx xx xx
      }
    ],
    // E
    ee: [
      // Format pour les numéros fixes
      {
        regex: /^(\d{3})(\d{4})$/,
        template: '$1 $2', // Exemple: 123 4567 (7 chiffres)
      },
      {
        regex: /^(\d{4})(\d{4})$/,
        template: '$1 $2', // Exemple: 1234 5678 (8 chiffres)
      },
      // Format pour les numéros mobiles
      {
        regex: /^5(\d{2})(\d{3})(\d{3})$/,
        template: '5$1 $2 $3', // Exemple: 5xx xxx xxx
      },
      {
        regex: /^5(\d{3}) (\d{4})$/,
        template: '5$1 $2', // Exemple: 5xxx xxxx (10 chiffres)
      },
    ],
    es: [
      // Numéros fixes
      {
        regex: /^(\d{3})(\d{2})(\d{2})(\d{2})$/,
        template: '$1 $2 $3 $4'  // Exemple: 9xx xx xx xx
      },
      // Numéros mobiles
      { 
        regex: /^(\d{3})(\d{2})(\d{2})(\d{2})$/, 
        template: '$1 $2 $3 $4'  
      },
      {
        regex: /^(\d{3})(\d{3})(\d{3})$/,
        template: '$1 $2 $3'  // Exemple: 6xx xxx xxx ou 7xx xxx xxx
      }
    ],
    // F
    fi: [
      // Numéros fixes (10 chiffres)
      {
        regex: /^(\d{2})(\d{3})(\d{4})$/,
        template: '$1 $2 $3', // Exemple: 12 345 6789
      },
      {
        regex: /^(\d{3})(\d{3})(\d{4})$/,
        template: '$1 $2 $3', // Exemple: 123 456 7890
      },
      // Numéros mobiles (9 chiffres, commençant par 4)
      {
        regex: /^4(\d{1})(\d{3})(\d{4})$/,
        template: '4$1 $2 $3', // Exemple: 41 234 5678
      },
    ],
    fr: [
      { 
        regex: /^([1-9])(\d{2})(\d{2})(\d{2})(\d{2})$/, 
        template: '$1 $2 $3 $4 $5' 
      }
    ],
    // G
    gr: [
      // Numéros fixes (10 chiffres)
      {
        regex: /^(\d{3})(\d{3})(\d{4})$/,
        template: '$1 $2 $3', // Exemple: 210 123 4567
      },
      // Numéros mobiles (10 chiffres, commençant par 6)
      {
        regex: /^6(\d{2})(\d{3})(\d{4})$/,
        template: '6$1 $2 $3', // Exemple: 691 234 5678
      },
    ],
    // H
    hr: [
      // Numéros fixes
      {
        regex: /^1(\d{1})(\d{3})(\d{3})$/,
        template: '1$1 $2 $3'  // Exemple: 1x xxx xxx
      },
      {
        regex: /^(\d{1})(\d{3})(\d{3})$/,
        template: '$1 $2 $3'  // Exemple: x xxx xxx
      },
      // Numéros mobiles
      {
        regex: /^9(\d{1})(\d{3})(\d{4})$/,
        template: '9$1 $2 $3'  // Exemple: 9x xxx xxxx
      }
    ],
    hu: [
      // Numéros fixes (Budapest)
      {
        regex: /^1(\d{3})(\d{4})$/,
        template: '1 $1 $2', // Exemple: 1 234 5678
      },
      // Numéros fixes (reste du pays)
      {
        regex: /^(\d{2})(\d{3})(\d{3})$/,
        template: '$1 $2 $3', // Exemple: 12 345 678
      },
      // Numéros mobiles
      {
        regex: /^(20|30|70)(\d{3})(\d{4})$/,
        template: '$1 $2 $3', // Exemple: 20 123 4567
      },
    ],
    // I
    ie: [
      // Numéros fixes (Dublin)
      {
        regex: /^1(\d{4})(\d{4})$/,
        template: '1 $1 $2', // Exemple: 1 2345 6789
      },
      // Numéros fixes (autres, 7 chiffres)
      {
        regex: /^(\d{2})(\d{3})(\d{4})$/,
        template: '$1 $2 $3', // Exemple: 01 234 5678
      },
      // Numéros fixes (autres, 8 chiffres)
      {
        regex: /^(\d{3})(\d{3})(\d{4})$/,
        template: '$1 $2 $3', // Exemple: 021 234 5678
      },
      // Numéros fixes (autres, 9 chiffres)
      {
        regex: /^(\d{3})(\d{3})(\d{3})$/,
        template: '$1 $2 $3', // Exemple: 021 234 5678
      },
      // Numéros mobiles
      {
        regex: /^8(\d{1})(\d{3})(\d{4})$/,
        template: '8$1 $2 $3', // Exemple: 83 123 4567
      },
    ],
    it: [
      // Numéros fixes (8 chiffres)
      {
        regex: /^(\d{2})(\d{4})(\d{2})$/,
        template: '$1 $2 $3', // Exemple: 02 1234 56
      },
      // Numéros fixes (9 chiffres)
      {
        regex: /^(\d{2})(\d{3})(\d{4})$/,
        template: '$1 $2 $3', // Exemple: 02 123 4567
      },
      // Numéros fixes (10 chiffres)
      {
        regex: /^(\d{2})(\d{4})(\d{4})$/,
        template: '$1 $2 $3', // Exemple: 02 1234 5678
      },
      // Numéros fixes (11 chiffres)
      {
        regex: /^(\d{2})(\d{3})(\d{6})$/,
        template: '$1 $2 $3', // Exemple: 02 123 456789
      },
      // Numéros mobiles (10 chiffres)
      {
        regex: /^3(\d{2})(\d{3})(\d{4})$/,
        template: '3$1 $2 $3', // Exemple: 320 123 4567
      },
      // Numéros mobiles (11 chiffres)
      {
        regex: /^3(\d{2})(\d{4})(\d{4})$/,
        template: '3$1 $2 $3', // Exemple: 320 1234 5678
      },
    ],
    // J
    // K
    // L
    lt: [
      // Numéros fixes
      {
        regex: /^([3-8]\d{2})(\d{4})$/,
        template: '$1 $2', // Exemple: 345 6789
      },
      // Numéros mobiles
      {
        regex: /^6(\d{2})(\d{4})$/,
        template: '6$1 $2', // Exemple: 612 3456
      },
    ],
    lu: [
      // Numéros fixes (c cccc, cccc cccc, cc cccc)
      {
        regex: /^(\d{1})(\d{4})$/,
        template: '$1 $2', // Exemple: 2 1234
      },
      {
        regex: /^(\d{4})(\d{4})$/,
        template: '$1 $2', // Exemple: 1234 5678
      },
      {
        regex: /^(\d{2})(\d{4})$/,
        template: '$1 $2', // Exemple: 12 3456
      },
      // Numéros mobiles (61 ccc ccc)
      {
        regex: /^61(\d{3})(\d{3})$/,
        template: '61 $1 $2', // Exemple: 61 123 456
      },
    ],
    lv: [
      // Numéros fixes
      {
        regex: /^6(\d{3})(\d{4})$/,
        template: '6$1 $2', // Exemple: 6123 4567
      },
      // Numéros mobiles
      {
        regex: /^2(\d{3})(\d{4})$/,
        template: '2$1 $2', // Exemple: 2123 4567
      },
    ],
    // M
    mt: [
      // Numéros fixes (8 chiffres)
      {
        regex: /^(\d{2})(\d{2})(\d{2})(\d{2})$/,
        template: '$1 $2 $3 $4', // Exemple: 21 22 23 24
      },
      // Numéros mobiles (8 chiffres)
      {
        regex: /^(\d{2})(\d{2})(\d{2})(\d{2})$/,
        template: '$1 $2 $3 $4', // Exemple: 99 22 33 44
      },
    ],
    // N
    nl: [
      // Numéros fixes avec 0 initial facultatif
      {
        regex: /^0?(\d{2})(\d{3})(\d{2})(\d{2})$/,
        template: '$1 $2 $3 $4', // Exemple: 020 123 45 67
      },
      // Numéros fixes sans 0 initial
      {
        regex: /^(\d{2})(\d{3})(\d{2})(\d{2})$/,
        template: '$1 $2 $3 $4', // Exemple: 20 123 45 67
      },
      // Numéros mobiles
      {
        regex: /^6(\d{2})(\d{3})(\d{2})(\d{2})$/,
        template: '6 $1 $2 $3', // Exemple: 6 12 345 67
      },
    ],
    // O
    // P
    pl: [
      // Numéros fixes
      {
        regex: /^(\d{2})(\d{3})(\d{2})(\d{2})$/,
        template: '$1 $2 $3 $4', // Exemple: 22 345 67 89
      },
      // Numéros mobiles
      {
        regex: /^5(\d{2})(\d{3})(\d{3})$/,
        template: '5 $1 $2 $3', // Exemple: 5 12 345 678
      },
    ],
    pt: [
      // Numéros fixes
      {
        regex: /^(\d{2})(\d{3})(\d{2})(\d{2})$/,
        template: '$1 $2 $3 $4', // Exemple: 21 234 56 78
      },
      // Numéros mobiles
      {
        regex: /^9(\d{1})(\d{3})(\d{3})$/,
        template: '9 $1 $2 $3', // Exemple: 9 1 234 567
      },
    ],
    // Q
    // R
    ro: [
      // Numéros fixes
      {
        regex: /^(\d{2})(\d{3})(\d{4})$/,
        template: '$1 $2 $3', // Exemple: 21 123 4567
      },
      // Numéros mobiles
      {
        regex: /^07(\d)(\d{3})(\d{4})$/,
        template: '07$1 $2 $3', // Exemple: 07x 123 4567
      },
    ],
    // S
    se: [
      // Numéros fixes et mobiles
      {
        regex: /^(\d{1}\s?\d{2}\s?\d{2}\s?\d{2})$/,
        template: '$1 $2 $3 $4', // Exemple: 08 123 45 67 ou 070 123 45 67
      },
    ],
    si: [
      // Numéros fixes et mobiles
      {
        regex: /^(\d{2})(\d{3})(\d{3})$/,
        template: '$1 $2 $3', // Exemple: 01 234 567
      },
    ],
    sk: [
      // Numéros fixes
      {
        regex: /^(\d{2})(\d{3})(\d{2})(\d{2})$/,
        template: '$1 $2 $3 $4', // Exemple: 12 345 67 89
      },
      // Numéros mobiles
      {
        regex: /^(9|0)(\d{2})(\d{3})(\d{3})$/,
        template: '$1 $2 $3 $4', // Exemple: 9 12 345 678 ou 0 12 345 678
      },
      // Format international
      {
        regex: /^(\d{3})(\d{6})$/,
        template: '$1 $2', // Exemple: 123 456789
      },
    ],
    // T
    // U
    // V
    // W
    // X
    // Y
    // Z
  }

  const formatArray = formats[code]
  if (!formatArray) {
    // Si aucun format n'est trouvé pour le code de pays, return numéro sans les espaces
    return phoneToFormat.replace(/\s+/g, '')
  }

  // Nettoyer le numéro de téléphone en supprimant tous les espaces existants
  const cleanedPhone = phoneToFormat.replace(/\s+/g, '') // Remove existing spaces

  // Appliquer le premier format spécifique au numéro nettoyé en utilisant la regex et le template définis
  for (const format of formatArray) {
    if (format.regex.test(cleanedPhone)) {
      return cleanedPhone.replace(format.regex, format.template)
    }
  }

  // Si aucun format ne correspond, return numéro sans les espaces
  return cleanedPhone
}


export const isValidPhoneNumber = (code: string, phoneNumber: string): any => {
  const expectedLength = phoneLength.value[code]
  if (Array.isArray(expectedLength)) {
    // Si expectedLength est un tableau de longueurs, vérifier si phoneNumber a l'une de ces longueurs
    return expectedLength.includes(phoneNumber.replace(/\D/g, '').length)
  } else {
    // Sinon, expectedLength est une longueur unique, vérifier si phoneNumber a cette longueur
    return phoneNumber.replace(/\D/g, '').length === expectedLength
  }
}