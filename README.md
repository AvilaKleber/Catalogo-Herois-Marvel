# Catálogo de Heróis da Marvel

Este projeto é um catálogo interativo de heróis da Marvel, desenvolvido em **React**, que consome a [API da Marvel](https://developer.marvel.com/). Ele permite buscar heróis, exibir informações detalhadas e gerenciar uma lista de favoritos.

---

## Funcionalidades

### **1. Listagem de Heróis**
- Exibe uma lista de heróis da Marvel, consumindo dados diretamente da API.
- Cada herói é exibido em um card contendo:
  - Nome do herói.
  - Imagem.
  - Link para abrir um modal com a descrição detalhada.

### **2. Busca de Heróis**
- Permite buscar heróis pelo nome ou parte do nome.
- Busca refinada com atualização em tempo real.
- Ao pressionar a tecla `Enter`, realiza a busca diretamente.

### **3. Favoritar Heróis**
- Adicione heróis aos favoritos clicando no ícone de estrela no card.
- Cards favoritos apresentam:
  - Ícone de estrela preenchido em **amarelo**.
  - Borda amarela ao redor do card.
- Mensagem exibida ao adicionar um herói aos favoritos.

### **4. Evitar Favoritar Duplicados**
- Se um herói já estiver nos favoritos, clicar no ícone exibe apenas a mensagem: `"Herói já está nos favoritos!"`.

### **5. Modal de Descrição**
- Ao clicar no link "Ver Descrição do Herói", um modal é aberto com detalhes adicionais sobre o herói, contendo:
  - Título com o nome do herói.
  - Texto da descrição.
  - Botão para fechar o modal.

### **6. Página de Favoritos**
- Página exclusiva para exibir todos os heróis adicionados aos favoritos.
- Layout semelhante à listagem principal.
- Inclui:
  - Botão de "Voltar" no canto superior esquerdo para retornar à listagem principal.
  - Cards com borda amarela e ícones diferenciados.
- Permite remover heróis dos favoritos ao clicar novamente na estrela.

### **7. Paginação**
- Paginação automática na listagem principal.
- Controle por botões "Anterior" e "Próxima".
- Preserva filtros aplicados na busca ao navegar entre páginas.

### **8. Design Responsivo**
- Layout responsivo, adaptado para dispositivos de diferentes tamanhos.
- Gradiente de fundo em tons de cinza escuro.
- Ícones e elementos otimizados para responsividade.

---

## Pré-requisitos

- **Node.js** v14 ou superior.
- Gerenciador de pacotes: **npm** ou **yarn**.

---

## Configuração do Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/usuario/catalogo-herois-marvel.git
   cd catalogo-herois-marvel
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```
   ou, se estiver usando **yarn**:
   ```bash
   yarn
   ```

3. **Configuração das chaves da API**:
   A API da Marvel exige autenticação. Para isso:
   - Acesse o arquivo `src/services/api.js`.
   - Substitua as variáveis `publicKey` e `privateKey` pelas chaves da sua conta da [Marvel Developer Portal](https://developer.marvel.com/):
     ```javascript
     const publicKey = 'SUA_CHAVE_PUBLICA_AQUI';
     const privateKey = 'SUA_CHAVE_PRIVADA_AQUI';
     ```

4. **Execute o projeto utilizando Vite**:
   O projeto utiliza o **Vite** como ferramenta de bundling e servidor de desenvolvimento. Vite oferece um ambiente de desenvolvimento mais rápido e moderno, adequado para aplicações React.

   - Para iniciar o servidor de desenvolvimento, execute o comando:
     ```bash
     npm run dev
     ```
     ou, se estiver usando **yarn**:
     ```bash
     yarn dev
     ```
   - O Vite irá iniciar um servidor local e exibir a URL para acessar o projeto. Geralmente, será algo como `http://localhost:5173`. Copie e cole esse link no navegador para visualizar a aplicação.

   - Caso deseje construir uma versão otimizada para produção, utilize o comando:
     ```bash
     npm run build
     ```
     ou, com **yarn**:
     ```bash
     yarn build
     ```
   - Após construir para produção, você pode servir o conteúdo estático usando:
     ```bash
     npm run serve
     ```
     ou, com **yarn**:
     ```bash
     yarn serve
     ```

---

## Tecnologias Utilizadas

- **React**: Biblioteca para criação de interfaces de usuário.
- **Styled Components**: Para estilização dos componentes.
- **React Router**: Gerenciamento de rotas.
- **Marvel API**: Fonte de dados dos heróis.
- **Axios**: Para consumo da API.

---

## Estrutura de Pastas

```
src/
├── components/        # Componentes reutilizáveis (HeroCard, Filter, etc.)
├── context/           # Context API para gerenciamento de favoritos
├── pages/             # Páginas do aplicativo (Home, FavoritesPage)
├── services/          # Configuração de chamadas à API (Marvel API)
├── App.jsx            # Componente principal
├── index.jsx          # Ponto de entrada da aplicação
```

---

## Melhorias Futuras

- Implementar filtros adicionais (como gênero, séries ou eventos relacionados).
- Adicionar animações nas transições de páginas e modais.
- Criar um **modo escuro** para o aplicativo.
- Permitir personalização da lista de favoritos.

---
