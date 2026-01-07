/* eslint-disable @typescript-eslint/no-unsafe-call,
@typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
import Color from 'colorjs.io';
import type { ValueTransform } from 'style-dictionary/types';
import { usesReferences } from 'style-dictionary/utils';

/**
 * Represents a type used for defining values that differ between light and dark themes.
 * This type is useful in theming systems where specific values need to change based on the theme context.
 *
 * @typedef {Object} LightDarkValue
 * @property {string|number} light - The value to be used in a light theme context.
 * @property {string|number} dark - The value to be used in a dark theme context.
 */
type LightDarkValue = { light: string | number; dark: string | number };

/**
 * A value transformation for generating a dynamic CSS-compatible `light-dark` function
 * based on token values for light and dark themes. This transformation explicitly handles
 * tokens that define separate values for light and dark modes and supports color-specific
 * adjustments.
 *
 * The transform applies the following logic:
 * - It ensures the token's value is an object containing both `light` and `dark` properties.
 * - If the token's values reference other tokens, the transformation is deferred by returning `undefined`.
 * - For tokens of type `color`, it converts the light and dark color values to the OKLCH color model
 *   and applies optional saturation and transparency adjustments.
 * - For non-color tokens, it directly uses the `light` and `dark` values without additional transformation.
 * - The final output is a CSS-compatible `light-dark()` function string combining the two values.
 *
 * Properties of the transformation include:
 * - `name`: Identifies the transform with a unique name `'css/light-dark'`.
 * - `type`: Specifies that the transform operates on token values.
 * - `transitive`: Indicates that unresolved references will cause the transform to retry later.
 * - `filter`: Ensures the transform only applies to tokens with `light` and `dark` properties in their values.
 * - `transform`: Defines the logic for generating the final `light-dark()` function string.
 */
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
    if (usesReferences(tokenValue.light) || usesReferences(tokenValue.dark)) {
      return undefined;
    }

    let finalLightValue: string | number;
    let finalDarkValue: string | number;

    // Se il token è di tipo 'color', applichiamo la conversione OKLCH.
    if (token.$type === 'color') {
      const lightColor = new Color(tokenValue.light as string).to('oklab');
      const darkColor = new Color(tokenValue.dark as string).to('oklab');

      // Funzioni helper prese dal tuo transform oklch.ts

      const normalizedColor = (color: Color) => color.toString();

      // Applica la saturazione se definita nel token
      if (token.saturation && Number(token.saturation) >= 0) {
        const saturationValue = Number(token.saturation);
        lightColor.set('c', c => c * saturationValue);
        darkColor.set('c', c => c * saturationValue);
      }

      // Applica la trasparenza se definita nel token
      const transparency = token.original.transparency as { light?: string; dark?: string } | undefined;

      const oklchFormatter = (color: Color, alpha?: string) => (alpha
        ? `oklab(from ${normalizedColor(color)} l a b / ${alpha})`
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
