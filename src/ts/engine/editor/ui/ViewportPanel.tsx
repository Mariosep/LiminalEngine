import React from "react";
import "../../../../css/EditorPanel.css";

export default function ViewportPanel() {

    return (
        <div className="editor-panel viewport-panel">
            <canvas id="viewport-canvas"></canvas>
        </div>
    );
}