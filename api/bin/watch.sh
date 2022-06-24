# ! /bin/sh

rm -rf ./dist

ENV=test npx tsc

npx node ./dist/server.js 



