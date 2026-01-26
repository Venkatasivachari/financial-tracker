#!/bin/bash

# Personal Finance Tracker - Production Start Script

echo "🚀 Starting Personal Finance Tracker..."

# Backend setup
echo "📦 Setting up backend..."
cd backend
npm install --production
npm run seed 2>/dev/null || true  # Seed if needed
npm start &
BACKEND_PID=$!

# Frontend build and serve
echo "🎨 Building frontend..."
cd ../frontend
npm install --production
npm run build

echo "✅ All services started!"
echo ""
echo "Backend running on: http://0.0.0.0:4000"
echo "Frontend ready at: /dist"
echo ""

# Keep backend process running
wait $BACKEND_PID
