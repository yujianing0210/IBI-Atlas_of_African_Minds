/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly OPENAI_API_KEY?: string
  readonly OPENAI_MODEL?: string
}

declare module '*.json'
declare module '*.geojson'
