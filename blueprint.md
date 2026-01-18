
# Visão Geral do Projeto

Este é um site projetado para a promoção e exibição de produtos, com um design inspirado no AliExpress. O objetivo é criar uma experiência de usuário familiar, com uma interface rica em funcionalidades, que permita aos usuários navegar e pesquisar produtos de forma eficaz. O site será responsivo, garantindo que funcione perfeitamente em dispositivos móveis e desktops.

## Funcionalidades e Design

### Design (Tema AliExpress)

*   **Layout Funcional:** O design priorizará a funcionalidade, com uma barra de pesquisa proeminente, navegação clara e uma grade de produtos densa, semelhante ao AliExpress.
*   **Tipografia Clara:** Serão usadas fontes sans-serif modernas e legíveis para garantir que as informações do produto sejam fáceis de ler.
*   **Esquema de Cores do AliExpress:** A paleta de cores será dominada por tons de vermelho, laranja e branco para refletir a marca do AliExpress.
*   **Efeitos de Interação:** Elementos interativos como botões e links terão feedback visual claro para melhorar a usabilidade.
*   **Iconografia:** Ícones serão usados para navegação e ações comuns, como busca, carrinho de compras e perfil de usuário.

### Funcionalidades

*   **Página de Perfil de Usuário:** Uma página onde os usuários podem cadastrar e gerenciar suas informações pessoais, como nome, e-mail e endereço.
*   **Barra de Pesquisa Funcional:** Um campo de busca proeminente no cabeçalho que filtra os produtos na página em tempo real.
*   **Página de Detalhes do Produto:** Uma página dedicada para cada produto, mostrando informações detalhadas.
*   **Galeria de Imagens do Produto:** Cada produto pode ter até 3 imagens, com miniaturas clicáveis.
*   **Carrinho de Compras Funcional:** Um carrinho de compras que permite aos usuários adicionar e remover produtos, com os dados persistidos no `localStorage`.
*   **Animação ao Adicionar ao Carrinho:** Uma animação exibe a imagem do produto voando em direção ao ícone do carrinho quando é adicionado.
*   **Mini-Carrinho no Cabeçalho:** Um dropdown que aparece ao passar o mouse sobre o ícone do carrinho, mostrando um resumo dos produtos adicionados.
*   **Componentes Web:** O site usará Web Components para criar elementos de interface de usuário reutilizáveis e encapsulados, como cartões de produtos.
*   **Design Responsivo:** O layout se adaptará a diferentes tamanhos de tela.
*   **Módulos ES:** O código JavaScript será organizado usando módulos ES para melhor manutenibilidade.
*   **Localização:** Todo o site será traduzido para o português.
*   **Backend com Supabase:** O Supabase será usado para o backend, incluindo o banco de dados para produtos e, futuramente, autenticação.

## Plano de Implementação Atual: Integração com Supabase

### Passo 1: Configuração do Supabase

*   [ ] Adicionar o SDK JavaScript do Supabase aos arquivos HTML.
*   [ ] Criar um arquivo `supabase.js` para inicializar o cliente Supabase.

### Passo 2: Migração de Dados de Produtos

*   [ ] Fornecer o script SQL para criar a tabela `products` e inserir os dados.
*   [ ] Refatorar `main.js` para buscar e exibir os produtos do Supabase.
*   [ ] Refatorar a geração de links em `main.js` para usar o ID do produto.
*   [ ] Refatorar `product.js` para buscar os detalhes de um único produto do Supabase usando o ID.

### Passo 3: (Futuro) Autenticação de Usuários

*   [ ] Implementar o Supabase Auth para registro e login de usuários.
*   [ ] Migrar a funcionalidade da página de perfil para usar uma tabela `profiles` no Supabase.
