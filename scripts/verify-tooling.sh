#!/bin/bash
set -e

echo "Verifying project tooling..."

# GitHub CLI
if command -v gh &> /dev/null; then
  if gh auth status &> /dev/null; then
    echo "✓ GitHub CLI authenticated"
  else
    echo "✗ GitHub CLI not authenticated. Run: gh auth login"
  fi
else
  echo "⚠ GitHub CLI not installed"
fi

# pnpm
if command -v pnpm &> /dev/null; then
  echo "✓ pnpm installed ($(pnpm --version))"
else
  echo "✗ pnpm not installed. Run: npm install -g pnpm"
  exit 1
fi

# Node.js
if command -v node &> /dev/null; then
  echo "✓ Node.js installed ($(node --version))"
else
  echo "✗ Node.js not installed"
  exit 1
fi

# Check if node_modules exists
if [ -d "node_modules" ]; then
  echo "✓ Dependencies installed"
else
  echo "⚠ Dependencies not installed. Run: pnpm install"
fi

echo ""
echo "Tooling verification complete!"
