const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const customColors = {
    primary: {
        DEFAULT: "#451C61",
        50: "#B986DC",
        100: "#AE73D6",
        200: "#974BCB",
        300: "#7D33B0",
        400: "#612789",
        500: "#451C61",
        600: "#3A1751",
        700: "#2E1341",
        800: "#230E32",
        900: "#180A22",
    },
    crimson: {
        DEFAULT: "#D81033",
        50: "#FCD2D9",
        100: "#FABAC5",
        200: "#F68B9D",
        300: "#F35B76",
        400: "#EF2C4E",
        500: "#D81033",
        600: "#A90C28",
        700: "#79091D",
        800: "#4A0511",
        900: "#1A0206",
    },
    martinique: {
        DEFAULT: "#2C324A",
        50: "#99A1C2",
        100: "#8993B9",
        200: "#6975A6",
        300: "#525D8A",
        400: "#3F486A",
        500: "#2C324A",
        600: "#212537",
        700: "#151824",
        800: "#0A0B10",
        900: "#000000",
    },
    "screamin-green": {
        DEFAULT: "#50FA6E",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#E5FEE9",
        300: "#B3FDC0",
        400: "#82FB97",
        500: "#50FA6E",
        600: "#1EF945",
        700: "#06DE2C",
        800: "#05AC22",
        900: "#037B18",
    },
    secondary: {
        DEFAULT: "#FFC402",
        50: "#FFFAE7",
        100: "#FFF4CE",
        200: "#FFE89B",
        300: "#FFDC68",
        400: "#FFD035",
        500: "#FFC402",
        600: "#CE9E00",
        700: "#9B7700",
        800: "#685000",
        900: "#352900",
    },
};

module.exports = {
    prefix: "bpl-",
    // prefix: "ck-",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
            },
            inset: {
                "-1": "-0.25rem",
                "-2": "-0.5rem",
            },
        },
        screens: {
            xs: "480px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",

            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            red: colors.red,
            yellow: colors.amber,
            green: colors.emerald,
            blue: colors.blue,
            indigo: colors.indigo,
            purple: colors.violet,
            pink: colors.pink,
            orange: colors.orange,
            teal: colors.teal,

            primary: customColors.crimson,
            secondary: customColors.grape,
            tertiary: customColors.martinique,
            base: colors.slate,
        },
    },

    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("tailwindcss-base-buttons")({
            baseClass: ".button",
            borderRadius: ".5rem",
            padding: ".5rem 1rem",
            colors: {
                theme: {
                    primary: {
                        background: customColors.crimson.DEFAULT,
                        text: colors.white,
                        hoverBackground: customColors.crimson[600],
                        hoverText: colors.white,
                    },
                    secondary: {
                        background: customColors.martinique.DEFAULT,
                        text: colors.white,
                        hoverBackground: customColors.martinique[600],
                        hoverText: colors.white,
                    },
                },
            },
            sizes: {
                xs: {
                    fontSize: ".75rem",
                    padding: ".5625rem 1.125rem",
                },
                sm: {
                    fontSize: ".875rem",
                    padding: ".65625rem 1.3125rem",
                },
                md: {
                    fontSize: "1rem",
                    padding: ".75rem 1.5rem",
                },
                lg: {
                    fontSize: "1.125rem",
                    padding: ".84375rem 1.6875rem",
                },
                xl: {
                    fontSize: "1.25rem",
                    padding: ".9525rem 1.905rem",
                },
                "2xl": {
                    fontSize: "2rem",
                    padding: "1.2rem 2.3rem",
                },
            },
        }),
    ],
};
