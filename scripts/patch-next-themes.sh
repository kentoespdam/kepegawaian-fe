#!/usr/bin/env bash
# Patch next-themes to suppress React 19 "Encountered a script tag" warning
# See: https://github.com/pacocoursey/next-themes/issues/387
# This script runs automatically after `bun install` via postinstall hook.
set -euo pipefail

TARGET_ESM="node_modules/next-themes/dist/index.mjs"
TARGET_CJS="node_modules/next-themes/dist/index.js"

if [ ! -f "$TARGET_ESM" ]; then
  echo "[patch-next-themes] $TARGET_ESM not found, skipping."
  exit 0
fi

# Check if already patched
if grep -q "hasMounted" "$TARGET_ESM" 2>/dev/null; then
  echo "[patch-next-themes] Already patched, skipping."
  exit 0
fi

echo "[patch-next-themes] Patching next-themes to suppress React 19 script tag warning..."

# Patch both ESM and CJS using Python for reliable string matching
python3 << 'PYEOF'
import sys

def patch_file(filepath, is_esm=True):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Step 1: Add hasMounted flag after the first var declaration
    if 'var hasMounted' not in content:
        content = content.replace('var M=', 'var hasMounted=false;var M=', 1)
    
    # Step 2: Find the ThemeScript component using parenthesis counting
    idx = content.find('_=t.memo(')
    if idx == -1:
        print(f"  WARNING: _=t.memo( not found in {filepath}")
        return False
    
    # Find the end of the memo call
    paren_count = 0
    end_idx = idx
    for i, c in enumerate(content[idx:]):
        if c == '(':
            paren_count += 1
        elif c == ')':
            paren_count -= 1
            if paren_count == 0:
                end_idx = idx + i + 1
                break
    
    old_memo = content[idx:end_idx]
    
    # Create new memo with hasMounted check
    # Add t.useEffect and null check at the start of the render function
    new_memo = old_memo.replace(
        '=>{let p=',
        '=>{t.useEffect(()=>{hasMounted=true},[]);if(hasMounted)return null;let p='
    )
    
    if new_memo == old_memo:
        print(f"  WARNING: Could not find insertion point in {filepath}")
        return False
    
    content = content.replace(old_memo, new_memo)
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"  Patched {filepath}")
    return True

# Patch ESM
patch_file('node_modules/next-themes/dist/index.mjs', is_esm=True)

# Patch CJS
patch_file('node_modules/next-themes/dist/index.js', is_esm=False)

print("[patch-next-themes] Done.")
PYEOF
