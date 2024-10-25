FROM node:23-alpine3.19 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:23-alpine3.19 AS dev
RUN apk add "python3>3.10"
RUN apk add curl
RUN curl -fsSL https://nilup.nilogy.xyz/install.sh | sh
ENV PATH="$PATH:/root/.nilup/bin"
RUN nilup use latest
RUN nilup -V
WORKDIR /app
RUN nada init nada
RUN cd nada && python3 -m venv .venv
COPY . .

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

EXPOSE 3000
ENV PORT=3000
CMD ["sh"]