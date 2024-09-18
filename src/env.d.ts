/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
    readonly PUBLIC_YANDEX_ACCESS_KEY: string;
    readonly PUBLIC_YANDEX_SECRET_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }