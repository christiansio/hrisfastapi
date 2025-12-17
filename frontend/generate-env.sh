#!/bin/sh
# generate-env.sh

# Get local IP
LOCAL_IP=$(curl -s ifconfig.me)

# Create .env file
cat > .env << EOF
# Auto-generated .env file
# Generated on: $(date)

# API Configuration
VITE_API_HOST=$LOCAL_IP
VITE_API_PORT=8000
VITE_API_URL=http://$LOCAL_IP:8000

# App Configuration
VITE_APP_NAME="My Application"
VITE_APP_ENV=development
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=false
EOF

echo "✅ .env file generated successfully!"
echo "📡 API URL: http://$LOCAL_IP:8000"
