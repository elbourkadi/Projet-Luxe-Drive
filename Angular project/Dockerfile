
FROM node:18 as Angular

WORKDIR /src

COPY ./Angular project/ .

RUN npm install

EXPOSE 3000

CMD ["ng", "serve"]
