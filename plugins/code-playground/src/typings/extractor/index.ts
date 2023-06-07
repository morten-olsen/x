import * as ts from 'typescript';
import { resolve, join, dirname } from 'path';

class Extractor {
  #getFile: (path: string) => Promise<string>;

  constructor(getFile: (path: string) => Promise<string>) {
    this.#getFile = getFile;
  }

  #getImports = async (path: string) => {
    try {
      const source = await this.#getFile(path);
      const sourceFile = ts.createSourceFile(
        path,
        source,
        ts.ScriptTarget.Latest,
        true,
      );
      const imports: string[] = [];
      ts.forEachChild(sourceFile, (node) => {
        if (ts.isImportDeclaration(node)) {
          const location = node.moduleSpecifier.getText(sourceFile);
          const inner = location.slice(1, -1);
          if (inner.startsWith('.')) {
            imports.push(resolve(dirname(path), inner));
          } else {
            imports.push(inner);
          }
        }
      });
      const matches = source.matchAll(
        /\/\/\/\s*<reference\s+path="([^"]+)"\s*\/>/g,
      );
      for (const match of matches) {
        const inner = match[1];
        imports.push(join(dirname(path), inner));
      }
      return imports;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  public resolveImports = async (path: string, pkgs: string[] = []) => {
    try {
      const parts = path.split('/');
      const packageName = parts[0].startsWith('@')
        ? parts.splice(0, 2).join('/')
        : parts.pop();
      const packagePath = `${packageName}/package.json`;
      const pkg = JSON.parse(await this.#getFile(packagePath));
      const typingsDeps = Object.keys(pkg.dependencies || {}).filter(
        (dep: string) => dep.startsWith('@types/') && !pkgs.includes(dep),
      );
      const file = parts.length
        ? parts.join('/')
        : pkg.typings || pkg.types || 'index.d.ts';
      const targetPath = `${packageName}/${file}`;

      const imports = await this.#getImports(targetPath);
      const children: string[][] = await Promise.all(
        [...imports, ...typingsDeps].map((path) =>
          this.resolveImports(path, [...pkgs, ...typingsDeps]),
        ),
      );
      const all = [imports, children.flat()].flat();
      return all;
    } catch (e) {
      return [];
    }
  };
}

export { Extractor };
