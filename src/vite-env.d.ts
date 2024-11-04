/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATAFORSEO_USERNAME: string
  readonly VITE_DATAFORSEO_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}