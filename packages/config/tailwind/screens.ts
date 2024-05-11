import defaultTheme from 'tailwindcss/defaultTheme';

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

export const screens = {
  'xs': pxToRem(0),
  's': pxToRem(490),
  'm': pxToRem(768),
  'l': pxToRem(1040),
  'xl': pxToRem(1399),
  // 'dashboard': pxToRem(1399px),
};

