# Yellot Cupons App

Aplicativo de cupons desenvolvido com React Native, Expo, TypeScript e NativeWind.

## Sobre o Projeto

Este aplicativo exibe uma lista de cupons obtidos de uma API, organizados por mês e com filtros de tempo. Os cupons são exibidos com informações como nome, data de validade e status (Ativo ou Expirado).

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
