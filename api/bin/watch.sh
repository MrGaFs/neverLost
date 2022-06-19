# ! /bin/sh

rm -rf ./dist

ENV=test npx tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess "node ./dist/server.js"



