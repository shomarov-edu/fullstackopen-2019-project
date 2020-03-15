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
CMD sh -c "./wait-for 134.122.79.96:4466 -- \
  echo Connection to Prisma is up. && \
  prisma deploy -p prisma.yml && \
  npm start"