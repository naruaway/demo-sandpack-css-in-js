import * as React from "react";
import { createRoot } from "react-dom/client";
import { Box } from "@kuma-ui/core";
import {
  SandpackCodeEditor,
  SandpackLayout,
  CodeEditor,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from "@codesandbox/sandpack-react";

const root = createRoot(document.getElementById("main")!);

import { initialFiles } from "./initial-files";

function App() {
  return (
    <SandpackProvider
      files={initialFiles}
      customSetup={{
        environment: "node",
      }}
    >
      <MyApp />
    </SandpackProvider>
  );
}

function MyApp() {
  return (
    <>
      <SandpackLayout>
        <SandpackCodeEditor showTabs={false} />
        <SandpackPreview
          showRefreshButton={false}
          showNavigator={false}
          showOpenInCodeSandbox={false}
          showOpenNewtab={false}
          showSandpackErrorOverlay={false}
          showRestartButton={false}
        />
      </SandpackLayout>
      <Box height={8} />
      <CompiledCodePreview />
    </>
  );
}

/**
 * From https://github.com/codesandbox/sandpack/blob/36560cb4f0fc8f5f8b18f5a3d3952799690eba77/sandpack-react/src/components/FileExplorer/index.tsx#L29-L67
 */
const useSandpackFiles = () => {
  const {
    sandpack: { status, updateFile, deleteFile, files },
    listen,
  } = useSandpack();

  React.useEffect(
    function watchFSFilesChanges() {
      if (status !== "running") return;

      const unsubscribe = listen((message) => {
        if (message.type === "fs/change") {
          updateFile(message.path, message.content, false);
        }

        if (message.type === "fs/remove") {
          deleteFile(message.path, false);
        }
      });

      return unsubscribe;
    },
    [status],
  );
  return files;
};

function CompiledCodePreview() {
  const files = useSandpackFiles();
  const code = files["/compiled.tsx"]?.code;
  return (
    <Box border="1px solid #efefef" borderRadius="3px">
      <CodeEditor
        code={code ?? "// compiled code will be shown here.\nNow loading..."}
        initMode="lazy"
      />
    </Box>
  );
}

root.render(<App />);
