import React from "react";
import { observer } from "mobx-react-lite";
import SceneHierarchy from "./SceneHierarchy";
import InspectorPanel from "./InspectorPanel";
import { Scene } from "../../core/scene/Scene";

interface InspectorExampleProps {
  scene: Scene;
}

const InspectorExample: React.FC<InspectorExampleProps> = observer(
  ({ scene }) => {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Left Panel - Scene Hierarchy */}
        <div
          style={{
            width: "300px",
            padding: "20px",
            backgroundColor: "white",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <SceneHierarchy scene={scene} />
        </div>

        {/* Center - 3D Viewport (placeholder) */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#2c3e50",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "18px",
          }}
        >
          3D Viewport
          <div
            style={{
              fontSize: "14px",
              marginTop: "10px",
              opacity: 0.7,
            }}
          >
            Your Three.js renderer would go here
          </div>
        </div>

        {/* Right Panel - Inspector (floating) */}
        <InspectorPanel />
      </div>
    );
  }
);

export default InspectorExample;
