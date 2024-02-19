import type {Config} from "tailwindcss";


const config: Config = {
    content: ['./src/**/*.vue'],
    plugins: [require("@catppuccin/tailwindcss")],
};

export default config;
