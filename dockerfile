# Используем официальный образ Node.js
FROM node:18-alpine

# Установка рабочей директории
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Сборка проекта Astro
RUN npm run build

# Открываем порт 4321
EXPOSE 4321

# Команда для запуска приложения
CMD ["npm", "start"]
