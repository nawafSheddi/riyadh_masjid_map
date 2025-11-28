/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENV: string
  readonly VITE_MAP_STYLE_URL: string
  readonly VITE_MAP_CENTER_LAT: string
  readonly VITE_MAP_CENTER_LNG: string
  readonly VITE_MAP_INITIAL_ZOOM: string
  readonly VITE_FEATURE_DEBUG_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
