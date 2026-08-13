/**
 * permissions — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : GET /system/permissions
 */

import type { Envelope, PrefPermission } from "../_shared";

export type ListResultPrefPermission = Envelope<PrefPermission[]>;

export type { PrefPermission } from "../_shared";
