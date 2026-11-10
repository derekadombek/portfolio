#!/usr/bin/env bash
# agent-kit v1 — PostToolUse (Skill) + UserPromptSubmit hook: record that this
# session loaded the repo's UI skill (UI_SKILL in .claude/agent-kit.conf), so
# guard-files.sh lets UI_PATHS edits through. Claude loading it with the Skill
# tool and the user typing /<UI_SKILL> both count. Never blocks.
INPUT=$(cat)
. "$(dirname "$0")/lib.sh"

[ -z "$UI_SKILL" ] && exit 0
session=$(json .session_id)
[ -z "$session" ] && exit 0

case "$(json .hook_event_name)" in
  UserPromptSubmit) name=$(json .prompt | sed -n '1s#^[[:space:]]*/\([^[:space:]]*\).*#\1#p') ;;
  *)                name=$(json .tool_input.skill) ;;
esac
name=${name#/}
# Plugin-qualified names ("plugin:impeccable") count too.
if [ "$name" = "$UI_SKILL" ] || [ "${name##*:}" = "$UI_SKILL" ]; then
  mkdir -p "$STATE"
  touch "$STATE/ui-skill-$session"
  find "$STATE" -name 'ui-skill-*' -mtime +14 -delete 2>/dev/null
fi
exit 0
