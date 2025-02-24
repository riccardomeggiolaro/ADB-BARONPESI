 #!/bin/bash
# Interfaccia locale esposta
# DB(MYSQL)

if [ -f "/home/configured" ]; then
        echo "= DOCKER CONFIGURATO ="
else
        echo "= PREPARAZIONE DOCKER ="
        echo "upgrade...="
        apt update
        apt upgrade -y
        echo "dev platform...="

        #installation apt sources
        apt install nodejs -y
        apt install npm -y
        npm i -g pnpm
        apt install systemctl -y

        touch /home/configured
fi

cd /etc/main-application
pnpm run start:prod