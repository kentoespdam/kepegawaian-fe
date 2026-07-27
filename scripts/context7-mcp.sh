#!/bin/bash
# Wrapper untuk context7 MCP server
# Membaca CONTEXT7_API_KEY dari .env.local (gitignored, aman)
set -a
[ -f "$(dirname "$0")/../.env.local" ] && source "$(dirname "$0")/../.env.local"
set +a
exec npx -y @upstash/context7-mcp --api-key "$CONTEXT7_API_KEY"
