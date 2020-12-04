# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Build docker container.\

### `docker build -f ./server/Dockerfile -t form-e-commerce .`

Run docker container.\

### `docker-compose -f ./server/docker-compose.yml -d up`

Run docker container.\
### `docker-compose -f ./server/docker-compose.yml -d up`

Deploy with docker swarm.\
### `docker stack deploy -c ./server/stack.yml form`

Network.\

### `docker network create --driver overlay proxy`