import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.masar.learning',
  appName: 'مسار التعلم',
  webDir: 'dist/public',
  server: {
    // Load the app from the bundled assets; enables offline operation.
    androidScheme: 'https',
  },
  backgroundColor: '#071012',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: '#071012',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#071012',
    },
  },
};

export default config;
