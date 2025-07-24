import React, { useState, useEffect } from "react";
import { Entity } from "../../core/ecs/Entity";
import { Scene } from "../../core/scene/Scene";
import "../../../../css/HierarchyPanel.css";
import "../../../../css/EditorPanel.css";
import { selectionStore } from "../state/SelectionStore";
import { observer } from "mobx-react-lite";
import { sceneStore } from "../state/SceneStore";

interface HierarchyPanelProps {
    scene: Scene | null;
}

interface HierarchyNodeProps {
    entity: Entity;
}

export const HierarchyPanel = observer(() => {
    return (
        <div className="hierarchy-panel">
            <HierarchyTree scene={sceneStore.scene} />
        </div>
    );
});

function HierarchyTree({ scene }: HierarchyPanelProps) {
    return (
        <div className="hierarchy-tree">
            {scene?.entities.map((entity) => (
                <HierarchyNode key={entity.id} entity={entity} />
            ))}
        </div>
    );
}

const HierarchyNode = observer(({ entity }: HierarchyNodeProps) => {
    const [expanded, setExpanded] = useState(false);

    const hasChildren = entity.transform.children.length > 0;
    const isSelected = selectionStore.selected.includes(entity);

    function onNodeClick(e: React.MouseEvent) {
        e.stopPropagation();

        // Toggle selection with Ctrl/Cmd key for multi-select
        if (e.ctrlKey || e.metaKey) {
            if (selectionStore.selected.includes(entity)) {
                selectionStore.deselect(entity);
            } else {
                selectionStore.select(entity);
            }
        } else {
            // Single select
            selectionStore.clear();
            selectionStore.select(entity);
        }
    }

    return (
        <div className={`hierarchy-node ${isSelected ? "selected" : ""}`} onClick={onNodeClick}>
            {hasChildren && <span onClick={() => setExpanded(!expanded)}>{expanded ? "▼" : "▶"}</span>}
            <span>{entity.name}</span>
        </div>
    );
});
