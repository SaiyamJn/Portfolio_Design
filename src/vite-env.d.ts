/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly GITHUB_PAGES?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

