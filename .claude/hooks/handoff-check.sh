#!/usr/bin/env bash
# agent-kit v1 — Stop hook: if this session changed files after the last handoff
# update, block stopping until the handoff is rewritten. Uses the session-start
# marker from session-context.sh, so edits from earlier sessions or by hand don't
# trigger it.
INPUT=$(cat)
. "$(dirname "$0")/lib.sh"

# Already blocked once this turn: let it stop rather than loop forever.
[ "$(json .stop_hook_active)" = "true" ] && exit 0

session=$(json .session_id)
marker="$STATE/session-$session"
{ [ -z "$session" ] || [ ! -f "$marker" ]; } && exit 0

stale=()
while IFS= read -r f; do
  [ "$f" = "$HANDOFF" ] && continue
  [ -f "$f" ] && [ ! -L "$f" ] || continue
  if [ "$f" -nt "$marker" ] && { [ ! -f "$HANDOFF" ] || [ "$f" -nt "$HANDOFF" ]; }; then
    stale+=("$f")
  fi
done < <(git ls-files -m -o --exclude-standard 2>/dev/null)

[ ${#stale[@]} -eq 0 ] && exit 0

{
  echo "Before finishing, rewrite $HANDOFF (overwrite it; follow the rules in its header):"
  echo "Just done / Current state / Next step / Watch out for. Also update $PLAN Status if an item changed."
  echo "Files changed since the last handoff update:"
  printf '  %s\n' "${stale[@]:0:15}"
} >&2
exit 2
