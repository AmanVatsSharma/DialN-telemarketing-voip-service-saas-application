#!/bin/bash
set -euo pipefail

# Simpler bulk commit script - groups files by logical directories
# Commits max 3 files per commit

cd "$(dirname "$0")"

echo "🚀 Starting DialN bulk commit journey..."
echo "Committing ~1000 files in logical batches of max 3..."
echo ""

commit_files() {
  local msg="$1"
  shift
  local files=("$@")
  
  # Filter to only files that exist
  local to_add=()
  for f in "${files[@]}"; do
    if [ -f "$f" ]; then
      to_add+=("$f")
    fi
  done
  
  if [ ${#to_add[@]} -eq 0 ]; then
    return
  fi
  
  git add -- "${to_add[@]}"
  git commit -m "$msg"
}

# Helper to commit all files in a directory in batches
commit_batch_dir() {
  local dir="$1"
  local prefix="$2"
  
  if [ ! -d "$dir" ]; then
    return
  fi
  
  local files=($(find "$dir" -maxdepth 1 -type f | sort))
  local batch=()
  
  for f in "${files[@]}"; do
    batch+=("$f")
    if [ ${#batch[@]} -eq 3 ]; then
      git add -- "${batch[@]}"
      git commit -m "$prefix (batch)" || true
      batch=()
    fi
  done
  
  if [ ${#batch[@]} -gt 0 ]; then
    git add -- "${batch[@]}"
    git commit -m "$prefix" || true
  fi
}

# ============================================================================
# PHASE 1: Campaign Actions
# ============================================================================
echo "Phase 1: Campaign actions..."
commit_files "Add campaign lifecycle actions (create, launch, delete)" \
  app/Actions/Campaigns/CreateCampaignAction.php \
  app/Actions/Campaigns/DeleteCampaignAction.php \
  app/Actions/Campaigns/LaunchCampaignAction.php

commit_batch_dir "app/Actions/Campaigns" "Add campaign management actions"
commit_batch_dir "app/Actions/Contacts" "Add contact management actions"
commit_batch_dir "app/Actions/Fortify" "Add authentication actions"
commit_batch_dir "app/Actions/Twilio" "Add Twilio service actions"

# ============================================================================
# PHASE 2: Bootstrap & Providers
# ============================================================================
echo "Phase 2: Application bootstrap..."
commit_batch_dir "bootstrap" "Add Laravel bootstrap"
commit_batch_dir "app/Providers" "Add service providers"

# ============================================================================
# PHASE 3: Configuration
# ============================================================================
echo "Phase 3: Application configuration..."
commit_batch_dir "config" "Add application configuration" # This will do multiple commits due to ~22 files

# ============================================================================
# PHASE 4: Enums, Traits, Helpers
# ============================================================================
echo "Phase 4: Type definitions..."
commit_batch_dir "app/Enums" "Add application enums"
commit_batch_dir "app/Traits" "Add trait classes"
commit_batch_dir "app/Helpers" "Add helper functions"

# ============================================================================
# PHASE 5: Models
# ============================================================================
echo "Phase 5: Eloquent models..."
commit_batch_dir "app/Models" "Add database models" # ~58 models, will create ~19 commits

# ============================================================================
# PHASE 6: Events & Listeners
# ============================================================================
echo "Phase 6: Events and listeners..."
commit_batch_dir "app/Events" "Add domain events"
commit_batch_dir "app/Listeners" "Add event listeners"
commit_batch_dir "app/Listeners/CRM" "Add CRM webhook listeners"

# ============================================================================
# PHASE 7: Notifications
# ============================================================================
echo "Phase 7: Notifications..."
commit_batch_dir "app/Notifications" "Add notification classes"

# ============================================================================
# PHASE 8: Services
# ============================================================================
echo "Phase 8: Services..."
commit_batch_dir "app/Services" "Add business logic services" # Will create multiple commits

# ============================================================================
# PHASE 9: Jobs
# ============================================================================
echo "Phase 9: Queue jobs..."
commit_batch_dir "app/Jobs" "Add background queue jobs"

# ============================================================================
# PHASE 10: Policies
# ============================================================================
echo "Phase 10: Authorization policies..."
commit_batch_dir "app/Policies" "Add authorization policies"

# ============================================================================
# PHASE 11: Middleware
# ============================================================================
echo "Phase 11: HTTP Middleware..."
commit_batch_dir "app/Http/Middleware" "Add HTTP middleware"

# ============================================================================
# PHASE 12: Requests & Resources
# ============================================================================
echo "Phase 12: Form validation and API resources..."
commit_batch_dir "app/Http/Requests" "Add form request validators"
commit_batch_dir "app/Http/Requests/Settings" "Add settings form requests"
commit_batch_dir "app/Http/Resources" "Add API response resources"

# ============================================================================
# PHASE 13: Controllers
# ============================================================================
echo "Phase 13: HTTP Controllers..."
commit_batch_dir "app/Http/Controllers" "Add web controllers" # Will create many commits

# ============================================================================
# PHASE 14: Console Commands
# ============================================================================
echo "Phase 14: Artisan commands..."
commit_batch_dir "app/Console/Commands" "Add artisan console commands"

# ============================================================================
# PHASE 15: Database
# ============================================================================
echo "Phase 15: Database..."
commit_batch_dir "database/migrations" "Add database migrations"
commit_batch_dir "database/factories" "Add model factories"
commit_batch_dir "database/seeders" "Add database seeders"

# ============================================================================
# PHASE 16: Routes
# ============================================================================
echo "Phase 16: Routes..."
commit_batch_dir "routes" "Add application routes"

# ============================================================================
# PHASE 17: Frontend Views & Entry
# ============================================================================
echo "Phase 17: Frontend entry points..."
commit_batch_dir "resources/views" "Add Blade views"
commit_batch_dir "resources/css" "Add stylesheets"

# ============================================================================
# PHASE 18: Frontend TypeScript
# ============================================================================
echo "Phase 18: TypeScript types and utilities..."
commit_batch_dir "resources/js/types" "Add TypeScript type definitions"
commit_batch_dir "resources/js/lib" "Add utility libraries"
commit_batch_dir "resources/js/hooks" "Add React hooks"
commit_batch_dir "resources/js/contexts" "Add React contexts"
commit_batch_dir "resources/js/layouts" "Add page layouts"

# ============================================================================
# PHASE 19: UI Components
# ============================================================================
echo "Phase 19: UI components..."
find resources/js/components/ui -maxdepth 1 -type f | sort | while read f; do
  git add "$f"
  git commit -m "Add UI component: $(basename "$f" .tsx)" || true
done

# ============================================================================
# PHASE 20: App & Feature Components
# ============================================================================
echo "Phase 20: Feature components..."
commit_batch_dir "resources/js/components" "Add application components" # High volume - creates many commits

# ============================================================================
# PHASE 21: Pages
# ============================================================================
echo "Phase 21: Application pages..."
find resources/js/pages -name "*.tsx" | sort | head -100 | while read -r f; do
  git add "$f"
  git commit -m "Add page: $(basename "$f" .tsx)" || true
done

# ============================================================================
# PHASE 22: Wayfinder (auto-generated)
# ============================================================================
echo "Phase 22: Route and action helpers..."
commit_batch_dir "resources/js/routes" "Add TypeScript route helpers"
commit_batch_dir "resources/js/actions" "Add Wayfinder action helpers"

# ============================================================================
# PHASE 23: Tests
# ============================================================================
echo "Phase 23: Test suite..."
commit_batch_dir "tests" "Add test suites"

# ============================================================================
# PHASE 24: Docker & Deployment
# ============================================================================
echo "Phase 24: Docker and deployment..."
commit_batch_dir "docker" "Add Docker configuration"
commit_batch_dir "deployment" "Add deployment configuration"
commit_batch_dir "docs" "Add documentation"

# ============================================================================
# PHASE 25: Storage & Public Assets
# ============================================================================
echo "Phase 25: Static assets..."
commit_batch_dir "storage" "Add storage gitignores"
commit_batch_dir "public" "Add public assets" # Will create multiple commits

echo ""
echo "✅ Commit journey complete!"
echo ""
git log --oneline | head -20
echo "..."
echo ""
TOTAL=$(git log --oneline | wc -l)
echo "📊 Total commits: $TOTAL"
echo "🎉 DialN SaaS successfully committed to git!"
