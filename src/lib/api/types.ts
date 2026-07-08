/**
 * Kontrak wire backend Spring. SEMUA endpoint dibungkus amplop {@link ApiEnvelope};
 * `handle()` di `client.ts` meng-unwrap `.data` sekali, jadi pemanggil `api.*`
 * bicara payload asli — bukan amplop.
 */

/** Amplop global backend. `data` = payload asli (objek, array, atau Page<T>). */
export interface ApiEnvelope<T> {
  data: T;
  message?: string;
  errors?: unknown[];
  status: number;
  statusText: string;
  timestamp: string;
}

/**
 * Spring Data `Page<T>` — bentuk `data` untuk endpoint list berpaginasi.
 * `number` 0-based (kontras dgn URL FE yang 1-based). `first`/`last`/`totalPages`
 * dihitung backend → UI memakainya, tidak menghitung ulang.
 */
export interface Page<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
