## Zyra – Guia de Onboarding para Devs

Bem-vindo(a) ao projeto Zyra. Este guia ajuda a preparar o ambiente local do zero até rodar a aplicação e visualizar dados no Prisma Studio.

### Stack principal

- Next.js 15 + React 19 + TypeScript
- Prisma ORM (PostgreSQL)
- Docker Compose (Postgres 17 com migração/seed automáticos)

---

## Requisitos

- Node.js 20+ (recomendado)
- npm 10+
- Docker Desktop (ou Docker Engine) e Docker Compose v2
- Git

Verifique:

```bash
node -v
npm -v
docker --version
docker compose version
```

---

## Primeiro setup (5 passos)

1. Clone e instale dependências:

```bash
git clone <repo-url>
cd zyra
npm i
```

2. Suba banco e bootstrap automático (migrações + seed):

```bash
docker compose up -d
```

O compose sobe:

- `zyra-db`: Postgres 17
- `zyra-migrator`: aplica migrações Prisma automaticamente
- `zyra-seeder`: importa a seed `docker/20-seed.sql` uma única vez

3. Defina a URL do banco (se necessário):

```bash
export DATABASE_URL=postgresql://zyra:zyra@localhost:5432/zyra?schema=public
```

4. Abra o Prisma Studio para ver os dados:

```bash
npx prisma studio
```

5. Rode a aplicação:

```bash
npm run dev
# Abra http://localhost:3000
```

---

## Banco de Dados (Docker)

- Serviço: `zyra-db` (container `zyra-postgres`)
- Imagem: `postgres:17`
- Porta: `5432` (mapeada para localhost)
- Credenciais padrão: usuário `zyra`, senha `zyra`, banco `zyra`
- Volume persistente: `zyra_pg_data`

Extensões criadas na inicialização:

- `uuid-ossp`
- `citext`

Seed:

- Arquivo: `docker/20-seed.sql`
- É aplicada automaticamente na primeira subida com volume novo. Se precisar reaplicar, use o script abaixo.

Abrir um shell SQL no container:

```bash
npm run db:psql
```

---

## Scripts NPM úteis

```bash
# Sobe somente os serviços (DB e bootstrap automático)
npm run db:up

# Derruba os serviços mantendo os dados
npm run db:down

# Derruba e recria (apaga os volumes e reseta tudo)
npm run db:reset

# Espera o DB ficar saudável (usado no bootstrap)
npm run db:wait

# Aplica migrações e importa seed (trunca tabelas antes de importar)
npm run db:seed

# Fluxo completo de reset + migrações + seed
npm run db:bootstrap

# Destrói containers e volumes (APAGA todos os dados)
npm run db:destroy
```

Observação sobre seed idempotente:

- O `db:seed` executa `TRUNCATE TABLE public.products CASCADE;` antes de importar a seed. Ajuste conforme necessário para outras tabelas.

---

## Fluxos comuns

Início do projeto pela primeira vez:

```bash
npm i
docker compose up -d
npx prisma studio
```

Recriar tudo do zero (dados limpos):

```bash
npm run db:bootstrap
```

Reimportar a seed (sem remover o volume):

```bash
npm run db:seed
```

Parar serviços:

```bash
npm run db:down
```

Apagar tudo (containers + volumes):

```bash
npm run db:destroy
```

---

## Prisma (migrations, generate, studio)

Gerar client (opcional, já é gerado via `migrate deploy` quando necessário):

```bash
npx prisma generate
```

Criar uma nova migration (após alterar `prisma/schema.prisma`):

```bash
npx prisma migrate dev --name <sua_migration>
```

Aplicar migrations em produção/CI:

```bash
npx prisma migrate deploy
```

Abrir Studio (GUI do banco):

```bash
npx prisma studio
```

Datasource em `prisma/schema.prisma` usa `DATABASE_URL`. Exemplo:

```bash
export DATABASE_URL=postgresql://zyra:zyra@localhost:5432/zyra?schema=public
```

---

## Estrutura do projeto (resumo)

- `src/app`: rotas/app Next.js
- `src/server/modules/products`: módulo de produtos (controller, service, repository, dto)
- `src/generated/prisma`: Prisma Client gerado
- `prisma/`: schema e migrations
- `docker-compose.yml` e `docker/`: infra de banco, init e seed

---

## Solução de problemas (FAQ)

- Prisma Studio vazio:

  - Garanta `DATABASE_URL` apontando para `postgresql://zyra:zyra@localhost:5432/zyra?schema=public`.
  - Confirme que a seed foi aplicada: `npm run db:seed`.

- Porta 5432 ocupada:

  - Pare outro Postgres local ou ajuste `POSTGRES_PORT` ao subir: `POSTGRES_PORT=5433 docker compose up -d`.

- Seed foi aplicada duas vezes/IDs duplicados:

  - Use `npm run db:seed` (ele trunca tabelas antes) ou `npm run db:bootstrap` para reset total.

- Variáveis de ambiente ausentes nos logs do compose:
  - São opcionais. O compose tem defaults (`zyra/zyra/zyra`). Configure se quiser valores distintos.

---

## Contato

Em caso de dúvidas, abra uma issue ou procure a pessoa responsável pelo projeto.
