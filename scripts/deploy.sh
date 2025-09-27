#!/bin/bash

# Component Library Deployment Script
set -e

echo "🚀 Starting deployment process..."

# 1. Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf storybook-static/
rm -rf demo/dist/

# 2. Install dependencies
echo "📦 Installing dependencies..."
npm ci

# 3. Build the library
echo "🏗️ Building component library..."
npm run build

# 4. Build Storybook
echo "📚 Building Storybook..."
npm run build-storybook

# 5. Install demo dependencies and build
echo "🎯 Building demo app..."
cd demo
npm ci
npm run build
cd ..

echo "✅ Build process completed successfully!"
echo ""
echo "📂 Build outputs:"
echo "  - Library: ./dist/"
echo "  - Storybook: ./storybook-static/"
echo "  - Demo: ./demo/dist/"
echo ""
echo "🌐 Ready for deployment to Vercel!"