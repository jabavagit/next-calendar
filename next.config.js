const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  // Puedes personalizar más opciones aquí si lo necesitas
});

module.exports = withPWA({
  reactStrictMode: true
});