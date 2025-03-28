# Yellot Cupons App

Aplicativo de cupons desenvolvido com React Native, Expo, TypeScript e NativeWind.

## Sobre o Projeto

Este aplicativo exibe uma lista de cupons obtidos de uma API, organizados por mês e com filtros de tempo. Os cupons são exibidos com informações como nome, data de validade e status (Ativo ou Expirado).

## Link do APK (Android)

https://drive.google.com/file/d/1nBMw42yoLdXP3P-JuRq0A_ozv8agK21j/view?usp=sharing

## 📱 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <img src="https://github.com/user-attachments/assets/4aa8c735-63eb-47e0-bf57-8d12dbb716e3" alt="Tela 1" width="100%"/>
        <p>Tela de Login</p>
      </td>
      <td align="center" width="50%">
        <img src="https://github.com/user-attachments/assets/09f45525-b832-4b5d-9e67-3ff419343e5a" alt="Tela 2" width="100%"/>
        <p>Tela de Registro</p>
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <img src="https://github.com/user-attachments/assets/ccf082dc-a4ef-4c97-ae2f-1b9e99e36d7a" alt="Tela 3" width="100%"/>
        <p>Recuperação de Senha</p>
      </td>
      <td align="center" width="50%">
        <img src="https://github.com/user-attachments/assets/aa991dc5-d9fc-4900-92b3-8bde6a3ac50a" alt="Tela 4" width="100%"/>
        <p>Pesquisa</p>
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <img src="https://github.com/user-attachments/assets/3b99b73b-1af9-4ed4-93a9-cb1e43664778" alt="Tela 5" width="100%"/>
        <p>Filtros</p>
      </td>
      <td align="center" width="50%">
        <img src="https://github.com/user-attachments/assets/b34e1a84-da8e-475f-a57a-45ad19629910" alt="Tela 6" width="100%"/>
        <p>Tema Claro</p>
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <img src="https://github.com/user-attachments/assets/df1bd0d0-54c6-413b-ae3b-edf13bee5aab" alt="Tela 7" width="100%"/>
        <p>Histórico</p>
      </td>
      <td align="center" width="50%">
        <img src="https://github.com/user-attachments/assets/2cb1e1cb-2a39-4d8a-af99-b0d762bca11a" alt="Tela 8" width="100%"/>
        <p>Carteira</p>
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <img src="https://github.com/user-attachments/assets/eef988a3-2204-451e-8063-b8bb89b5a2b2" alt="Tela 9" width="100%"/>
        <p>Termos e Condições</p>
      </td>
      <td align="center" width="50%">
        <img src="https://github.com/user-attachments/assets/98db33e6-4ad0-40eb-8836-457fb7d11e7b" alt="Tela 10" width="100%"/>
        <p>Perfil do usuário</p>
      </td>
    </tr>
  </table>
</div>

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

- **React Native**: Framework para desenvolvimento de aplicativos móveis
- **Expo (SDK 51+)**: Plataforma para desenvolvimento React Native
- **TypeScript**: Superset tipado de JavaScript
- **NativeWind**: Implementação do TailwindCSS para React Native
- **Zustand**: Gerenciamento de estado global
- **React Navigation**: Navegação entre telas
- **Axios**: Cliente HTTP para requisições à API
- **Date-fns**: Manipulação de datas
- **Jest**: Framework de testes
- **React Native Reanimated**: Animações fluidas
- **React Native Gesture Handler**: Gestos e interações

## Arquitetura do Projeto

O projeto segue os princípios SOLID e utiliza uma arquitetura baseada em componentes, com separação clara de responsabilidades:

### Estrutura de Diretórios

```
src/
  ├── components/       # Componentes reutilizáveis da UI
  │   ├── CouponCard.tsx
  │   ├── CouponHeader.tsx
  │   ├── CouponMonthSection.tsx
  │   ├── FilterBar.tsx
  │   ├── ThemeToggle.tsx
  │   └── UserIcon.tsx
  ├── contexts/         # Contextos React (ThemeContext, AuthContext)
  │   ├── AuthContext.tsx
  │   └── ThemeContext.tsx
  ├── navigation/       # Configuração de navegação
  │   └── AppNavigator.tsx
  ├── screens/          # Telas da aplicação
  │   ├── auth/         # Telas de autenticação
  │   │   ├── LoginScreen.tsx
  │   │   ├── RegisterScreen.tsx
  │   │   ├── ForgotPasswordScreen.tsx
  │   │   ├── ResetPasswordScreen.tsx
  │   │   └── TermsScreen.tsx
  │   ├── CouponDetailScreen.tsx
  │   ├── CouponsScreen.tsx
  │   ├── HistoryScreen.tsx
  │   ├── ProfileScreen.tsx
  │   ├── SearchScreen.tsx
  │   └── WalletScreen.tsx
  ├── services/         # Serviços e integrações
  │   ├── api.ts        # Configuração do Axios
  │   ├── interfaces/   # Interfaces para serviços (SOLID)
  │   └── implementations/ # Implementações concretas
  ├── store/            # Gerenciamento de estado global (Zustand)
  │   ├── useAuthStore.ts
  │   ├── useCouponStore.ts
  │   └── useCouponHistoryStore.ts
  ├── types/            # Definições de tipos TypeScript
  │   ├── auth.ts
  │   ├── coupon.ts
  │   └── navigation.ts
  └── utils/            # Funções utilitárias
      ├── authUtils.ts
      └── couponUtils.ts
```

## Fluxo de Autenticação

O aplicativo utiliza um sistema de autenticação mockado para fins de demonstração:

1. **Login**: Utiliza credenciais hardcoded (email: `user@yellot.mob`, senha: `123456789`)
2. **Registro**: Simula o cadastro de um novo usuário
3. **Recuperação de Senha**: Simula o envio de email para recuperação

O fluxo de autenticação é gerenciado pelo `AuthContext` e `useAuthStore`, que seguem o padrão de gerenciamento de estado com Zustand.

### Armazenamento Local

Os dados de autenticação são persistidos usando `AsyncStorage`, permitindo que o usuário permaneça logado entre sessões.

## Gerenciamento de Estado

O aplicativo utiliza Zustand para gerenciamento de estado global, com stores separadas para diferentes domínios:

- **useAuthStore**: Gerencia estado de autenticação
- **useCouponStore**: Gerencia os cupons e filtros
- **useCouponHistoryStore**: Gerencia o histórico de cupons utilizados

## Tema e Estilização

O aplicativo suporta temas claro e escuro, implementados através do `ThemeContext`. A estilização é feita com NativeWind (TailwindCSS para React Native).

## Testes

O projeto inclui testes unitários e de componentes utilizando Jest e React Testing Library. A estrutura de testes foi projetada para garantir a qualidade e confiabilidade do código.

### Executando os Testes

```bash
# Executar todos os testes
yarn test

# Executar testes com watch mode (desenvolvimento)
yarn test:watch

# Executar testes com cobertura
yarn test:coverage

# Executar apenas testes de componentes
yarn test:components

# Executar apenas testes de contextos
yarn test:contexts

# Executar apenas testes de stores
yarn test:store

# Executar testes em ambiente de CI
yarn test:ci
```

### Estrutura de Testes

Os testes estão organizados em:

- **Testes de Componentes**: `__tests__/components/` - Testes para componentes de UI
- **Testes de Contextos**: `__tests__/contexts/` - Testes para contextos React
- **Testes de Stores**: `__tests__/store/` - Testes para stores Zustand

### Configuração de Testes

A configuração dos testes está definida nos seguintes arquivos:

- `jest.config.js` - Configuração principal do Jest
- `jest-setup.js` - Configuração de setup para os testes
- `setupTests.js` - Configurações adicionais e mocks globais

### Mocks

O projeto utiliza mocks para:

- AsyncStorage
- Animações do React Native
- SVG
- Requisições de API (fetch)

## Funcionalidades

- Exibição de cupons agrupados por mês
- Filtro de cupons por período (7, 15, 30 e 90 dias)
- Exibição da quantidade total de cupons e cupons disponíveis
- Tema claro/escuro
- Autenticação (mockada)
- Histórico de cupons
- Perfil de usuário
- Carteira virtual
- Pesquisa de cupons

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

MIT

## Direitos Autorais

Desenvolvido por [rogeriojr](https://github.com/rogeriojr).

© 2024 Rogério Jr. Todos os direitos reservados.
