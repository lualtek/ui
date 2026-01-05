/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

import Color from 'colorjs.io';
import type { ValueTransform } from 'style-dictionary/types';
import { usesReferences } from 'style-dictionary/utils';

type LightDarkValue = { light: string | number; dark: string | number };

const lightDark: ValueTransform = {
  name: 'css/light-dark',
  type: 'value',
  transitive: true,
  filter: (token) => {
    /**
     * Il filtro (filter) assicura che questo transform venga eseguito SOLO
     * su token che hanno un oggetto come valore con entrambe le chiavi 'light' e 'dark'.
     * Questo è più robusto che controllare solo il tipo.
     */
    const value: unknown = token.$value ?? token.value;
    return typeof value === 'object' && value !== null && 'light' in value && 'dark' in value;
  },

  transform: (token) => {
    const tokenValue = (token.$value ?? token.value) as LightDarkValue;

    // Se i valori light o dark sono referenze ad altri token,
    // Style Dictionary non li ha ancora risolti. Ritornando `undefined`,
    // diciamo a Style Dictionary di riprovare questo transform in un secondo momento.
    // Questa logica viene da `oklch.ts`.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (usesReferences(tokenValue.light) || usesReferences(tokenValue.dark)) {
      return undefined;
    }

    let finalLightValue: string | number;
    let finalDarkValue: string | number;

    // --- LOGICA CONDIZIONALE ---
    // Se il token è di tipo 'color', applichiamo la conversione OKLCH.
    if (token.$type === 'color') {
      const lightColor = new Color(tokenValue.light as string).to('oklch');
      const darkColor = new Color(tokenValue.dark as string).to('oklch');

      // Funzioni helper prese dal tuo transform oklch.ts
      const normalizedColor = (color: Color) => color.toString({ format: 'oklch' }).replace('none', '0');

      // Applica la saturazione se definita nel token
      if (token.saturation && Number(token.saturation) >= 0) {
        const saturationValue = Number(token.saturation);
        lightColor.set('c', c => c * saturationValue);
        darkColor.set('c', c => c * saturationValue);
      }

      // Applica la trasparenza se definita nel token
      const transparency = token.original.transparency as { light?: string; dark?: string } | undefined;

      const oklchFormatter = (color: Color, alpha?: string) => (alpha
        ? `oklch(from ${normalizedColor(color)} l c h / ${alpha})`
        : normalizedColor(color)
      );

      finalLightValue = oklchFormatter(lightColor, transparency?.light);
      finalDarkValue = oklchFormatter(darkColor, transparency?.dark);
    } else {
      // Altrimenti (se non è un colore), usiamo i valori così come sono.
      // Questa è la logica di `light-dark.ts`.
      finalLightValue = tokenValue.light;
      finalDarkValue = tokenValue.dark;
    }

    // Infine, componiamo la stringa finale con la funzione CSS `light-dark()`.
    return `light-dark(${finalLightValue}, ${finalDarkValue})`;
  },
};

export default lightDark;
