FROM node:18-alpine
WORKDIR /frontend
COPY package.json yarn.lock ./
RUN yarn
COPY . .
CMD ["yarn", "start"]
