import { darken, getContrast, parseToRgba, toHex } from 'color2k';

function getContrastColor(color1: string, color2: string = '#fff') {
    // https://usecontrast.com/guide
    const contrast = getContrast(toHex(color1), color2);
    return Math.floor(contrast) < 3 ? darken(color1, 0.4) : '#fff';
}

function getBrandText(key: string, color: string) {
    return `.ck-text-theme-${key} { color: ${toHex(color)}; } .hover\\:ck-text-theme-${key}:hover{ color: ${toHex(
        color
    )}; } .focus\\:ck-text-theme-${key}:focus{ color: ${toHex(color)}; } `;
}

function getBrandBG(key: string, color: string) {
    const parsed = parseToRgba(color);
    // --tw-bg-opacity: 1; background-color: ${toHex(color)};
    const colorRgb = `rgb(${parsed[0]} ${parsed[1]} ${parsed[2]} / var(--tw-bg-opacity))`;
    return `.ck-bg-theme-${key} { -tw-bg-opacity: 1; background-color: ${colorRgb}; } .hover\\:ck-bg-theme-${key}:hover { -tw-bg-opacity: 1; background-color: ${toHex(
        color
    )}; } `;
}

function getBrandBtn(key: string, color: string) {
    const parsed = parseToRgba(color);
    const colorRgb = `rgb(${parsed[0]} ${parsed[1]} ${parsed[2]} / var(--tw-bg-opacity))`;

    return `.ck-btn-theme-${key} { --tw-bg-opacity: 1; color: ${getContrastColor(
        color
    )}; background-color: ${colorRgb}; } .hover\\:ck-btn-theme-${key}:hover{ -tw-bg-opacity: 1; color: ${getContrastColor(
        color
    )}; background-color: ${toHex(color)}; } `;
}

function getBrandRing(key: string, color: string) {
    return `.ck-ring-theme-${key} { --tw-ring-color: ${toHex(
        color
    )}; } .hover\\:ck-ring-theme-${key}:hover { --tw-ring-color: ${toHex(
        color
    )}; } .focus\\:ck-ring-theme-${key}:focus { --tw-ring-color: ${toHex(color)}; } `;
}

function getBorderColor(key: string, color: string) {
    const parsed = parseToRgba(color);
    // --tw-bg-opacity: 1; background-color: ${toHex(color)};
    const colorRgb = `rgb(${parsed[0]} ${parsed[1]} ${parsed[2]} / var(--tw-bg-opacity))`;
    return `.ck-border-theme-${key} { border-color: ${colorRgb}; } .hover\\:ck-border-theme-${key}:hover { border-color: ${toHex(
        color
    )}; } `;
}

// .react-calendar__tile--active

function brandCanlender(color: string) {
    const contrast = getContrast(color, '#fff');
    return `.react-calendar__tile--active { color: ${
        contrast < 3 ? darken(color, 0.4) : '#fff'
    }; background-color: ${toHex(color)} !important; }  `;
}

// --tw-ring-color
export function createBrandColorCssClasses(brandColors: Record<string, string>) {
    return (
        Object.keys(brandColors)
            .map((key) => {
                return (
                    getBrandText(key, brandColors[key]) +
                    getBrandBG(key, brandColors[key]) +
                    getBrandBtn(key, brandColors[key]) +
                    getBrandRing(key, brandColors[key]) +
                    getBorderColor(key, brandColors[key])
                );
            })
            .join('') + brandCanlender(brandColors[500])
    );
}
