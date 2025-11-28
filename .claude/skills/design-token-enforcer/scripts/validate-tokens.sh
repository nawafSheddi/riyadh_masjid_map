#!/bin/bash

# Design Token Validation Script
# Detects anti-patterns in React/TypeScript codebase

echo "🔍 Design Token Validation"
echo "=========================="

ERRORS=0
SRC_DIR=${1:-"src"}

# Check for direct lucide-react imports
echo ""
echo "Checking for direct lucide-react imports..."
if grep -r "from 'lucide-react'" "$SRC_DIR" --include="*.tsx" --include="*.ts" 2>/dev/null; then
    echo "❌ Found direct lucide-react imports (use @/design-tokens/icons instead)"
    ((ERRORS++))
else
    echo "✅ No direct lucide-react imports found"
fi

# Check for hardcoded Tailwind colors
echo ""
echo "Checking for hardcoded Tailwind colors..."
COLORS="red|blue|green|yellow|purple|pink|gray|orange|indigo|teal"
if grep -rE "(bg|text|border)-($COLORS)-[0-9]{1,3}" "$SRC_DIR" --include="*.tsx" 2>/dev/null; then
    echo "❌ Found hardcoded Tailwind colors (use semantic tokens)"
    ((ERRORS++))
else
    echo "✅ No hardcoded Tailwind colors found"
fi

# Check for inline style colors
echo ""
echo "Checking for inline style colors..."
if grep -rE "style=.*#[0-9A-Fa-f]{6}" "$SRC_DIR" --include="*.tsx" 2>/dev/null; then
    echo "❌ Found inline style colors (use className with tokens)"
    ((ERRORS++))
else
    echo "✅ No inline style colors found"
fi

# Check for opacity utilities with semantic colors
echo ""
echo "Checking for broken opacity patterns..."
if grep -rE "(bg|text|border)-(status|primary|secondary|accent).*(opacity|/[0-9])" "$SRC_DIR" --include="*.tsx" 2>/dev/null; then
    echo "❌ Found opacity utilities with CSS variables (use hex with alpha)"
    ((ERRORS++))
else
    echo "✅ No broken opacity patterns found"
fi

# Check for magic numbers (4+ digits)
echo ""
echo "Checking for magic numbers..."
if grep -rE "[^a-zA-Z0-9][0-9]{4,}[^0-9]" "$SRC_DIR" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "toLocaleString" | grep -v "Date" | grep -v "port"; then
    echo "⚠️  Found potential magic numbers (consider extracting to constants)"
else
    echo "✅ No obvious magic numbers found"
fi

echo ""
echo "=========================="
if [ $ERRORS -eq 0 ]; then
    echo "✅ All design token validations passed!"
else
    echo "❌ Found $ERRORS design token violations"
    echo "Run this script regularly to maintain compliance"
fi

exit $ERRORS