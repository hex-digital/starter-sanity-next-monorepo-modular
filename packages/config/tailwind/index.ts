import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import { colors } from './colors';
import { screens } from './screens';
import { spacing } from './spacing';
import { fontFamily, fontSize, fontWeight, letterSpacing, lineHeight, } from './typography';
import { zIndex } from './zIndex';
import { transitionDuration, transitionTiming } from './animation';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/modular-content-blocks/blocks/**/*.{js,ts,tsx,mdx}',
    '../../packages/modular-content-blocks/lib/web/**/*.{js,ts,tsx,mdx}',
    '../../packages/ui/{components,icons}/**/*.{js,ts,tsx,mdx}',
    '../../packages/sanity-web/{components,types,utilities}/*.{js,ts,tsx,mdx}',
    '../../packages/portable-text-editor/web/**/*.{js,ts,tsx,mdx}',
  ],
  theme: {
    ...defaultTheme,
    colors,
    screens,
    spacing,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    lineHeight,
    zIndex,
    transitionDuration,
    transitionTiming,
    backgroundPosition: {
      'slight-left': '45% center',
    },
  },
  plugins: [],
};

export default config;
