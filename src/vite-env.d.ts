/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FRAMEWORK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
