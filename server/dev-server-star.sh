#!/usr/bin/env bash

INDEX_FILE="./dist/index.js"
i=0

while true
do
  if [ -f $INDEX_FILE ]; then
    
    COMMAND="NODE_ENV=development nodemon ${INDEX_FILE}"
    echo ${COMMAND}
    
    eval $COMMAND 
    
    break
  else
    i=$((i+1))
    printf "\rYou're waiting: ${i} sec. of compiling..."
    sleep 1
  fi
done
