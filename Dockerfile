# Dockerfile - API Node.js
# Utilisation de l'image officielle Node.js
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de configuration et d'application
COPY package*.json tsconfig.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Compiler le code TypeScript
RUN npm run build

# Exposer le port (par exemple, 3000)
EXPOSE 5020

# Commande de démarrage
CMD ["npm", "start"]
