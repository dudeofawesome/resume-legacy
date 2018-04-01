#!/usr/bin/env bash

pwd;
ls build;
echo "[START HTTP SERVER]";
http-server -p 8080 build &
sleep 10;
echo "[CAPTURE WEBSITE PDF]";
chrome-headless-render-pdf --chrome-binary /usr/bin/google-chrome-stable --chrome-option '--no-sandbox' --url "http://localhost:8080" --pdf "build/Louis Orleans' Résumé.pdf" --no-margins;
if [ $? -gt 0 ]; then
  exit $?
fi
echo "[STOP HTTP SERVER]";
kill $!
ls build;
echo "[DONE]";
