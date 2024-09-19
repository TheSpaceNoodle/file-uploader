FROM node:20-alpine

WORKDIR /app

COPY . .

COPY src/views dist/

RUN npm i

# CMD ["npm", "run", "dev"]
