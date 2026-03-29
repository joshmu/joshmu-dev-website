#!/bin/bash
# Check for Bash 4+ features that break on macOS Bash 3.2.57
# Adapted from agent-observability validation architecture

set -euo pipefail

errors=0

for file in $(git ls-files '*.sh'); do
  # Self-exclude to avoid false positives from our own grep patterns
  [[ "$file" == *check-bash32-compat* ]] && continue

  # declare -A (associative arrays, 4.0+) including combined flags like -Ag, -gA
  if grep -nP 'declare\s+-[a-zA-Z]*A' "$file" 2>/dev/null; then
    echo "ERROR: $file uses 'declare -A' (associative arrays, requires Bash 4.0+)"
    errors=$((errors + 1))
  fi

  # mapfile/readarray (4.0+)
  if grep -nP '^\s*(mapfile|readarray)\b' "$file" 2>/dev/null; then
    echo "ERROR: $file uses mapfile/readarray (requires Bash 4.0+)"
    errors=$((errors + 1))
  fi

  # ${var,,} / ${var^^} case modification (4.0+)
  if grep -nP '\$\{[a-zA-Z_][a-zA-Z0-9_]*(,,|(\^\^))' "$file" 2>/dev/null; then
    echo "ERROR: $file uses case modification syntax (requires Bash 4.0+)"
    errors=$((errors + 1))
  fi

  # coproc (4.0+)
  if grep -nP '^\s*coproc\b' "$file" 2>/dev/null; then
    echo "ERROR: $file uses coproc (requires Bash 4.0+)"
    errors=$((errors + 1))
  fi

  # Negative array indices ${arr[-1]} (4.3+)
  if grep -nP '\$\{[a-zA-Z_][a-zA-Z0-9_]*\[-[0-9]+\]' "$file" 2>/dev/null; then
    echo "ERROR: $file uses negative array indices (requires Bash 4.3+)"
    errors=$((errors + 1))
  fi

  # declare -g (global scope, 4.2+) including combined flags
  if grep -nP 'declare\s+-[a-zA-Z]*g' "$file" 2>/dev/null; then
    echo "ERROR: $file uses 'declare -g' (requires Bash 4.2+)"
    errors=$((errors + 1))
  fi

  # declare -n (nameref, 4.3+) including combined flags
  if grep -nP 'declare\s+-[a-zA-Z]*n' "$file" 2>/dev/null; then
    echo "ERROR: $file uses 'declare -n' (requires Bash 4.3+)"
    errors=$((errors + 1))
  fi
done

if [ "$errors" -gt 0 ]; then
  echo ""
  echo "Found $errors Bash 4+ compatibility issue(s). macOS ships Bash 3.2.57."
  exit 1
fi

echo "No Bash 4+ features detected. Compatible with Bash 3.2."
