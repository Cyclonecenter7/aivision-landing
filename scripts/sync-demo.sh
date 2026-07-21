#!/bin/bash
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LANDING_PATH="${LANDING_PATH:-$(cd "${SCRIPT_DIR}/.." && pwd)}"
CRM_PATH="${CRM_PATH:-$(cd "${LANDING_PATH}/../Швец ап/aivision-sp-front" && pwd)}"

echo "Building CRM demo..."
cd "$CRM_PATH"
VITE_DEMO=1 npm run build

echo "Copying dist to landing/public/demo..."
cd "$LANDING_PATH"
rm -rf "${LANDING_PATH}/public/demo"
cp -R "$CRM_PATH/dist" public/demo

echo "Done. Commit public/demo and push landing."
