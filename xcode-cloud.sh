#!/bin/bash

echo "Setting up build environment..."

cd ios

# Pod cache temizleme
rm -rf ~/Library/Caches/CocoaPods
rm -rf Pods
rm -rf ~/Library/Developer/Xcode/DerivedData
pod cache clean --all

# Pod kurulumu
pod install

# Workspace ve scheme kontrolü
if [ ! -d "FlirtWise.xcworkspace" ]; then
  echo "Workspace not found, creating..."
  xcodebuild -create-workspace FlirtWise.xcworkspace
fi

# Build scheme'ini kontrol et
xcodebuild -workspace FlirtWise.xcworkspace -list

echo "Build environment setup completed" 