#! /bin/sh

echo "Migrating datebase..." &&\
npx prisma migrate dev --name $(date)> /dev/null && \
echo "start testing..." &&\
npx tsc &&\
ENV=test &&\
npx jasmine ;\
echo "testing finished" ;\
echo "cleaning up..." ;\
npx prisma migrate reset --force > /dev/null 