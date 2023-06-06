import React from 'react';
import { transpileModule, ModuleKind, JsxEmit } from 'typescript';

const run = (input: string, dependencies: Record<string, any>) => {
  const { outputText: script } = transpileModule(input, {
    compilerOptions: {
      module: ModuleKind.CommonJS,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      jsx: JsxEmit.React,
    },
  });
  const exports = {} as any;
  const module = { exports };
  const api = {
    module,
    exports,
    React,
    require: (name: string) => {
      const m = dependencies[name as keyof typeof dependencies];
      return m;
    },
  };

  const fn = new Function(...Object.keys(api), script);
  fn(...Object.values(api));
  return module.exports.default || module.exports;
};

export { run };
