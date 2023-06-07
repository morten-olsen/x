import { Extractor } from './extractor';
import { languages } from 'monaco-editor';

class TypingsStore {
  #extractor: Extractor;
  #files: Record<string, string> = {};
  #editors: (typeof languages)[] = [];

  constructor() {
    this.#extractor = new Extractor(this.#getFile);
  }

  #getFile = async (path: string) => {
    if (this.#files[path]) {
      return this.#files[path];
    }
    const response = await fetch(`https://unpkg.com/${path}`);
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
    const source = await response.text();
    this.#files[path] = source;
    return source;
  };

  public attachEditor = (editor: typeof languages) => {
    this.#editors = [...new Set([...this.#editors, editor])];
    for (let [path, code] of Object.entries(this.#files)) {
      console.log(`file:///node_modules/${path}`);
      editor.typescript.typescriptDefaults.addExtraLib(
        code,
        `file:///node_modules/${path}`,
      );
    }
  };

  public add = async (path: string) => {
    await this.#extractor.resolveImports(path);
    for (let editor of this.#editors) {
      this.attachEditor(editor);
    }
  };
}

export { TypingsStore };
