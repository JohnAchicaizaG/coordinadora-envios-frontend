# React + TypeScript + Vite



src/
├── app/                  # Config global: store, router, theme, providers
│   ├── hooks.ts
│   ├── store.ts
│   ├── routes.tsx
│   └── layout/           # Layouts base de la app
│       ├── MainLayout.tsx
│       └── AuthLayout.tsx
│
├── features/             # Cada feature funcional del sistema
│   ├── auth/
│   │   ├── components/   # Componentes como LoginForm, UserCard
│   │   ├── pages/        # LoginPage, RegisterPage, etc.
│   │   ├── hooks/        # useAuth(), useLogin()
│   │   ├── authSlice.ts
│   │   ├── api.ts        # Llamadas HTTP (ej: login, register)
│   │   ├── types.ts
│   │   ├── index.ts
│   │   └── __tests__/    # Tests unitarios por feature
│   │       └── LoginForm.test.tsx
│
│   ├── tasks/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── taskSlice.ts
│   │   ├── api.ts
│   │   ├── types.ts
│   │   ├── index.ts
│   │   └── __tests__/
│
├── shared/               # Reutilizable global: botones, modales, etc.
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── constants.ts
│   └── types.ts
│
├── assets/               # Imágenes, íconos, fuentes, logos
├── theme/                # Configuración de MUI o styled-system
│   ├── theme.ts
│   └── index.ts
├── tests/                # Helpers globales para testing (mocks, renderWithProviders)
├── index.tsx             # Entry point
└── main.tsx              # Render principal con todos los providers

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```


