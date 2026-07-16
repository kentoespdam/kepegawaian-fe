/**
 * shared — tipe lintas-domain (dipakai >= 2 module)
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 */

/** Semua status HTTP (dipakai oleh field statusText di wrapper response). */
export type HttpStatusText =
  | "100 CONTINUE"
  | "101 SWITCHING_PROTOCOLS"
  | "102 PROCESSING"
  | "103 EARLY_HINTS"
  | "200 OK"
  | "201 CREATED"
  | "202 ACCEPTED"
  | "203 NON_AUTHORITATIVE_INFORMATION"
  | "204 NO_CONTENT"
  | "205 RESET_CONTENT"
  | "206 PARTIAL_CONTENT"
  | "207 MULTI_STATUS"
  | "208 ALREADY_REPORTED"
  | "226 IM_USED"
  | "300 MULTIPLE_CHOICES"
  | "301 MOVED_PERMANENTLY"
  | "302 FOUND"
  | "303 SEE_OTHER"
  | "304 NOT_MODIFIED"
  | "307 TEMPORARY_REDIRECT"
  | "308 PERMANENT_REDIRECT"
  | "400 BAD_REQUEST"
  | "401 UNAUTHORIZED"
  | "402 PAYMENT_REQUIRED"
  | "403 FORBIDDEN"
  | "404 NOT_FOUND"
  | "405 METHOD_NOT_ALLOWED"
  | "406 NOT_ACCEPTABLE"
  | "407 PROXY_AUTHENTICATION_REQUIRED"
  | "408 REQUEST_TIMEOUT"
  | "409 CONFLICT"
  | "410 GONE"
  | "411 LENGTH_REQUIRED"
  | "412 PRECONDITION_FAILED"
  | "413 CONTENT_TOO_LARGE"
  | "413 PAYLOAD_TOO_LARGE"
  | "414 URI_TOO_LONG"
  | "415 UNSUPPORTED_MEDIA_TYPE"
  | "416 REQUESTED_RANGE_NOT_SATISFIABLE"
  | "417 EXPECTATION_FAILED"
  | "418 I_AM_A_TEAPOT"
  | "421 MISDIRECTED_REQUEST"
  | "422 UNPROCESSABLE_CONTENT"
  | "422 UNPROCESSABLE_ENTITY"
  | "423 LOCKED"
  | "424 FAILED_DEPENDENCY"
  | "425 TOO_EARLY"
  | "426 UPGRADE_REQUIRED"
  | "428 PRECONDITION_REQUIRED"
  | "429 TOO_MANY_REQUESTS"
  | "431 REQUEST_HEADER_FIELDS_TOO_LARGE"
  | "451 UNAVAILABLE_FOR_LEGAL_REASONS"
  | "500 INTERNAL_SERVER_ERROR"
  | "501 NOT_IMPLEMENTED"
  | "502 BAD_GATEWAY"
  | "503 SERVICE_UNAVAILABLE"
  | "504 GATEWAY_TIMEOUT"
  | "505 HTTP_VERSION_NOT_SUPPORTED"
  | "506 VARIANT_ALSO_NEGOTIATES"
  | "507 INSUFFICIENT_STORAGE"
  | "508 LOOP_DETECTED"
  | "509 BANDWIDTH_LIMIT_EXCEEDED"
  | "510 NOT_EXTENDED"
  | "511 NETWORK_AUTHENTICATION_REQUIRED";

/** Wrapper standar semua response. Union: sukses (data + message) | error (errors). */
export type Envelope<T> =
  | { status: number; statusText?: HttpStatusText; message: string; data: T; errors?: never; timestamp?: string } // 2xx
  | { status: number; statusText?: HttpStatusText; message?: string; data?: never; errors: string | string[]; timestamp?: string }; // error

export interface Page<T> {
  totalElements?: number; // int64
  totalPages?: number; // int32
  size?: number; // int32
  content?: T[];
  number?: number; // int32
  numberOfElements?: number; // int32
  pageable?: PageableObject;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface PageEnvelope<T> {
  status?: number; // int32
  statusText?: HttpStatusText;
  data?: Page<T>;
  timestamp?: string; // date-time
}

export type SavedResultLong = Envelope<number>;

export type DeletedResult = Envelope<string>;

export interface SortObject {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
}

export interface PageableObject {
  offset?: number; // int64
  paged?: boolean;
  pageNumber?: number; // int32
  pageSize?: number; // int32
  sort?: SortObject;
  unpaged?: boolean;
}

export interface OrganisasiMiniResponse {
  id?: number; // int64
  kode?: string;
  nama?: string;
  shortName?: string;
}

export interface LevelResponse {
  id?: number; // int64
  nama?: string;
}

export interface JabatanMiniResponse {
  id?: number; // int64
  kode?: string;
  level?: LevelResponse;
  nama?: string;
}

export type SavedResultListLong = Envelope<number[]>;

export interface EnumOption {
  id?: string;
  nama?: string;
}

export type ListResultEnumOption = Envelope<EnumOption[]>;
