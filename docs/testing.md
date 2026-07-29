# Component Testing

Proyek menggunakan **vitest v4** + **jsdom** + **@testing-library/react v16**.

## Setup

### Dependencies

```bash
bun add -d jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Konfigurasi (`vitest.config.ts`)

- Environment dasar: `node` (untuk unit test fungsi murni `.test.ts`)
- File `.test.tsx` pakai `// @vitest-environment jsdom` directive per-file
- `setupFiles: ["src/lib/vitest.setup.ts"]` — import `@testing-library/jest-dom/vitest` untuk matchers seperti `toBeInTheDocument()`

```ts
// vitest.config.ts (relevan)
test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx", "docs/api/master/**/*.test.ts"],
    setupFiles: ["src/lib/vitest.setup.ts"],
},
```

## Pola Test Component

Setiap file `.test.tsx` WAJIB:
1. Diawali `// @vitest-environment jsdom`
2. Memanggil `registerCleanup()` di setiap `describe` block
3. Memakai import dari `vitest`, `@testing-library/react`, `@testing-library/user-event`

### Template

```tsx
// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MyComponent } from "./my-component";

function registerCleanup() {
    beforeEach(() => {
        cleanup();
        document.body.innerHTML = "";
    });
}

describe("MyComponent", () => {
    registerCleanup();

    it("merender label", () => {
        render(<MyComponent label="Test" />);
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("menampilkan pesan error", () => {
        render(<MyComponent error="Error msg" />);
        expect(screen.getByText("Error msg")).toBeInTheDocument();
    });

    it("memanggil onChange", async () => {
        const onChange = vi.fn();
        const user = userEvent.setup();
        render(<MyComponent onChange={onChange} />);
        await user.type(screen.getByRole("textbox"), "A");
        expect(onChange).toHaveBeenCalledWith("A");
    });
});
```

### Kenapa `registerCleanup()`?

Base UI (shadcn) tidak sepenuhnya dibersihkan oleh `afterEach(cleanup)` dari RTL — ada portal dan event listener yang tersisa. `registerCleanup()` menggunakan `beforeEach` agar lebih defensif: DOM bekas test gagal tetap dibersihkan sebelum test berikutnya.

Pola ini dipanggil di dalam tiap `describe` block agar cleanup-nya scoped ke block itu.

## Query Strategy

| Base UI Component | Query yang dipakai | Alasan |
|---|---|---|
| `<Label>` + `<Input>` | `screen.getByRole("textbox")` | `getByLabelText` tidak work karena `<Label>` tanpa `htmlFor` |
| `<Label>` + `<Select>` | `screen.getByRole("combobox")` | Select trigger punya role combobox |
| `<Label>` + `<Textarea>` | `screen.getByRole("textbox")` | Sama dengan Input — gunakan role |
| Elemen teks (error, label text) | `screen.getByText("...")` / `.queryByText("...")` | Paling stabil untuk teks statis |
| Elemen dengan `data-testid` | `screen.getByTestId("...")` | Untuk komponen yang dimock |

## Mock Strategy: Kompleks → Sederhana

Komponen yang punya internals rumit (Dialog, cmdk, Portal) perlu dimock untuk test unit.

### Contoh: Mock FKCombobox sebagai `<select>` native

```tsx
vi.mock("@/components/fk-combobox", () => ({
    FKCombobox: ({
        options, value, onChange, placeholder, disabled, invalid,
    }: { /* ... */ }) => (
        <select
            data-testid="fk-combobox"
            data-invalid={invalid}
            disabled={disabled}
            aria-label={placeholder}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value || undefined)}
        >
            <option value="">{placeholder}</option>
            {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    ),
}));
```

Mock ini:
- Mengganti `<FKCombobox>` (Dialog + Command/cmdk) dengan `<select>` native DOM
- `data-testid` untuk query mudah via `getByTestId("fk-combobox")`
- `data-invalid` untuk verifikasi prop-forwarding `invalid` dari wrapper
- `aria-label` untuk test aksesibilitas

## Aturan

1. **Setiap test file `.test.tsx` WAJIB** diawali `// @vitest-environment jsdom`
2. **Setiap `describe` block WAJIB** panggil `registerCleanup()` di baris pertama
3. **Hindari `getByLabelText`** untuk komponen Base UI — Label tidak punya `htmlFor`. Gunakan `getByRole` atau `container.querySelector` (dengan komentar penjelasan)
4. **Mock komponen kompleks** (Dialog, Sheet, Command/cmdk, Portal) — jangan test internal library
5. **Satu test = satu assert fokus** — label, required `*`, error display, atau callback — jangan campur
6. **Gunakan `userEvent`** untuk simulasi interaksi (bukan `fireEvent`)
