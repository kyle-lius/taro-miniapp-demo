// src/config/env.ts
const DEV_BASE_URL = 'http://localhost:8085'
const PROD_BASE_URL = 'https://api.yourdomain.com'

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? DEV_BASE_URL
    : PROD_BASE_URL

export { BASE_URL }
