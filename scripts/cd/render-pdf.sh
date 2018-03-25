#!/usr/bin/env bash

echo $pwd;
ls build;
http-server -p 8080 build;
# google-chrome-stable --headless --disable-gpu --remote-debugging-port=9222 http://localhost &
chrome-headless-render-pdf --url "http://localhost:8080" --pdf "Louis Orleans' Résumé.pdf";
