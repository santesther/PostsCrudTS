# Estágio de base
FROM node:20.17.0-alpine AS base

# Estágio de dependências
FROM base AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# Estágio de build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Adicionando a flag --no-lint para evitar problemas de linting durante o build
RUN npm run build

# Estágio de produção
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Criar usuário não-root para produção
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar apenas os arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

# Expor apenas uma porta
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
