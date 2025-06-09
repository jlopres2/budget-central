#uses node version 23 as base image
FROM node:23

#Goes to the app directory
WORKDIR /frontend

#Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

#Install app dependencies
RUN npm install

#Copy the rest of our app into the container
COPY . .

#Set port environment variable
ENV PORT=5173
ENV VITE_HOST=0.0.0.0

#Expose the port so our computer can access it
EXPOSE 5173

#Run the app
CMD ["npm", "run", "dev"]