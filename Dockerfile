FROM node:14.16.0-slim

#WORKDIR /app
WORKDIR /usr/src/app

# ここで npm init（またはpackage.jsonのコピー） と -D を使おうとすると、プロジェクト名が先に必要になってしまう
RUN apt update && \
    npm install -g @vue/cli

# alpineとslimについて
# https://www.creationline.com/lab/29422
# この記事を信じてslimを使おう