# Conversor de Moedas - API Node.js

API desenvolvida em Node.js que converte valores entre moedas utilizando a cotação atual da [FreeCurrencyApi](https://freecurrencyapi.com/).

**Principais Funcionalidades:**
* 🔐 **Autenticação:** Proteção via Header (`x-api-key`).
* ⚡ **Cache:** Armazenamento de cotações por 2 minutos para economizar requisições e acelerar a resposta.
* ✅ **Validação:** Verificação de entradas e tratamento de erros.

## 🚀 Como rodar

### Pré-requisitos
* Node.js instalado.
* Conta na FreeCurrencyApi para obter a chave de acesso.

### Instalação

```bash
# Clone o repositório
git clone [https://github.com/diogoferreira519/conversor-moeda.git](https://github.com/diogoferreira519/conversor-moeda.git)

# Entre na pasta
cd conversor-moeda

# Instale as dependências
npm install
```

### Configuração (.env)

Crie o arquivo `.env` na raiz do projeto baseando-se no exemplo:

```bash
cp .env.example .env
```

Edite o arquivo `.env` definindo as variáveis:

```ini
# Chave da API Externa (Pegue em freecurrencyapi.com)
API_KEY=sua_chave_da_freecurrencyapi

# Token secreto para autenticação na sua API (Você inventa essa senha)
API_CONVERSOR_KEY=sua_senha_secreta

# Porta do servidor
PORT=3003
```

### Execução

```bash
# Rodar em modo de desenvolvimento
npm run dev
```

---

## 📡 Endpoints

> **⚠️ Importante:** Todas as requisições necessitam do header `x-api-key` contendo a senha que você definiu no `.env` (`API_KEY`).

### Documentação (Insomnia/Postman)
O workspace completo com exemplos de requisições está disponível em:
`docs/conversor-moedas-collection.har`

Você pode importar este arquivo diretamente no Insomnia ou Postman para testar.

---

### `POST /converter`

Converte um valor monetário de uma moeda para outra.

**Body da Requisição (JSON):**

```json
{
  "de": "USD",
  "para": "BRL",
  "valor": 100
}
```

**Parâmetros:**
* `de`: Código da moeda de origem (3 letras, ex: USD, EUR).
* `para`: Código da moeda de destino (3 letras, ex: BRL).
* `valor`: Valor numérico a ser convertido (deve ser maior que zero).

**Exemplo de Resposta (Sucesso - 200 OK):**

```json
{
  "moedaOrigem": "USD",
  "moedaDestino": "BRL",
  "valor": 100,
  "valorConvertido": 510.25,
  "taxaCambio": 5.1025,
  "fonteDado": "cache"
}
```

**Legenda da Resposta:**
* `fonteDado`:
    * `"cache"`: A cotação foi recuperada da memória (rápido).
    * `"API"`: Uma nova requisição foi feita para a FreeCurrencyApi.