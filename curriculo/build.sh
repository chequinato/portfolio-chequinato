#!/usr/bin/env sh
# Gera os PDFs do currículo a partir do HTML, com o Chrome headless.
# Uso: sh curriculo/build.sh   (na raiz do repositório)
set -e
CHROME="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
DIR="$(cd "$(dirname "$0")" && pwd -W 2>/dev/null || pwd)"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$DIR/../public/curriculo-miguel.pdf" "file:///$DIR/pt.html"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$DIR/../public/resume-miguel-chequinato.pdf" "file:///$DIR/en.html"
