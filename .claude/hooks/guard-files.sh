#!/usr/bin/env bash
# agent-kit v1 — PreToolUse hook (Write|Edit): block edits that break the repo's
# single-source-of-truth rules. Built-in rules plus BLOCK / BLOCK_NEW from
# .claude/agent-kit.conf. Exit 2 blocks the call and tells Claude why.
INPUT=$(cat)
. "$(dirname "$0")/lib.sh"

file=$(json .tool_input.file_path)
[ -z "$file" ] && exit 0
rel="${file#"$CLAUDE_PROJECT_DIR"/}"

block() { echo "Blocked: $1" >&2; exit 2; }

# Built-in rules.
case "$rel" in
  .env|.env.*|*/.env|*/.env.*) block "Don't write env files." ;;
  .claude/state/*)             block "$rel is hook state. Don't edit it." ;;
esac
case "$(readlink "$file" 2>/dev/null)" in
  *CLAUDE.md) block "$rel is a symlink to CLAUDE.md. Edit CLAUDE.md." ;;
esac

# Repo rules.
for rule in "${BLOCK[@]}"; do
  # shellcheck disable=SC2053
  [[ "$rel" == ${rule%%|*} ]] && block "${rule#*|}"
done
if [ ! -e "$file" ]; then
  for rule in "${BLOCK_NEW[@]}"; do
    # shellcheck disable=SC2053
    [[ "$rel" == ${rule%%|*} ]] && block "New file $rel: ${rule#*|}"
  done
fi
exit 0
