import { appendStyle } from '@/Common/Helpers/Dom/appendStyle';
import { generateBrandColors } from '@/Common/Helpers/Theme/generateBrandColors';
import { createBrandColorCssClasses } from '@/Common/Helpers/Theme/createBrandColorCssClasses';

export function applyBrandColor(brandColor?: string) {
    if (brandColor) {
        appendStyle(createBrandColorCssClasses(generateBrandColors(brandColor)));
    } else {
        console.warn('Brand color is not defined');
    }
}
