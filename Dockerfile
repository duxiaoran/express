FROM ingens:8880/env/nodejs:8.9.3
EXPOSE 80

RUN locale-gen en_US.UTF-8  
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

ENV NVM_DIR=/root/.nvm
ENV PATH=/root/.nvm/versions/node/v8.9.3/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ENV NVM_BIN=/root/.nvm/versions/node/v8.9.3/bin
ENV PRODUCTION=true
COPY ./dist /app/dist/
COPY ./.env /app/
COPY ./package.json /app/
WORKDIR /app
RUN npm install


ENTRYPOINT ["node", "dist/index.js"]