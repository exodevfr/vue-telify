import { ref } from 'vue'

export const usePhoneLength = () => {
  const phoneLength = ref<{ [key: string]: number[] }>({
    // A
    at: [10, 12],
    // B
    be: [8, 9],
    bg: [8, 9],
    // C
    ch: [9],
    cy: [8],
    cz: [9, 11],
    // D
    de: [10, 11],
    dk: [8],
    // E
    ee: [7, 8, 9, 10],
    es: [9],
    // F
    fi: [9, 10],
    fr: [9],
    // G
    gr: [10],
    // H
    hr: [8, 9],
    hu: [7, 8, 9],
    // I
    ie: [7, 8, 9, 10],
    it: [8, 9, 10, 11],
    // L
    lt: [7],
    lu: [5, 6, 8, 9],
    lv: [8],
    // M
    mt: [8],
    //  N
    nl: [8, 9, 10],
    // O
    // P
    pl: [9],
    pt: [9],
    // R
    ro: [10],
    // S
    se: [8],
    sk: [9],
    si: [8],
  })

  return { phoneLength }
}