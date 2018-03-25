#!/usr/bin/env bash

pwd;
ls build;
echo "[BREAK]";
http-server -p 8080 build &
# google-chrome-stable --headless --disable-gpu --remote-debugging-port=9222 http://localhost &
chrome-headless-render-pdf --url "http://localhost:8080" --pdf "build/Louis Orleans' Résumé.pdf";
kill $!
ls build;
echo "[BREAK]";
