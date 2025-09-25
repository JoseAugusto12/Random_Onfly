# n8n Custom Node – Random

Este repositório contém um nó personalizado para o n8n chamado **Random**, responsável por gerar números aleatórios utilizando a API do [Random.org](https://www.random.org/).  

O projeto foi construído em **TypeScript**, com suporte a execução via **Docker Compose** e banco de dados **PostgreSQL**.  

---

## Estrutura do Projeto

```
├─ docker-compose.yml   # Configuração dos serviços
├─ tsconfig.json        # Ajustes do compilador TypeScript
├─ .n8n/
│  └─ custom/
│     ├─ Random.node.js # Nó compilado em JavaScript
│     └─ random.svg     # Ícone do nó
└─ README.md
```

---

## Requisitos

- Docker  
- Docker Compose  
- Node.js (necessário apenas para compilar o TypeScript em JavaScript)  
- Banco PostgreSQL (subido automaticamente pelo docker-compose)  

---

## Instalação e execução

1. Clone este repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

2. Ajuste o caminho do volume no arquivo `docker-compose.yml` para refletir a pasta do seu projeto local. Exemplo no Windows:

```yaml
volumes:
  - D:/Projetos/n8n/custom:/home/node/.n8n/custom
```

3. Inicie os containers:

```bash
docker compose up -d
```

Esse comando cria dois serviços:  
- PostgreSQL na porta 5432  
- n8n na porta 5678  

4. Abra o n8n no navegador:

```
http://localhost:5678
```

---

## Configuração

O `docker-compose.yml` já define as variáveis necessárias:

- Banco: n8n  
- Usuário: postgres  
- Senha: 123  
- Host: postgres  
- Timezone: America/Sao_Paulo  

Altere os valores conforme necessário no próprio arquivo.  

---

## Uso do nó Random

- Crie um novo workflow no n8n  
- Clique em "Add Node" e selecione **Random**  
- Defina os parâmetros:  
  - Mínimo: limite inferior  
  - Máximo: limite superior  
- Execute o nó para obter um valor aleatório a partir da API do Random.org  

---

## Observações

- O nó precisa estar diretamente dentro de `.n8n/custom` para ser carregado corretamente.  
- Sempre que adicionar ou alterar nós, reinicie o serviço n8n:  

```bash
docker compose restart n8n
```

- A pasta de custom nodes deve conter apenas arquivos `.js` e `.svg`.  

---

## Testes

- Execute o nó e confirme se o número retornado está dentro dos limites definidos.  
- Em caso de problemas, consulte os logs:  

```bash
docker compose logs n8n
```

---

## Informações adicionais

- O código foi escrito em TypeScript e convertido para JavaScript compatível com o n8n.  
- Banco de dados configurado em PostgreSQL.  
- O projeto serve como exemplo prático de integração entre n8n e serviços externos.  
