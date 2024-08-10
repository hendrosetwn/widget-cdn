import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './pages/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      width: {
        'full-page': 'calc(100% - 250px)',
      },
      colors: {
        primary: '#22356F',
        surface: '#EDF1FF',
        danger: '#F53D3D',
        neutral100: '#0A0A0A',
        neutral90: '#404040',
        neutral80: '#616161',
        neutral70: '#757575',
        neutral60: '#9E9E9E',
        neutral50: '#C2C2C2',
        neutral40: '#E0E0E0',
        neutral30: '#EDEDED',
        neutral20: '#FAFAFA',
        neutral10: '#FFFFFF',
        secondary: '#EDEDED',
        menuColor: '#142043',
        error: '#FF0000',
        cardBg: 'rgba(255,255,255, 0.65)',
        buttonLogin: '#3366FF',
        titleColor: '#095580',
        tableHeader: '#005c8e',
        teksBlack: '#474D66',
        teksNavi: '#101840',
        teksPrimary: '#22356F',
        onGoing: '#008DEB',
        completed: '#27AE60',
        revision: '#D14343',
        waitingForReview: '#FFB020',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-widget': 'linear-gradient(270deg, rgba(34, 53, 111, 0.5) 0%, rgba(34, 53, 111, 1) 100%)',
      },
      boxShadow: {
        custom1: '0 0 4px 0 rgba(0,0,0,0.25)',
        custom2: '0 0 0 1px rgba(70, 79, 96, 0.32)',
        custom3: '0 1px 1px 0 rgba(0, 0, 0, 0.1)',
        custom4: '0 4px 4px -4px rgba(0,0,0,0.25)',
        custom5: '0 0 2px 0 rgba(0,0,0,0.25)',
        custom6: '0 4px 6px -2px rgba(16, 24, 40, 0.03)',
        custom7: '0 12px 16px -4px rgba(16, 24, 40, 0.08)',
        custom8: '0 30px 18px 0 rgba(112, 144, 176, 0.12)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: '#FAFBFF',
          secondary: '#E9F2FF',
          accent: '#00336C',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#e6f4fd',
          success: '#27AE60',
          warning: '#FEF1CF',
          error: '#FF0000',
        },
      },
      'light',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
};
export default config;
