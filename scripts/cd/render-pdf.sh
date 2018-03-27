#!/usr/bin/env bash

pwd;
ls build;
echo "[START HTTP SERVER]";
http-server -p 8080 build &
sleep 10;
echo "[START HEADLESS CHROME]";
google-chrome-stable --headless --disable-gpu --remote-debugging-port=9222 "http://localhost:8080" &
echo "[CAPTURE WEBSITE PDF]";
chrome-headless-render-pdf --url "http://localhost:8080" --pdf "build/Louis Orleans' Résumé.pdf" --no-margins;
echo "[STOP HEADLESS CHROME]";
kill $!
ls build;
echo "[DONE]";
