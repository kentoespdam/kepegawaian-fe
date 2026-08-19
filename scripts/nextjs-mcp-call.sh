#!/usr/bin/env bash
# Next.js MCP tool caller via HTTP
# Usage: scripts/nextjs-mcp-call.sh <tool_name> [json_args]
# Examples:
#   scripts/nextjs-mcp-call.sh get_project_metadata
#   scripts/nextjs-mcp-call.sh get_errors
#   scripts/nextjs-mcp-call.sh get_routes
#   scripts/nextjs-mcp-call.sh get_server_action_by_id '{"actionId":"abc123"}'

set -euo pipefail

PORT="${NEXT_DEV_PORT:-3000}"
MCP_URL="http://localhost:${PORT}/_next/mcp"
TOOL_NAME="${1:?Usage: $0 <tool_name> [json_args]}"
TOOL_ARGS="${2:-{}}"

REQUEST_ID=$((RANDOM % 10000 + 1))

PAYLOAD=$(cat <<EOF
{"jsonrpc":"2.0","id":${REQUEST_ID},"method":"tools/call","params":{"name":"${TOOL_NAME}","arguments":${TOOL_ARGS}}}
EOF
)

# Initialize (required by MCP protocol)
curl -s \
  -H "Accept: application/json, text/event-stream" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{\"jsonrpc\":\"2.0\",\"id\":0,\"method\":\"initialize\",\"params\":{\"protocolVersion\":\"2024-11-05\",\"capabilities\":{},\"clientInfo\":{\"name\":\"bash-client\",\"version\":\"1.0\"}}}" \
  "${MCP_URL}" > /dev/null 2>&1

# Call the tool
RESULT=$(curl -s \
  -H "Accept: application/json, text/event-stream" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "${PAYLOAD}" \
  "${MCP_URL}" 2>&1)

# Extract JSON from SSE format if needed
if echo "$RESULT" | grep -q "^event:"; then
  echo "$RESULT" | grep "^data:" | sed 's/^data: //' | python3 -m json.tool 2>/dev/null || echo "$RESULT" | grep "^data:" | sed 's/^data: //'
else
  echo "$RESULT" | python3 -m json.tool 2>/dev/null || echo "$RESULT"
fi
