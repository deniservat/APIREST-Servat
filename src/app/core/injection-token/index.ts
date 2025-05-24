import { InjectionToken } from '@angular/core';

export interface AppConfig {
  API_URL: string;
  API_KEY: string;
}

export const config = {
  API_URL: "http://...",
  API_KEY: '123456'
}

export const APP_CONFIG = new InjectionToken<AppConfig>('AppConfig');