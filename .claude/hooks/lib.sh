#!/usr/bin/env bash
# agent-kit v1 — shared setup for the hooks. Sourced, not run.
# Loads the repo's .claude/agent-kit.conf on top of these defaults.

HANDOFF="docs/handoff.md"
PLAN="PLAN.md"
BUILD_CMD=""          # empty = no build check
BUILD_PATHS="."       # paths whose changes trigger the build check
BLOCK=()              # 'glob|reason' — edits to matching paths are always blocked
BLOCK_NEW=()          # 'glob|reason' — creating new files at matching paths is blocked

cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0
# shellcheck source=/dev/null
[ -f .claude/agent-kit.conf ] && . .claude/agent-kit.conf

STATE=".claude/state"
json() { echo "$INPUT" | jq -r "$1 // empty"; }
