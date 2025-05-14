#!/bin/bash

echo "Corrigindo erro de SSL..."

# Parar os containers
echo "Parando os containers..."
sudo docker-compose down

# Limpar o cache do navegador
echo "Por favor, limpe o cache do seu navegador ou use uma janela anônima."

# Reiniciar os containers
echo "Reiniciando os containers..."
sudo docker-compose up -d

echo "Aguardando os serviços iniciarem..."
sleep 10

echo "Verificando status dos containers..."
sudo docker-compose ps

echo -e "\nTente acessar a aplicação usando: http://localhost:3000 (não https://)"
echo "Se o problema persistir, execute o script debug.sh para mais informações."
