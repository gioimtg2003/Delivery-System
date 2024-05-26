import { calc } from "antd/es/theme/internal";
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "primary-color": "#E9EEF8",
                "primary-1-color": "#37A4E2",
                "primary-2-color": "#7DCBF7",
                "seconds-color": "#CDDDF1",
                "background-product": "#f5fafc",
            },
            transitionProperty: {
                border: "border-bottom-width, border-color",
                with: "width",
            },
            fontFamily: {
                sans: ["SF Pro Display", "sans-serif"],
            },
            height: {
                "nav-setting": "calc(100vh - 82px)",
            },
        },
    },
    plugins: [],
    corePlugins: {},
};
export default config;
