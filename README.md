# 📚 Course Manager API - Backend

## 🚀 Tecnologias Utilizadas
- Node.js (Runtime JavaScript)
- Express (Framework web)
- Prisma (ORM moderno)
- SQLite (Banco de dados embutido)
- JSON Web Tokens (Autenticação)
- Bcrypt (Criptografia de senhas)
- TypeScript (Tipagem estática)
- CORS (Controle de acesso entre origens)

## Orientação para rodar o projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) (versão recomendada: 14.x ou superior)
- [npm](https://www.npmjs.com/)
- [git](https://git-scm.com/downloads)

### 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/VitorioCp/course-manager-back-end

# Acesse o diretório do projeto
cd .\course-manager-back-end-main\

# Instale as dependências
npm install

# Gerar o prisma Cliente
npx prisma generate
```
### ❗ Atenção

- O projeto está rodando na porta 3001, lembre-se de mante-lá disponivél ou mude a porta no arquivo .env na raiz do projeto.
- Você deve configurar o JWT_SECRET no arquivo .env, ou manter como ela está por padrão: "sua_chave_secreta_aqui", caso você altere utilize a mesma JWT_SECRET no front end.
- O projeto já está vindo com o .env genérico para facilitar o uso.
- Caso necessário altera a permissão do cors no server.ts

### 🚗 Rode o projeto
utilize o seguinte comando para rodar o projeto:

```bash
npm run dev
```
