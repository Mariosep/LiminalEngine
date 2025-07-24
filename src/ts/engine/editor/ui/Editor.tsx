import React, { useEffect, useState } from "react";
import ViewportPanel from "./ViewportPanel";
import { Engine } from "../../core/Engine";
import { GameScene } from "../../../game/scenes/GameScene";
import { HierarchyPanel } from "./HierarchyPanel";
import { sceneStore } from "../state/SceneStore";
import InspectorPanel from "./InspectorPanel";
import "../../../../css/Editor.css";

export default function Editor() {

    const scene = sceneStore.scene;

    useEffect(() => {
        const engine: Engine = new Engine();

        const gameScene: GameScene = new GameScene();
        engine.setActiveScene(gameScene);

        engine.init();
        
    }, []);

    return (
        <div className="editor">
            <HierarchyPanel />
            <ViewportPanel />
            <InspectorPanel />
        </div>
    );
}