import os
import subprocess
from google import genai
from google.genai import types

# Konfigurasi
CACHE_FILE = ".gemini_cache_id"
MODEL_NAME = "gemini-3.8-flash"
client = genai.Client()

def get_codebase_context():
    # Mengambil file spesifik yang di-track oleh git
    result = subprocess.run(
        ['git', 'ls-files', '*.go', '*.ts', '*.py'], 
        capture_output=True, text=True
    )
    files = result.stdout.splitlines()
    
    context_text = "=== PROJECT CODEBASE ===\n"
    for file in files:
        if os.path.exists(file):
            with open(file, 'r', encoding='utf-8') as f:
                context_text += f"\n--- {file} ---\n{f.read()}\n"
    return context_text

def main():
    # 1. Hapus cache lama untuk menghindari biaya penyimpanan ganda
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, "r") as f:
            old_cache = f.read().strip()
        try:
            client.caches.delete(name=old_cache)
            print(f"[Cache] Menghapus versi lama: {old_cache}")
        except Exception:
            pass # Abaikan jika cache sudah kedaluwarsa secara alami
    
    # 2. Registrasi cache baru dari codebase terbaru
    print("[Cache] Membaca codebase dan mendaftarkan ulang...")
    new_cache = client.caches.create(
        model=MODEL_NAME,
        config=types.CreateCachedContentConfig(
            system_instruction="Anda adalah agen eksekutor. Gunakan codebase ini sebagai referensi mutlak.",
            contents=[get_codebase_context()],
            ttl="3600s" # Aktif selama 1 Jam
        )
    )
    
    # 3. Simpan ID baru agar bisa dibaca oleh Sub-Agent
    with open(CACHE_FILE, "w") as f:
        f.write(new_cache.name)
    print(f"[Cache] Sukses! ID Baru: {new_cache.name}")

if __name__ == "__main__":
    main()