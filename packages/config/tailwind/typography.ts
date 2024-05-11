import defaultTheme from 'tailwindcss/defaultTheme';

const pxToRem = (px: number, base = 16) => `${px / base}rem`;
const pxToRemPair = (px: number, base = 16) => ({ [px]: pxToRem(px, base) });

/**
 * @todo fill in below configuration as needed
 */

// Overriding fontFamily to use @next/font loaded families - see apps/web/src/app/layout.tsx
export const fontFamily = {
  sora: 'var(--font-sora)',
};

export const fontSize = {
  dh1: '40px',
  dh2: '32px',
  dh3: '24px',
  dh4: '16px',
  dh5: '14px',
  dh6: '12px',
  mh1: '32px',
  mh2: '20px',
  mh3: '16px',
  mh4: '14px',
  mh5: '12px',
  mh6: '10px',
  dl: '16px',
  dm: '14px',
  ds: '12px',
  dxs: '10px',
  ml: '14px',
  mm: '12px',
  ms: '10px',
  mxs: '9px'
};

export const fontWeight = {
  normal: '400',
  semibold: '600',
  bold: '700',
}

export const lineHeight = defaultTheme.lineHeight;

export const letterSpacing = defaultTheme.letterSpacing;
