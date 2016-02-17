#!/usr/bin/env bash

echo "Hello, World"

# use noninteractive mode since this script is automated
export DEBIAN_FRONTEND=noninteractive

# update the package database
sudo -E apt-get update

# install git
sudo -E apt-get install -y git

# install node v4.x
curl -sL https://deb.nodesource.com/setup 4.x | sudo -E bash -
sudo -E apt-get install -y nodejs

sudo -E apt-get install -y build-essential

# allow node.js servers to bind to low ports
sudo -E apt-get install -y chase
sudo -E apt-get install -y libcap2-bin
sudo -E setcap cap_net_bind_service=+ep $(chase $(which node))

mysql -u root

# install mongo
sudo -E apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multivers" | sudo -E tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo -E apt-get -y mongodb-org

sudo -E apt-get install -y libkrb5-dev