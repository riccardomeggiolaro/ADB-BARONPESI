#!/bin/bash
# Script di configurazione per applicazione NestJS

# Percorso dinamico - usa il percorso corrente o quello specificato
APP_DIR=${1:-$(pwd)}
echo "Usando directory applicazione: $APP_DIR"

if [ -f "/home/configured" ]; then
    echo "= DOCKER CONFIGURATO ="
else
    echo "= PREPARAZIONE DOCKER ="
    
    # Fix dipendenze non soddisfatte
    echo "Riparazione dipendenze del sistema..."
    apt --fix-broken install -y
    
    echo "upgrade...="
    apt update
    apt upgrade -y
    
    echo "Installazione dipendenze di base..."
    # Rimuovi systemctl problematico se installato
    apt remove systemctl -y 2>/dev/null || true
    
    # Installa dipendenze di base
    apt install curl wget gnupg -y
    
    echo "Installazione Node.js..."
    # Installa nvm direttamente nella home dell'utente corrente
    export NVM_DIR="$HOME/.nvm"
    mkdir -p $NVM_DIR
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    # Carica nvm nella sessione corrente
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    # Installa Node.js con nvm
    nvm install 22.14.0
    nvm alias default 22.14.0
    nvm use default

    # Aggiorna npm alla versione specifica
    npm install -g npm@11.1.0
    
    # Verifica le versioni installate
    echo "Versione Node.js:"
    node -v
    echo "Versione npm:"
    npm -v
    
    echo "Installazione pnpm..."
    # Installa pnpm
    npm install -g pnpm
    
    echo "Installazione NestJS CLI..."
    # Install NestJS CLI globally
    npm install -g @nestjs/cli
    
    echo "Installazione dipendenze del progetto..."
    # Install project dependencies
    cd "$APP_DIR"

    pnpm install

    npx prisma generate --schema=src/config/database/schema.prisma

    # Configurazione completata
    touch /home/configured
fi

# Avvio dell'applicazione
cd "$APP_DIR"
pnpm run start:prod