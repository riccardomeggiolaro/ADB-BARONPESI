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
        apt install systemctl -y
        apt install curl -y

        # install pnpm repository
        curl -fsSL https://get.pnpm.io/install.sh | sh -

        # install project dependencies
        cd /etc/main-application
        pnpm install
        npx prisma generate

        touch /home/configured
fi

cd /etc/main-application
pnpm run start:prod