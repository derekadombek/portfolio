#!/usr/bin/env bash
# agent-kit v1 — SessionStart hook: print the handoff and the work already in flight
# so a new agent knows where things stand and doesn't redo or collide with work.
# Stdout is added to Claude's context.
INPUT=$(cat)
. "$(dirname "$0")/lib.sh"

# Mark when this session began, so handoff-check.sh only counts this session's edits.
session=$(json .session_id)
if [ -n "$session" ]; then
  mkdir -p "$STATE"
  [ -f "$STATE/session-$session" ] || touch "$STATE/session-$session"
  find "$STATE" -name 'session-*' -mtime +14 -delete 2>/dev/null
fi

if [ -f "$HANDOFF" ]; then
  echo "## Handoff from the previous session: start from its \"Next step\""
  echo
  sed '/^<!--/,/^-->/d' "$HANDOFF"
  echo
fi

echo "## Work already in flight (check before starting anything)"
echo
echo "Branch: $(git branch --show-current 2>/dev/null)"

changes=$(git status --short 2>/dev/null)
if [ -n "$changes" ]; then
  echo
  echo "Uncommitted changes. Someone is mid-task here; don't overwrite or redo them:"
  echo "$changes" | head -30 | sed 's/^/  /'
fi

worktrees=$(git worktree list 2>/dev/null | tail -n +2)
if [ -n "$worktrees" ]; then
  echo
  echo "Other worktrees (parallel work may be happening there):"
  echo "$worktrees" | sed 's/^/  /'
fi

echo
echo "Recent commits:"
git log --oneline -5 2>/dev/null | sed 's/^/  /'

if [ -f "$PLAN" ]; then
  echo
  echo "$PLAN items in progress [~] (claimed; don't start these in parallel):"
  grep -n -- '- \[~\]' "$PLAN" | sed 's/^/  /' || echo "  (none)"
  echo
  echo "$PLAN open items [ ]:"
  grep -n -- '- \[ \]' "$PLAN" | head -15 | sed 's/^/  /' || echo "  (none)"
fi
exit 0
