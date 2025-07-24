import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { selectionStore } from "../state/SelectionStore";
import { Entity } from "../../core/ecs/Entity";
import * as THREE from "three";

interface InspectorPanelProps {
  style?: React.CSSProperties;
}

interface PropertyFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  precision?: number;
}

const PropertyField: React.FC<PropertyFieldProps> = ({
  label,
  value,
  onChange,
  step = 0.1,
  precision = 3,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toFixed(precision));
  }, [value, precision]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue)) {
      onChange(newValue);
      setInputValue(newValue.toFixed(precision));
    } else {
      setInputValue(value.toFixed(precision));
    }
  };

  return (
    <div style={{ marginBottom: "8px" }}>
      <label
        style={{
          display: "block",
          fontSize: "12px",
          fontWeight: "bold",
          marginBottom: "2px",
          color: "#333",
        }}
      >
        {label}
      </label>
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        step={step}
        style={{
          width: "100%",
          padding: "4px 6px",
          border: "1px solid #ccc",
          borderRadius: "3px",
          fontSize: "12px",
        }}
      />
    </div>
  );
};

interface TransformInspectorProps {
  entity: Entity;
}

const TransformInspector: React.FC<TransformInspectorProps> = observer(
  ({ entity }) => {
    // Get transform component using the entity's transform property
    const transformComponent = entity.transform;

    if (!transformComponent) {
      return (
        <div style={{ padding: "12px", color: "#999", fontSize: "12px" }}>
          No Transform component found
        </div>
      );
    }

    const handlePositionChange = (axis: "x" | "y" | "z", value: number) => {
      const newPosition = transformComponent.position.clone();
      newPosition[axis] = value;
      transformComponent.position = newPosition;
    };

    const handleRotationChange = (axis: "x" | "y" | "z", value: number) => {
      const newRotation = transformComponent.rotation.clone();
      newRotation[axis] = THREE.MathUtils.degToRad(value);
      transformComponent.rotation = newRotation;
    };

    const handleScaleChange = (axis: "x" | "y" | "z", value: number) => {
      const newScale = transformComponent.scale.clone();
      newScale[axis] = value;
      transformComponent.scale = newScale;
    };

    return (
      <div style={{ padding: "12px" }}>
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#333",
            borderBottom: "1px solid #eee",
            paddingBottom: "8px",
          }}
        >
          Transform
        </h3>

        <div style={{ marginBottom: "16px" }}>
          <h4
            style={{
              margin: "0 0 8px 0",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#666",
            }}
          >
            Position
          </h4>
          <PropertyField
            label="X"
            value={transformComponent.position.x}
            onChange={(value) => handlePositionChange("x", value)}
          />
          <PropertyField
            label="Y"
            value={transformComponent.position.y}
            onChange={(value) => handlePositionChange("y", value)}
          />
          <PropertyField
            label="Z"
            value={transformComponent.position.z}
            onChange={(value) => handlePositionChange("z", value)}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <h4
            style={{
              margin: "0 0 8px 0",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#666",
            }}
          >
            Rotation (degrees)
          </h4>
          <PropertyField
            label="X"
            value={THREE.MathUtils.radToDeg(transformComponent.rotation.x)}
            onChange={(value) => handleRotationChange("x", value)}
            step={1}
            precision={1}
          />
          <PropertyField
            label="Y"
            value={THREE.MathUtils.radToDeg(transformComponent.rotation.y)}
            onChange={(value) => handleRotationChange("y", value)}
            step={1}
            precision={1}
          />
          <PropertyField
            label="Z"
            value={THREE.MathUtils.radToDeg(transformComponent.rotation.z)}
            onChange={(value) => handleRotationChange("z", value)}
            step={1}
            precision={1}
          />
        </div>

        <div>
          <h4
            style={{
              margin: "0 0 8px 0",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#666",
            }}
          >
            Scale
          </h4>
          <PropertyField
            label="X"
            value={transformComponent.scale.x}
            onChange={(value) => handleScaleChange("x", value)}
          />
          <PropertyField
            label="Y"
            value={transformComponent.scale.y}
            onChange={(value) => handleScaleChange("y", value)}
          />
          <PropertyField
            label="Z"
            value={transformComponent.scale.z}
            onChange={(value) => handleScaleChange("z", value)}
          />
        </div>
      </div>
    );
  }
);

const InspectorPanel: React.FC<InspectorPanelProps> = observer(({ style }) => {
  const selectedEntities = selectionStore.selected;

  const defaultStyle: React.CSSProperties = {
    position: "fixed",
    top: "20px",
    right: "20px",
    width: "280px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    maxHeight: "80vh",
    overflow: "auto",
    ...style,
  };

  return (
    <div style={defaultStyle}>
      <div
        style={{
          padding: "12px 16px",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #e9ecef",
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px",
          fontWeight: "bold",
          fontSize: "14px",
          color: "#495057",
        }}
      >
        Inspector
        {selectedEntities.length > 0 && (
          <span
            style={{
              marginLeft: "8px",
              fontSize: "12px",
              color: "#6c757d",
              fontWeight: "normal",
            }}
          >
            ({selectedEntities.length} selected)
          </span>
        )}
      </div>

      <div>
        {selectedEntities.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#6c757d",
              fontSize: "14px",
            }}
          >
            No entity selected
            <div
              style={{
                fontSize: "12px",
                marginTop: "8px",
                color: "#adb5bd",
              }}
            >
              Select an entity in the scene hierarchy
            </div>
          </div>
        ) : selectedEntities.length === 1 ? (
          <TransformInspector entity={selectedEntities[0]} />
        ) : (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#6c757d",
              fontSize: "14px",
            }}
          >
            Multiple entities selected ({selectedEntities.length})
            <div
              style={{
                fontSize: "12px",
                marginTop: "8px",
                color: "#adb5bd",
              }}
            >
              Select a single entity to edit properties
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default InspectorPanel;
