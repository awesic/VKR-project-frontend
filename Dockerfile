FROM node

WORKDIR /app/frontend/

COPY package.json /app/frontend/
# RUN apt-get update && apt-get upgrade -y && npm i
RUN npm update -g npm && npm i && \
    # npm i @rollup/rollup-linux-arm64-gnu
    rm -rf node_modules package-lock.json \
    && npm cache clean --force \
    && npm i

COPY . /app/frontend/

# CMD [ "npm", "run", "dev" ]

# FROM ubuntu
# RUN apt-get update && apt-get install nginx -y

# COPY --from=build /app/frontend/dist /var/www/html/
# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]