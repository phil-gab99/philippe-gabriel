#!/bin/env bash

guix time-machine -C channels.scm \
     -- shell -e '(list (@@ (gnu packages gcc) gcc) "lib")' -m manifest.scm --container --emulate-fhs --network --share=$HOME/.cache \
     -- npx playwright test

exit 0
