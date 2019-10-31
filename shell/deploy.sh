#!/bin/sh

S3_BUCKET=$1

npm run build
aws s3 sync --delete ./build/production/ "s3://${S3_BUCKET}"
