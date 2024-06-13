#! /bin/bash

npx tailwindcss -i ./src/global.css -o ./dist/output.css && npm run build
