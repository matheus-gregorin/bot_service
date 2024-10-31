# Use uma imagem base Node.js
FROM node:18

# Defina o diretório de trabalho como /app
WORKDIR /app

# Copie o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install -y

# Copie o restante dos arquivos da aplicação para o contêiner
COPY . .

# Exponha a porta em que o servidor será executado
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
