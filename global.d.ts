// Extensões para testes
declare var jest: typeof import('jest') & {
  mock: (moduleName: string, factory?: () => unknown) => jest.Mock;
  fn: <T extends (...args: any[]) => any>(implementation?: T) => jest.Mock<ReturnType<T>, Parameters<T>>;
  clearAllMocks: () => void;
  requireActual: (moduleName: string) => any;
};
declare var describe: jest.Describe;
declare var it: jest.It;
declare var test: jest.It;
declare var expect: jest.Expect;
declare var beforeEach: jest.BeforeEach;
declare var afterEach: jest.AfterEach;
declare var beforeAll: jest.BeforeAll;
declare var afterAll: jest.AfterAll;

// Tipagem para @testing-library/react-hooks
declare module '@testing-library/react-hooks' {
  import { RenderHookResult } from '@testing-library/react-hooks/lib/types';
  export * from '@testing-library/react-hooks/native';

  export function renderHook<P, R>(
    callback: (props: P) => R,
    options?: {
      initialProps?: P;
      wrapper?: React.ComponentType;
    }
  ): RenderHookResult<P, R>;
}

// Extensões para JSX
declare namespace JSX {
  interface IntrinsicElements {
    'mock-coupon-card': any;
    'mock-theme-provider': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}

// Extensões para módulos comuns
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}