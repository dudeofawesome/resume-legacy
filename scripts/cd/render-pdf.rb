#!/usr/bin/env ruby

puts '[START HTTP SERVER]'
# @type [IO]
http_server = IO.popen('node_modules/.bin/http-server -p 8080 build')

while !http_server.gets.include?('Available on:')
  sleep 1
end

puts '[CAPTURE WEBSITE PDF]'
if RUBY_PLATFORM.include?('linux')
  chrome_path = '/usr/bin/google-chrome-stable'
elsif RUBY_PLATFORM.include?('darwin')
  chrome_path = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
else
  throw "Unknown platform #{RUBY_PLATFORM}"
end

begin
  `node_modules/.bin/chrome-headless-render-pdf --chrome-binary "#{chrome_path}" --chrome-option '--no-sandbox' --url "http://localhost:8080" --pdf "build/Louis Orleans' Résumé.pdf" --no-margins`
rescue
  exit 1
end

puts '[STOP HTTP SERVER]'
Process.kill("TERM", http_server.pid)

puts '[DONE]'
