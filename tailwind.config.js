/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.html",
        "./src/**/*.scss"
    ],
    plugins: { tailwindcss: {}, autoprefixer: {}, },
    theme: {
        extend: {
            zIndex: {
                '1': '1',
                '2': '2',
                '3': '3',
                '4': '4',
                '5': '5',
                '6': '6',
                '7': '7',
                '8': '8',
                '9': '9',
                '99': '99',
            }
        }
    }
}