import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Scene } from "../../core/scene/Scene";
import { Entity } from "../../core/ecs/Entity";
import { selectionStore } from "../state/SelectionStore";

interface SceneHierarchyProps {
  scene: Scene;
}

interface EntityNodeProps {
  entity: Entity;
  level: number;
}

const EntityNode: React.FC<EntityNodeProps> = observer(({ entity, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get entity name - if empty, use a default name
  const entityName = entity.name || `Entity_${entity.id.slice(0, 8)}`;

  // Get components for this entity - we'll need to access them differently
  // For now, we'll show a placeholder since components are private
  const components: any[] = [];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEntityClick = (e: React.MouseEvent) => {
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
  };

  const isSelected = selectionStore.selected.includes(entity);

  return (
    <div className="entity-node">
      <div
        className="entity-header"
        style={{
          paddingLeft: `${level * 20}px`,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "4px 8px",
          borderBottom: "1px solid #eee",
          backgroundColor: isSelected ? "#e3f2fd" : "transparent",
          borderLeft: isSelected
            ? "3px solid #2196f3"
            : "3px solid transparent",
        }}
        onClick={handleEntityClick}
        onDoubleClick={toggleExpanded}
      >
        <span style={{ marginRight: "8px" }}>{isExpanded ? "▼" : "▶"}</span>
        <span
          style={{
            fontWeight: entity.active ? "normal" : "lighter",
            opacity: entity.active ? 1 : 0.5,
          }}
        >
          {entityName}
        </span>
      </div>

      {isExpanded && (
        <div className="entity-details">
          {/* Components */}
          <div style={{ paddingLeft: `${(level + 1) * 20}px` }}>
            {components.map((component, index) => (
              <div
                key={index}
                style={{
                  padding: "2px 8px",
                  fontSize: "12px",
                  color: "#666",
                  backgroundColor: "#f5f5f5",
                  margin: "2px 0",
                  borderRadius: "3px",
                }}
              >
                {component.constructor.name}
              </div>
            ))}
          </div>

          {/* Children entities would go here if parent-child relationships are implemented */}
          {/* For now, we'll show a placeholder since parent-child relationships aren't fully implemented */}
        </div>
      )}
    </div>
  );
});

const SceneHierarchy: React.FC<SceneHierarchyProps> = observer(({ scene }) => {
  const [entities, setEntities] = useState<Entity[]>(scene.entities);

  useEffect(() => {
    // Update entities when scene changes
    const updateEntities = () => {
      setEntities([...scene.entities]);
    };

    // Listen to scene events
    scene.onEntityAdded = updateEntities;
    scene.onEntityRemoved = updateEntities;

    // Initial update
    updateEntities();

    return () => {
      // Cleanup
      scene.onEntityAdded = () => {};
      scene.onEntityRemoved = () => {};
    };
  }, [scene]);

  return (
    <div
      className="scene-hierarchy"
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "white",
        minHeight: "300px",
        maxHeight: "500px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          padding: "8px 12px",
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ccc",
          fontWeight: "bold",
        }}
      >
        Scene Hierarchy
      </div>

      <div className="hierarchy-content">
        {entities.length === 0 ? (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#999",
            }}
          >
            No entities in scene
          </div>
        ) : (
          entities.map((entity) => (
            <EntityNode key={entity.id} entity={entity} level={0} />
          ))
        )}
      </div>
    </div>
  );
});

export default SceneHierarchy;
