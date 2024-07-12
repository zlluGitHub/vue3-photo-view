#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
cd ./example

npm run build

# 进入生成的文件夹
cd ./storybook-static

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:zlluGitHub/vue3-photo-view.git master:gh-pages

cd -
