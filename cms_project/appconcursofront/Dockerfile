# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN npm install -g pnpm && pnpm install

# Copiar código-fonte
COPY . .

# Build da aplicação
RUN pnpm run build

# Stage 2: Production
FROM nginx:stable-alpine

# Copiar arquivos estáticos do build para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração customizada do Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Comando de inicialização do Nginx
CMD ["nginx", "-g", "daemon off;"]
