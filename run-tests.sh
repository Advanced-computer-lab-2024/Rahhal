#!/bin/bash

services=("api-gateway" "authentication" "booking" "client" "entertainment" "notification" "order" "payment" "product" "user")

for service in "${services[@]}"; do
    cd "$service" || exit
    npm run test
    cd ..
done