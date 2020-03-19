FROM node
WORKDIR /api
COPY ./package.json ./
RUN npm install && \
  npm install -g prisma
COPY . .
EXPOSE 4000
CMD ["npm", "start"]