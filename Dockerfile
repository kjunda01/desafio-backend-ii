FROM node:20

# Diretório de trabalho no container
WORKDIR /app

# Copiar package.json e package-lock.json para instalar dependências primeiro (cache otimizado)
COPY package*.json ./

RUN npm install

# Copiar todo o código
COPY . .

# Expõe a porta do app
EXPOSE 3000

# Comando para iniciar o app
CMD ["npm", "start"]
