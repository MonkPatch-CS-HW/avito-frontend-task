FROM node:22-alpine
WORKDIR /frontend
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
CMD ["yarn", "preview", "--port", "8080", "--host", "0.0.0.0"]
