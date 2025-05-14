#!/bin/bash

# Instalar dependências
echo "Instalando dependências..."
npm install --legacy-peer-deps

# Adicionar tailwindcss-animate
echo "Instalando tailwindcss-animate..."
npm install -D tailwindcss-animate --legacy-peer-deps

# Construir a imagem Docker
echo "Construindo a imagem Docker..."
sudo docker build -t posts-app .

# Iniciar os serviços com Docker Compose
echo "Iniciando os serviços com Docker Compose..."
sudo docker-compose up -d

echo "Configuração concluída! A aplicação está rodando em http://localhost:3000"
