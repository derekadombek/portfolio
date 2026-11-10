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

# UI gate: UI files need the UI skill loaded in this session first.
if [ -n "$UI_SKILL" ]; then
  session=$(json .session_id)
  for p in "${UI_PATHS[@]}"; do
    # shellcheck disable=SC2053
    [[ "$rel" == $p ]] || continue
    for x in "${UI_EXCEPT[@]}"; do
      # shellcheck disable=SC2053
      [[ "$rel" == $x ]] && exit 0
    done
    [ -n "$session" ] && [ -f "$STATE/ui-skill-$session" ] && exit 0
    block "$rel is a UI file. Load the $UI_SKILL skill (Skill tool, skill: \"$UI_SKILL\") and follow its setup before editing UI, even for a small change. This repo requires it (UI_SKILL in .claude/agent-kit.conf)."
  done
fi
exit 0
