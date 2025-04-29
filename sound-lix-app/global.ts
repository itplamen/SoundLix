/* eslint-disable @typescript-eslint/no-namespace */
declare namespace NodeJS {
  export interface ProcessEnv {
    API_KEY: string;
    APP_ID: string;
    AUTH_DOMAIN: string;
    DB_URL: string;
    PROJECT_ID: string;
    STORAGE_BUCKET: string;
    MESSAGING_SENDER_ID: string;
    CLIENT_ID: string;
    API_BASE_URL: string;
    ROYALTY_FREE_MUSIC_URL: string;
    ROYALTY_FREE_MUSIC_AUDIO_URL: string;
    USER_ID: number;
  }
}
