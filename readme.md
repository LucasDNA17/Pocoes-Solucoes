# Poções e Soluções - Sistema E-commerce Alquímico

Este projeto consiste em uma aplicação web completa (Web Service + Frontend) desenvolvida para a loja **Poções e Soluções**, gerenciada por Innabelle Merigold no Beco da Última Saída. A aplicação foi estruturada utilizando arquitetura modular, separando completamente a interface voltada ao cliente do painel administrativo da loja, consumindo dados de forma assíncrona (AJAX) via Fetch API e sem o uso de React.

---

## 🛠️ Tecnologias Utilizadas

- **Back-end / API:** Node.js com o framework Express.
- **Banco de Dados & ORM:** Sequelize com banco de dados SQLite operando inteiramente em modo memória (`:memory:`).
- **Front-end:** HTML5, CSS3 clássico/sóbrio (utilizando a tipografia *Gill Sans* e paleta escura) e JavaScript Vanilla (nativo).
- **Comunicação assíncrona:** Fetch API (AJAX) para operações de CRUD (`GET`, `POST`, `DELETE`).

---

## 📂 Estrutura de Diretórios

A árvore do projeto está organizada da seguinte forma:

```text
potions-shop/
│
├── package.json         # Definição de dependências e scripts do ecossistema Node
├── server.js            # Servidor Express, rotas e inicialização do banco SQLite
└── public/              # Pasta de arquivos estáticos acessíveis pelo navegador
    ├── style.css        # Estilização visual unificada (Identidade Sóbria e Dark)
    ├── index.html       # Interface pública da vitrine da loja (Visão do Comprador)
    └── admin.html       # Interface de gerenciamento de estoque (Visão de Administrador)
```


## 📋 Pré-requisitos

Antes de iniciar, certifique-se de possuir:

- Node.js instalado (recomenda-se a versão LTS);
- Um terminal de comandos (Prompt de Comando, PowerShell ou Terminal do VS Code).

Para verificar se o Node.js está instalado, execute:

```bash
node -v
```
Caso o comando não seja reconhecido, faça o download da versão mais recente LTS no site oficial do Node.js.


## ⚙️ Instalação

Navegue até a pasta raiz do projeto.

Instale as dependências:

```bash
npm install
```

Este comando instalará automaticamente as dependências definidas no arquivo `package.json`, incluindo:

- Express
- Sequelize
- SQLite3

---

## ▶️ Execução

Para iniciar o servidor, execute:

```bash
npm start
```

Se tudo estiver configurado corretamente, o terminal exibirá:

```text
Banco de dados inicializado e populado.
Servidor rodando em http://localhost:3000
```

Essas mensagens indicam que:

- O banco de dados SQLite em memória foi criado e sincronizado;
- Os dados iniciais dos elixires foram carregados;
- O servidor está ativo e pronto para receber conexões.

---

## ⏹️ Encerrando o Servidor

Para interromper a execução do servidor, pressione:

```text
Ctrl + C
```

no terminal onde a aplicação está sendo executada.

---

## Acesso à Aplicação

Após iniciar o servidor, os seguintes ambientes estarão disponíveis:

### 🛒 Loja Virtual

Acesse:

```text
http://localhost:3000/
```

### ⚙️ Painel Administrativo

Acesse:

```text
http://localhost:3000/admin
```
