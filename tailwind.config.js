
module.exports = {
  content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],

  theme: {
    minWidth: {
      '40': '10rem',
      '60': '15rem',
      '80': '20rem',
      '100': '25rem',
    },
    maxWidth: {
      '120': '30rem',
      '160': '40rem',
      '200': '50rem',
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'emerald'
    ],
  }
}
