#!/bin/bash

#Installing node 8.x lts
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt update
sudo apt install nodejs -y
sudo apt install build-essential -y

#Installing Docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
sudo apt install docker-ce -y
sudo usermod -aG docker ${USER}

#Installing Docker Compose
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
#docker-compose --version

#Install Git if this is not installed
git=$(git --version)
if [ "$git" == 0 ]; then
  sudo apt install git -y
else
  echo $git
fi

#Downloading the project
git clone https://github.com/facosta0787/sifiraweb.git

#Building ui project
cd sifiraweb/sfr-ui && \
sudo npm install && \
sudo REACT_APP_API=${PUBLIC_IP}:3000 node scripts/build.js && \
cd /

#Executing the project
sudo URL=${PUBLIC_IP}:3000 \
DB_TYPE=mssql \
DB_HOST=${APP_DB_HOST} \
DB_SCHEMA=${APP_DB_SCHEMA} \
DB_USER=${APP_DB_USER} \
DB_PASS=${APP_DB_PASS} \
DB_PORT=1433 \
sudo docker-compose -f sifiraweb/docker-compose-prod.yml build

sudo URL=${PUBLIC_IP}:3000 \
DB_TYPE=mssql \
DB_HOST=${APP_DB_HOST} \
DB_SCHEMA=${APP_DB_SCHEMA} \
DB_USER=${APP_DB_USER} \
DB_PASS=${APP_DB_PASS} \
DB_PORT=1433 \
docker-compose -f sifiraweb/docker-compose-prod.yml up -d