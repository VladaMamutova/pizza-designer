#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

# переход в каталог сборки
cd dist

git init
git add -A
git commit -m 'deploy pizza-designer project'

# Публикуем по адресу https://vladamamutova.github.io/pizza-designer
git push -f git@github.com:vladamamutova.github.io/pizza-designer.git master:gh-pages

cd -