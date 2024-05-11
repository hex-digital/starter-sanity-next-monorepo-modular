/**
 * Determine the better color text (black or white) to display on a particular background color.
 *
 * @param colorInput The color input as a hex ("#rrggbb"), or as "RGB" or "RGBA"
 */
export function legibleTextColor(colorInput: string): 'black' | 'white' {
  let r: number, g: number, b: number;

  if (colorInput.startsWith('#')) {
    // Extract from hex
    r = parseInt(colorInput.substring(1, 3), 16);
    g = parseInt(colorInput.substring(3, 5), 16);
    b = parseInt(colorInput.substring(5, 7), 16);
  } else {
    // Extract from other formats (assuming RGB or RGBA string)
    const values = colorInput.match(/\d+/g);
    if (values) {
      r = parseInt(values[0]);
      g = parseInt(values[1]);
      b = parseInt(values[2]);
    } else {
      console.error('legibleTextColor error - invalid color input: ', colorInput);
      return 'black';
    }
  }

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 175 ? 'black' : 'white';
}
