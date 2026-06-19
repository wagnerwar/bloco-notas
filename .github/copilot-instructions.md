# CLAUDE.md

## Visão Geral do Projeto

**BlocoNotas** é um aplicativo móvel de anotações desenvolvido com React Native (v0.76.5) e TypeScript. Permite criar, listar e excluir notas organizadas por categorias, com persistência local via SQLite.

## Comandos Essenciais

```bash
# Iniciar Metro Bundler (porta customizada 9988)
npm start

# Executar no Android (porta customizada 9988)
npm run android

# Executar no iOS
npm run ios

# Rodar testes
npm test

# Lint
npm run lint
```

## Arquitetura do Projeto

```
src/
├── assets/          # SVGs e recursos estáticos
├── components/      # Componentes reutilizáveis
│   ├── BotaoCirculo.tsx
│   ├── CampoPesquisa.tsx
│   ├── HeaderCustomizado.tsx
│   ├── HeaderCustomizadoInterno.tsx
│   ├── Loading.tsx
│   ├── ModalAlerta.tsx
│   ├── ModalMensagem.tsx
│   ├── QuadroCategoria.tsx
│   └── QuadroNota.tsx
├── domain/          # Interfaces, tipos e constantes globais (enums.tsx)
├── helpers/         # Funções utilitárias (ex: exibirAviso)
├── main/            # Configuração de rotas (routes.tsx)
├── screens/         # Telas da aplicação
│   ├── CadastroCategoriaScreen.tsx
│   ├── CadastroScreen.tsx
│   ├── CategoriasScreen.tsx
│   ├── HomeScreen.tsx
│   └── OrientacoesScreen.tsx
└── services/        # Camada de acesso a dados (DadosService.tsx)
```

## Camada de Dados

- Banco de dados local: **SQLite** via `react-native-sqlite-storage`
- Singleton de conexão em `DadosService.tsx` (`getDB()`)
- Tabelas: `nota` e `categoria`
- Paginação: 10 itens por página (`Constantes.limite`)

## Navegação

- Drawer Navigator (`@react-navigation/drawer`) como navegação principal
- Stack Navigator (`@react-navigation/native-stack`) para fluxos de cadastro
- Telas visíveis no drawer: **Home (Notas)**, **Categorias** e **Orientações gerais**
- Telas ocultas no drawer: **Cadastro** e **CadastroCategoria**

## Domínio (`src/domain/enums.tsx`)

- `Nota`: `{ id, titulo, conteudo, id_categoria }`
- `Categoria`: `{ id, nome, conteudo, ativo }`
- `Tema`: paleta de cores do app (`corPrimaria: #B0C4DE`, `corSecundaria: #ADD8E6`, `corTexto: #708090`)
- `Constantes`: `{ ativo: 1, inativo: 0, limite: 10 }`

## Padrões e Convenções

- Idioma do código: **Português** (nomes de variáveis, funções, telas e componentes)
- Componentes exportados como **named exports**
- Formulários gerenciados com **react-hook-form**
- Notificações: `ToastAndroid` no Android, `Alert` no iOS — via `exibirAviso()` em `src/helpers/`
- Sem gerenciador de estado global (não usa Redux, Zustand nem Context API)
- Entry point da navegação: `App.tsx` → `RouterDraw` → `NavigationDrawer`

## Dependências Principais

| Pacote | Finalidade |
|---|---|
| `react-native-sqlite-storage` | Persistência local (SQLite) |
| `@react-navigation/drawer` | Navegação lateral (drawer) |
| `@react-navigation/native-stack` | Navegação em pilha |
| `react-hook-form` | Gerenciamento de formulários |
| `react-native-reanimated` | Animações |
| `react-native-gesture-handler` | Gestos e interações |
| `react-native-svg` + `react-native-svg-transformer` | Ícones SVG |
| `react-native-element-dropdown` | Componente de seleção (dropdown) |
| `react-native-toast-message` | Notificações toast |
| `react-native-bouncy-checkbox` | Checkbox animado |

## Componentes Notáveis

| Componente | Descrição |
|---|---|
| `ModalAlerta` | Modal genérico com suporte a `children`, botão de confirmação e cancelamento via props |
| `ModalMensagem` | Modal tipado para exibir mensagens com título opcional, botão confirmar e cancelar opcionais |
| `CampoPesquisa` | Campo de busca com botão de pesquisa, chama `FiltrarNotas` via prop |
| `QuadroNota` | Card de nota com ações de editar e excluir |
| `QuadroCategoria` | Card de categoria com ações de editar e excluir |
| `BotaoCirculo` | Botão flutuante circular (FAB) para ações primárias |
| `HeaderCustomizado` | Header com botão de menu do drawer e suporte a `children` |
| `HeaderCustomizadoInterno` | Header para telas internas (sem drawer) |
| `Loading` | Indicador de carregamento com texto |

## Observações para o Ambiente Windows

- Metro Bundler usa porta **9988** (não a padrão 8081) para evitar conflitos
- Ao fazer build Android, adicione exclusões no Windows Defender para:
  - `C:\Users\<user>\AppData\Local\Android\Sdk\`
  - Pasta raiz do projeto
  - `C:\Users\<user>\.gradle\`
- Habilitar suporte a caminhos longos (MAX_PATH) pode ser necessário para builds NDK:
  ```powershell
  # Executar como Administrador
  New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
    -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
  ```
