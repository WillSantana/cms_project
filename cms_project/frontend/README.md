# Processos e Concursos - Prefeitura de Ribeirão das Neves

Este projeto é uma aplicação React que simula a página de processos e concursos da Prefeitura de Ribeirão das Neves, mantendo a identidade visual oficial (cores azul marinho e turquesa/ciano) e oferecendo funcionalidades de busca e filtragem de editais.

## 🎨 Características

- **Identidade Visual**: Replicação fiel das cores e layout da Prefeitura de Ribeirão das Neves
- **Componentes Reutilizáveis**: Header, Footer, Cards de Processos, Filtros e Paginação
- **Busca Inteligente**: Busca por título, cargo ou número do edital
- **Filtros por Status**: Inscrições Abertas, Em Andamento, Encerrado, Homologado
- **Paginação**: Navegação eficiente entre múltiplos editais
- **Responsivo**: Layout adaptável para desktop, tablet e mobile
- **Dockerizado**: Pronto para deploy com Docker e Docker Compose

## 🚀 Tecnologias

- **React 18** com Vite
- **Tailwind CSS** para estilização
- **shadcn/ui** para componentes de UI
- **Lucide Icons** para ícones
- **React Router DOM** para roteamento
- **Docker** e **Docker Compose** para conteinerização

## 📦 Estrutura do Projeto

```
processos-concursos/
├── src/
│   ├── assets/          # Imagens e recursos estáticos
│   │   └── brasao.png   # Brasão da prefeitura
│   ├── components/      # Componentes React
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── FiltrosProcessos.jsx
│   │   ├── CardProcesso.jsx
│   │   ├── ListaProcessos.jsx
│   │   └── Paginacao.jsx
│   ├── data/            # Dados mockados
│   │   └── processos.json
│   ├── pages/           # Páginas da aplicação
│   │   ├── Home.jsx
│   │   └── ProcessoDetalhes.jsx
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos globais
│   └── main.jsx         # Ponto de entrada
├── Dockerfile           # Configuração Docker
├── docker-compose.yml   # Orquestração Docker
└── package.json         # Dependências do projeto
```

## 🛠️ Instalação e Execução

### Opção 1: Desenvolvimento Local

1. **Instalar dependências:**
   ```bash
   cd processos-concursos
   pnpm install
   ```

2. **Iniciar servidor de desenvolvimento:**
   ```bash
   pnpm run dev
   ```

3. **Acessar a aplicação:**
   Abra o navegador em `http://localhost:5173`

### Opção 2: Docker (Recomendado para Produção)

1. **Build e execução com Docker Compose:**
   ```bash
   cd processos-concursos
   docker-compose up --build
   ```

2. **Acessar a aplicação:**
   Abra o navegador em `http://localhost:3000`

3. **Parar os containers:**
   ```bash
   docker-compose down
   ```

### Opção 3: Docker Manual

1. **Build da imagem:**
   ```bash
   docker build -t processos-concursos .
   ```

2. **Executar o container:**
   ```bash
   docker run -p 3000:80 processos-concursos
   ```

## 📝 Mock Data

O arquivo `src/data/processos.json` contém 15 registros de exemplo com os seguintes campos:

- `id`: Identificador único
- `titulo`: Título do processo/concurso
- `cargo`: Cargo ou função
- `orgao`: Órgão/Secretaria responsável
- `numEdital`: Número do edital
- `status`: Status atual (Aberto, Em Andamento, Encerrado, Homologado)
- `dataLimite`: Data limite para inscrições

## 🎯 Funcionalidades

### Página Principal
- Lista de todos os editais e processos seletivos
- Busca por texto (título, cargo, edital)
- Filtros por status
- Paginação (6 itens por página)
- Cards interativos com hover effects

### Página de Detalhes
- Informações completas do processo
- Botões para download de documentos
- Botão de inscrição (para processos abertos)
- Navegação de volta para a lista

## 🎨 Paleta de Cores

A aplicação utiliza a paleta oficial da Prefeitura de Ribeirão das Neves:

- **Azul Marinho (Primary)**: `oklch(0.25 0.15 240)`
- **Turquesa/Ciano (Accent)**: `oklch(0.65 0.18 200)`
- **Branco**: Backgrounds e textos
- **Cinza**: Bordas e elementos secundários

## 🔧 Customização

Para personalizar o projeto:

1. **Cores**: Edite as variáveis CSS em `src/App.css`
2. **Mock Data**: Modifique `src/data/processos.json`
3. **Componentes**: Ajuste os componentes em `src/components/`
4. **Rotas**: Configure novas rotas em `src/App.jsx`

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.

## 👨‍💻 Autor

Desenvolvido seguindo as especificações do "Super-Prompt Revisado" para a Prefeitura de Ribeirão das Neves.

