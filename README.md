# 🚀 Fastify API

Este repositório contém um backend desenvolvido com **Fastify**, focado em performance, segurança e escalabilidade. A API foi pensada para atender aplicações web e mobile (React.js / React Native), com um **fluxo completo de autenticação**, integração com **Redis**, **PostgreSQL**, e preparada para evoluir para um **SaaS robusto**.

---

## 📌 Visão Geral

A aplicação fornece uma **API REST** responsável por:

* Autenticação de usuários com **JWT (Access Token + Refresh Token)**
* Gerenciamento de sessões e tokens via **Redis**
* Persistência de dados em **PostgreSQL**
* Comunicação segura com frontend web e mobile

O backend foi desenhado seguindo **boas práticas de arquitetura**, separação de responsabilidades e foco em manutenibilidade.

---

## 🧱 Arquitetura Geral

* **Fastify** como framework HTTP
* **JWT** para autenticação stateless
* **Redis** para cache, sessões e refresh tokens
* **PostgreSQL** como banco de dados relacional
* **Docker** para padronização do ambiente

---

## 🔐 Autenticação e Segurança

A API utiliza um **fluxo moderno de autenticação com JWT**, composto por:

### Access Token

* Curta duração
* Enviado no header `Authorization: Bearer <token>`
* Usado para acessar rotas protegidas

### Refresh Token

* Longa duração
* Armazenado no **Redis**
* Permite renovar o access token sem novo login

---

## 🛠️ Tecnologias Utilizadas

* **Node.js**
* **Fastify**
* **Fastify JWT**
* **Fastify Redis**
* **PostgreSQL**
* **Redis**
* **Docker & Docker Compose**
* **TypeScript**
* **Zod** (validação de dados)

---

## 🚧 Próximos Passos / Evoluções

* Suporte a multi-tenancy
* Controle de permissões (RBAC)
* Logs estruturados
* Rate limiting
* Integração com serviços externos
* Observabilidade (metrics / tracing)

---

## 👨‍💻 Autor

Desenvolvido por **Erick Alexandre**

Projeto em evolução contínua, com foco em boas práticas, performance e escalabilidade.

---

## 📄 Licença

Este projeto é de uso privado. Ajuste conforme necessário para distribuição ou uso comercial.
