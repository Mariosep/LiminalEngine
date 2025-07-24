import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../css/style.css";
import Editor from "../engine/editor/ui/Editor";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <Editor />
    {/* <SceneHierarchy scene={gameScene} />
    <InspectorPanel />
    <HierarchyPanel scene={gameScene} /> */}
  </StrictMode>
);

