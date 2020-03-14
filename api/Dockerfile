FROM node
WORKDIR /api
COPY ./package.json ./wait-for ./
RUN apt-get update && apt-get upgrade -y && \
  apt-get install -y netcat && \
  chmod +x wait-for && \
  npm install -g prisma && \
  npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start" ]