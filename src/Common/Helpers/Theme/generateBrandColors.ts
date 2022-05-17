import { generatePalette } from 'palette-by-numbers';

export function generateBrandColors(color: string) {
    return generatePalette(color, { originalAtMidpoint: true });
}
