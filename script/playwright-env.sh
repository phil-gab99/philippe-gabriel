#!/bin/env bash

guix shell -m manifest.scm --container --emulate-fhs --network --share=$HOME/.cache

exit 0
