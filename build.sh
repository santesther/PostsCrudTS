ECR_REGISTRY="http://164782487430.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
docker build -t aws-posts .
docker tag aws-posts:latest $ECR_REGISTRY/aws-posts:latest
docker push $ECR_REGISTRY/aws-posts:latest