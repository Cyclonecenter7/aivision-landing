#!/bin/bash
set -e
CRM_PATH="${CRM_PATH:-../AIVISION\ CRM}"
LANDING_PATH="${LANDING_PATH:-$(pwd)}"

echo "Building CRM demo..."
cd "$CRM_PATH/frontend"
VITE_DEMO=1 npm run build

echo "Copying dist to landing/public/demo..."
cd "$LANDING_PATH"
rm -rf public/demo
cp -R "$CRM_PATH/frontend/dist" public/demo

echo "Done. Commit public/demo and push landing."
