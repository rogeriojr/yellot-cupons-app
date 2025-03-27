# Yellot Cupons App

Aplicativo de cupons desenvolvido com React Native, Expo, TypeScript e NativeWind.

## Sobre o Projeto

Este aplicativo exibe uma lista de cupons obtidos de uma API, organizados por mês e com filtros de tempo. Os cupons são exibidos com informações como nome, data de validade e status (Ativo ou Expirado).

## Screeshots
![image](https://github.com/user-attachments/assets/e5bdb80f-aaac-4a30-ba56-59ab74e6ac0f)

![image](https://github.com/user-attachments/assets/b34e1a84-da8e-475f-a57a-45ad19629910)

![image](https://github.com/user-attachments/assets/eef988a3-2204-451e-8063-b8bb89b5a2b2)


## Requisitos

- Node.js (versão 16 ou superior)
- Expo CLI
- Yarn ou NPM

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/yellot-cupons-app.git

# Entre no diretório do projeto
cd yellot-cupons-app

# Instale as dependências
yarn install
# ou
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o projeto
yarn start
# ou
npm start
```

## Tecnologias Utilizadas

- React Native
- Expo (SDK 51+)
- TypeScript
- NativeWind (TailwindCSS para React Native)
- Zustand (Gerenciamento de estado)
- Axios (Requisições HTTP)

## Funcionalidades

- Exibição de cupons agrupados por mês
- Filtro de cupons por período (7, 15, 30 e 90 dias)
- Exibição da quantidade total de cupons e cupons disponíveis
- Menu de navegação inferior

## Estrutura do Projeto

```
src/
  ├── assets/         # Imagens e recursos estáticos
  ├── components/     # Componentes reutilizáveis
  ├── hooks/          # Hooks personalizados
  ├── screens/        # Telas do aplicativo
  ├── services/       # Serviços de API
  ├── store/          # Gerenciamento de estado (Zustand)
  ├── types/          # Definições de tipos TypeScript
  └── utils/          # Funções utilitárias
```

## Licença

MIT
# yellot-cupons-app
