#!/bin/bash

echo "=== Verificando status dos containers ==="
sudo docker-compose ps

echo -e "\n=== Logs da aplicação ==="
sudo docker-compose logs app

echo -e "\n=== Verificando se a aplicação está ouvindo na porta 3000 ==="
sudo docker exec posts-app2-app-1 netstat -tulpn | grep 3000

echo -e "\n=== Verificando configuração do Next.js ==="
sudo docker exec posts-app2-app-1 cat /app/.next/standalone/server.js | grep -A 5 -B 5 "createServer"

echo -e "\n=== Tentando acessar a aplicação de dentro do container ==="
sudo docker exec posts-app2-app-1 wget -O- http://localhost:3000 2>/dev/null | head -n 20

echo -e "\n=== Reiniciando os containers ==="
sudo docker-compose down
sudo docker-compose up -d

echo -e "\n=== Instruções para acessar a aplicação ==="
echo "Por favor, tente acessar a aplicação usando: http://localhost:3000 (não https://)"
