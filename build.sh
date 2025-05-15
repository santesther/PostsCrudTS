ECR_REGISTRY="164782487430.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
docker build -t aws-aula-posts .
docker tag aws-aula-posts:latest $ECR_REGISTRY/aws-aula-posts:latest
docker push $ECR_REGISTRY/aws-aula-posts:latest