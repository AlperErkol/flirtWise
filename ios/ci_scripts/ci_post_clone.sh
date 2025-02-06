#!/bin/bash

# Fail if any command fails
set -e

echo "🚀 Start post-clone script..."

# Go to project root directory
cd ..

# Check node version
echo "📱 Node version:"
node --version

# Install dependencies
echo "🧩 Installing dependencies..."

# Install cocoapods if not installed
if ! command -v pod &> /dev/null; then
    echo "⚙️ Installing Cocoapods..."
    gem install cocoapods
fi

# Navigate to iOS folder
cd ios

# Clean Pods
echo "🧹 Cleaning Pods..."
rm -rf Pods
rm -rf Podfile.lock

# Install pods
echo "📦 Installing Pods..."
pod install

echo "✅ Post-clone script completed successfully" 