export const initialFiles = {
  "/index.tsx": {
    code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import React from "react";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
  },
  "/App.tsx": {
    code: `import {useState} from 'react';
import { Box, Button } from '@kuma-ui/core';

export default function App() {
  const [flag, setFlag] = useState(false);

  return <Box fontFamily="sans-serif">
    <Box
      bg={flag ? "#d3eff8" : "#bcd3f4"}
      color="#555"
      borderRadius={8}
      p={8}
      m={8}
    >
      Hello, Kuma UI
    </Box>
    <Button type="button" onClick={() => setFlag(x => !x)}>Click me</Button>
  </Box>
}
`,
  },
  "/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="module" src="/index.tsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`,
  },
  "/package.json": {
    code: JSON.stringify(
      {
        scripts: {
          dev: "vite",
        },
        dependencies: {
          react: "18.2.0",
          "react-dom": "18.2.0",
        },
        devDependencies: {
          "@vitejs/plugin-react": "4.0.3",
          vite: "4.2.3",
          typescript: "5.1.6",
          "esbuild-wasm": "0.18.14",
          "@kuma-ui/vite": "1.0.3",
          "@kuma-ui/core": "1.1.0",
        },
      },
      null,
      2,
    ),
  },
  "/vite.config.ts": {
    code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import KumaUI from '@kuma-ui/vite';
import * as fs from 'node:fs';

function compiledFileWriterPlugin() {
  return {
    name: 'compiled-file-writer-plugin',
    enforce: 'pre',
    transform(src, id) {
      if (id === '/nodebox/App.tsx') {
        fs.writeFileSync('/nodebox/compiled.tsx', src);
      }
    },
  }
}
export default defineConfig({
  plugins: [KumaUI(), compiledFileWriterPlugin(), react()],
})
`,
  },
};
