#! /bin/sh

echo "Migrating datebase..." &&\
npx prisma migrate deploy > /dev/null && \
echo "start testing..." &&\
npx tsc &&\
ENV=test &&\
npx jasmine ;\
echo "testing finished" ;\
echo "cleaning up..." ;\
npx prisma migrate reset --force > /dev/null 