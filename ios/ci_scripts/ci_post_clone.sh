#!/bin/bash

# Fail if any command fails
set -e

echo "🚀 Start post-clone script..."

# Go to project root directory
cd ..

# Setup Node environment using default Xcode Cloud node version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# Install node if not available
if ! command -v node &> /dev/null; then
    echo "⚙️ Setting up Node environment..."
    # Use Node.js version from .nvmrc or default to v18
    NODE_VERSION=$(cat .nvmrc 2>/dev/null || echo "18")
    nvm install $NODE_VERSION
    nvm use $NODE_VERSION
fi

echo "📱 Node version:"
node --version || echo "Node is not available, continuing with pod install..."

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