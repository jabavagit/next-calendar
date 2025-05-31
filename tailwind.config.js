module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        calido: {
          "primary": "#e07a5f",      // naranja suave
          "secondary": "#f2cc8f",    // beige cálido
          "accent": "#f4a261",       // naranja claro
          "neutral": "#3d405b",      // gris azulado cálido
          "base-100": "#fdf6f0",     // fondo minimalista cálido
          "base-200": "#f7ede2",     // fondo tarjetas
          "base-300": "#f1dac4",     // fondo más oscuro
          "info": "#81b29a",         // verde suave
          "success": "#b7b7a4",      // verde grisáceo claro
          "warning": "#ffe066",      // amarillo pastel
          "error": "#e63946",        // rojo cálido
          "--rounded-box": "0.75rem",
          "--rounded-btn": "0.375rem",
          "--rounded-badge": "1.5rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.15s",
          "--btn-text-case": "none",
          "--navbar-padding": "0.5rem",
          "--border-btn": "1.5px",
        }
      }
    ],
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
  },
}