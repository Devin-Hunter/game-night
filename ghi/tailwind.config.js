/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite-react/lib/esm/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('flowbite/plugin')],
}
