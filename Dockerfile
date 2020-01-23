# node version
FROM node:12.13.0

# app directory
WORKDIR /musical-spoon

# app dependencies
COPY package*.json /file-system/

# install deps
RUN apt update && apt upgrade -y && apt install libreoffice --no-install-recommends unar openjdk-8-jdk tree -y && apt clean

# install pm2
RUN npm install pm2 -g

# install app dependencies
RUN npm install


# for production
#RUN npm ci --only-production

# copy project files
COPY . .

# expose port
EXPOSE 3000

# ENV NODE_ENV=staging

# run
# expose port
# ENV NODE_ENV=staging

# run
CMD node app.js
