#!/bin/bash
set -euo pipefail

# Get all staged files
FILES=($(git diff --cached --name-only | sort))
TOTAL=${#FILES[@]}
BATCH_SIZE=3
BATCH_NUM=0
COUNT=0

echo "📊 Total files to commit: $TOTAL"
echo "📦 Committing in batches of $BATCH_SIZE..."
echo ""

# Categorized commit messages
get_commit_msg() {
  local files=("$@")
  local paths=""
  
  # Analyze file paths to create descriptive messages
  local has_actions=0 has_migrations=0 has_models=0 has_controllers=0 has_services=0
  local has_components=0 has_pages=0 has_routes=0 has_tests=0 has_config=0
  
  for f in "${files[@]}"; do
    [[ "$f" == "app/Actions/"* ]] && ((has_actions++))
    [[ "$f" == "database/migrations/"* ]] && ((has_migrations++))
    [[ "$f" == "app/Models/"* ]] && ((has_models++))
    [[ "$f" == "app/Http/Controllers/"* ]] && ((has_controllers++))
    [[ "$f" == "app/Services/"* ]] && ((has_services++))
    [[ "$f" == "resources/js/components/"* ]] && ((has_components++))
    [[ "$f" == "resources/js/pages/"* ]] && ((has_pages++))
    [[ "$f" == "routes/"* ]] && ((has_routes++))
    [[ "$f" == "tests/"* ]] && ((has_tests++))
    [[ "$f" == "config/"* ]] && ((has_config++))
  done
  
  if [ "$has_migrations" -gt 0 ]; then
    echo "Add database migrations"
  elif [ "$has_models" -gt 0 ]; then
    echo "Add Eloquent models"
  elif [ "$has_actions" -gt 0 ]; then
    echo "Add action classes"
  elif [ "$has_services" -gt 0 ]; then
    echo "Add service classes"
  elif [ "$has_controllers" -gt 0 ]; then
    echo "Add HTTP controllers"
  elif [ "$has_components" -gt 0 ]; then
    echo "Add React components"
  elif [ "$has_pages" -gt 0 ]; then
    echo "Add application pages"
  elif [ "$has_config" -gt 0 ]; then
    echo "Add configuration files"
  elif [ "$has_routes" -gt 0 ]; then
    echo "Add application routes"
  elif [ "$has_tests" -gt 0 ]; then
    echo "Add test suites"
  else
    # Generic message with first file
    echo "Add $(basename "${files[0]}")"
  fi
}

# Process in batches
for ((i = 0; i < TOTAL; i += BATCH_SIZE)); do
  BATCH_NUM=$((BATCH_NUM + 1))
  BATCH_FILES=("${FILES[@]:i:BATCH_SIZE}")
  BATCH_COUNT=${#BATCH_FILES[@]}
  
  # Reset to unstaged state
  git reset HEAD > /dev/null 2>&1 || true
  
  # Stage only this batch
  for f in "${BATCH_FILES[@]}"; do
    git add "$f"
  done
  
  # Get smart commit message
  MSG=$(get_commit_msg "${BATCH_FILES[@]}")
  
  # Show progress
  echo "[$BATCH_NUM] Committing $BATCH_COUNT files: $MSG"
  
  # Commit
  git commit -m "$MSG" > /dev/null 2>&1 || {
    echo "  ⚠️ Commit failed, skipping batch"
  }
done

echo ""
echo "✅ Batch commits complete!"
echo ""
git log --oneline | head -30
echo "..."
echo ""
TOTAL_COMMITS=$(git log --oneline | wc -l)
echo "📊 Total commits now: $TOTAL_COMMITS"
echo "✨ DialN codebase successfully committed with logical history!"
