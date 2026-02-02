#!/bin/bash
# Deployment Setup Script - Run before deploying

echo "🚀 Real Estate Website - Deployment Setup"
echo "=========================================="
echo ""

# Check Node.js version
echo "✓ Checking Node.js..."
node --version
echo ""

# Install dependencies
echo "✓ Installing backend dependencies..."
cd backend
npm install
cd ..
echo ""

echo "✓ Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo ""

echo "✓ Building frontend..."
cd frontend
npm run build
cd ..
echo ""

echo "✓ Frontend build output ready in: frontend/dist"
echo ""

echo "=========================================="
echo "✅ Setup Complete!"
echo ""
echo "🔗 Next Steps:"
echo "1. Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Deployment ready'"
echo "   git push origin main"
echo ""
echo "2. Deploy Backend to Render:"
echo "   - Go to https://render.com"
echo "   - Create Web Service from GitHub"
echo "   - Add environment variables"
echo ""
echo "3. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import GitHub project"
echo "   - Set root directory to ./frontend"
echo "   - Add VITE_API_URL environment variable"
echo ""
echo "4. See DEPLOYMENT_GUIDE.md for detailed instructions"
echo "=========================================="
