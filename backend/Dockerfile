# fastify-api/Dockerfile
FROM node:20

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml tsconfig.json ./

RUN pnpm install

COPY . .

# RUN pnpm install ts-node typescript --save-dev


# Run Fastify directly using ts-node
CMD ["pnpx", "ts-node", "index.ts"]
