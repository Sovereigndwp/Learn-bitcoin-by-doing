#!/bin/bash

echo "🚀 Setting up Bitcoin Learning App development environment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install optional dev tools
echo "🔧 Installing development tools..."
npm install --save-dev husky lint-staged prettier eslint-plugin-testing-library

# Setup pre-commit hooks
echo "🪝 Setting up pre-commit hooks..."
npx husky install

# Create pre-commit hook
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run test:ci
EOF

chmod +x .husky/pre-commit

# Create lint-staged config
cat > .lintstagedrc.json << 'EOF'
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write",
    "npm run test:ci -- --findRelatedTests"
  ],
  "*.{json,css,md}": [
    "prettier --write"
  ]
}
EOF

echo "✅ Development environment setup complete!"
echo ""
echo "🧪 Available test commands:"
echo "  npm test                 # Run tests in watch mode"
echo "  npm run test:coverage    # Run tests with coverage report"
echo "  npm run test:ci          # Run tests for CI/CD"
echo "  npm run test:debug       # Run tests with verbose output"
echo ""
echo "🎯 Next steps:"
echo "  1. Run 'npm start' to start development server"
echo "  2. Run 'npm run test:coverage' to see current test coverage"
echo "  3. Tests will automatically run before each git commit"
