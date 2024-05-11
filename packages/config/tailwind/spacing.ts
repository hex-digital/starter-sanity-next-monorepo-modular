const pxToRem = (px: number, base = 16) => `${px / base}rem`;
const pxToRemPair = (px: number, base = 16) => ({ [px]: pxToRem(px, base) });

/**
 * @todo Add vertical rhythm spacings
 *       For non-vertical rhythm spacings, no need to add here, just use inline, e.g. class="mx-[4px]"
 */
export const spacing = {
    ...pxToRemPair(0),
    ...pxToRemPair(4),
    ...pxToRemPair(8),
    ...pxToRemPair(9),
    ...pxToRemPair(11),
    ...pxToRemPair(12),
    ...pxToRemPair(14),
    ...pxToRemPair(16),
    ...pxToRemPair(18),
    ...pxToRemPair(20),
    ...pxToRemPair(24),
    ...pxToRemPair(32),
    ...pxToRemPair(40),
    ...pxToRemPair(56),
    ...pxToRemPair(72),
    ...pxToRemPair(96),
    ...pxToRemPair(120),
    ...pxToRemPair(144),
};
