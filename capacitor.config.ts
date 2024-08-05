import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'yending-app-beta',
  webDir: 'out',
  server: {
    url: process.env.SERVER_URL,
    cleartext: true
  },

}

export default config
