/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#f59f0a",
                "background-light": "#fdfbf7",
                "background-dark": "#1a160f",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
        },
    },
    plugins: [],
}
