#!/usr/bin/env bash
# agent-kit v1 — Stop hook: if BUILD_PATHS changed since the last green run of
# BUILD_CMD, run it. On failure, exit 2 so Claude sees the error and keeps working.
INPUT=$(cat)
. "$(dirname "$0")/lib.sh"

[ -z "$BUILD_CMD" ] && exit 0
[ "$(json .stop_hook_active)" = "true" ] && exit 0

read -r -a paths <<< "$BUILD_PATHS"

# No changes vs HEAD in build inputs: nothing to check.
[ -z "$(git status --porcelain -- "${paths[@]}" 2>/dev/null)" ] && exit 0

# Fingerprint the current changes and skip if they already passed.
fingerprint=$( { echo "$BUILD_CMD"; git diff HEAD -- "${paths[@]}";
                 git ls-files --others --exclude-standard -- "${paths[@]}" | xargs -I{} shasum {} ; } \
               | shasum | cut -d' ' -f1)
stamp="$STATE/last-green-build"
[ -f "$stamp" ] && [ "$(cat "$stamp")" = "$fingerprint" ] && exit 0

if out=$(bash -c "$BUILD_CMD" 2>&1); then
  mkdir -p "$STATE" && echo "$fingerprint" > "$stamp"
  exit 0
fi

{
  echo "Build check FAILED ($BUILD_CMD). Fix it before finishing. Last 40 lines:"
  echo "$out" | tail -40
} >&2
exit 2
