/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe', // Soft Blue
                    500: '#3b82f6', // Primary Blue
                    600: '#2563eb',
                    700: '#1d4ed8',
                    900: '#1e3a8a',
                },
                accent: {
                    purple: '#8b5cf6', // Soft Purple
                    success: '#10b981',
                    warning: '#f59e0b',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-pattern': "url('/grid.svg')", // Placeholder for potential pattern
            },
            boxShadow: {
                'saas': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'saas-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            }
        },
    },
    plugins: [],
}
