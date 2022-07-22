/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_URL: string;
    // readonly VITE_APP_ENCRYPTION_KEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
