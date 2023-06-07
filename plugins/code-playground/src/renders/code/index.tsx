import styled from 'styled-components';
import MonacoEditor from '@monaco-editor/react';
import {
  useBlockContent,
  useBlockRefStore,
  useBlocksStore,
  useIsReadOnly,
} from '@morten-olsen/x-blocks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import theme from 'monaco-themes/themes/Dracula.json';
import { run } from '../../runtime';
import { Output } from './output';

type CodeContent = {
  language: string;
  code: string;
};

const resolveCheck = Symbol('asyncCheck');

const Wrapper = styled.div`
  min-height: 300px;
  position: relative;
`;

const EditorWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CodeRender: React.FC = () => {
  const [value, setValue] = useBlockContent<CodeContent>();
  const isReadOnly = useIsReadOnly();
  const ref = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<any>(null);
  const [editor, setEditor] = useState<any>(null);
  const blocksStore = useBlocksStore();
  const refStore = useBlockRefStore();
  useEffect(() => {
    if (!ref.current || !editor) {
      return;
    }
    const observer = new ResizeObserver(() => {
      editor.layout();
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [editor]);

  const runCode = useCallback(() => {
    if (!value.code) {
      return;
    }
    const blocks = {
      resolve: (fn: () => Promise<any>) => {
        (fn as any)._resolve = true;
        return fn;
      },
      getPlayground: async (id: string) => {
        const ref = refStore.get({
          id,
          plugin: 'code-playground',
        });
        const block = await blocksStore.get(ref);
        if (!block) {
          throw new Error(`Block with id ${id} not found`);
        }
        const result = run(block.content.code || '', {
          react: React,
          blocks,
        });
        return result;
      },
    };
    const output = run(value.code, {
      react: React,
      blocks,
    });
    setResult(() => output);
  }, [value.code, blocksStore, refStore]);

  return (
    <>
      <Wrapper ref={ref}>
        <EditorWrapper>
          <MonacoEditor
            value={value.code || ''}
            onChange={(nextValue) => setValue({ code: nextValue })}
            beforeMount={(monaco) => {
              monaco.editor.defineTheme('theme', theme as any);
              monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                {
                  target: monaco.languages.typescript.ScriptTarget.ESNext,
                  allowNonTsExtensions: true,
                  moduleResolution:
                    monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                  module: monaco.languages.typescript.ModuleKind.CommonJS,
                  noEmit: true,
                  jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
                  esModuleInterop: true,
                  typeRoots: ['node_modules/@types'],
                },
              );
            }}
            onMount={async (nextEditor) => {
              setEditor(nextEditor);
            }}
            theme="theme"
            language={value.language || 'typescript'}
            height="100%"
            width="100%"
            options={{
              readOnly: isReadOnly,
              minimap: {
                enabled: false,
              },
              fontFamily: 'Fira Code',
              scrollBeyondLastLine: false,
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden',
              },
              wordWrap: 'on',
              wrappingIndent: 'indent',
              tabSize: 2,
            }}
          />
        </EditorWrapper>
      </Wrapper>
      <button onClick={runCode}>Run</button>
      {result && <Output value={result} />}
    </>
  );
};

export { CodeRender, resolveCheck };
