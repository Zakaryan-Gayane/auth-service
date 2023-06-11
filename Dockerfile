FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci  --production
ENV PATH /app/node_modules/.bin:$PATH
ADD . .
CMD ["npm", "start"]