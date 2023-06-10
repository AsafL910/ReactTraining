# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i
# RUN npm install react-scripts@3.4.1 -g

# add app
COPY . ./

EXPOSE 5173

# start app
CMD ["npm", "run", "dev"]
