import React from "react";
import SceneHierarchy from "./SceneHierarchy";
import { GameScene } from "../../../game/scenes/GameScene";

const SceneHierarchyExample: React.FC = () => {
  // Create a game scene instance
  const gameScene = new GameScene();

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Scene Hierarchy Example</h2>
      <p>This component shows the hierarchy of entities in the game scene:</p>

      <SceneHierarchy scene={gameScene} />

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        <h4>Features:</h4>
        <ul>
          <li>Expandable tree structure for entities</li>
          <li>Shows entity names and IDs</li>
          <li>Visual indication of active/inactive entities</li>
          <li>Real-time updates when entities are added/removed</li>
          <li>Component display (when implemented)</li>
        </ul>
      </div>
    </div>
  );
};

export default SceneHierarchyExample;
