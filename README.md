# Three.js Engine

A modern, modular 3D engine built with TypeScript and Three.js, featuring an Entity-Component-System (ECS) architecture.

## Features

- **Entity-Component-System (ECS)**: Modular architecture for game object management
- **Scene Management**: Hierarchical scene organization with parent-child relationships
- **Component System**: Reusable components for transform, mesh rendering, and custom behaviors
- **Event System**: Event-driven communication between engine modules
- **Service Locator**: Dependency injection pattern for service management
- **Input Management**: Centralized input handling system
- **Renderer Abstraction**: Clean separation between Three.js and engine logic

## Project Structure

```
src/ts/engine/
├── core/           # Core engine systems
│   ├── Engine.ts
│   ├── EventMediator.ts
│   ├── ServiceLocator.ts
│   └── TimeManager.ts
├── ecs/            # Entity-Component-System
│   ├── Entity.ts
│   ├── Component.ts
│   └── components/
│       ├── TransformComponent.ts
│       └── MeshRendererComponent.ts
├── scene/          # Scene management
│   ├── Scene.ts
│   └── SceneManager.ts
├── renderer/       # Rendering system
│   ├── Renderer.ts
│   └── SceneAdapter.ts
├── input/          # Input handling
│   └── InputManager.ts
└── data/           # Data structures
    ├── Material.ts
    ├── Mesh.ts
    └── factory/
        ├── MaterialFactory.ts
        └── MeshFactory.ts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Engine
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Creating a Scene

```typescript
import { Scene } from "./engine/scene/Scene";
import { Entity } from "./engine/ecs/Entity";
import { Cube } from "./game/prefabs/Cube";

const scene = new Scene("MainScene");
const cube = new Cube();
scene.addEntity(cube);
```

### Adding Components

```typescript
import { RotateAroundComponent } from "./game/components/RotateAroundComponent";

const entity = new Entity();
entity.addComponent(new RotateAroundComponent());
```

### Custom Components

```typescript
import { Component } from "./engine/ecs/Component";

export class CustomComponent extends Component {
  public init(): void {
    // Initialize component
  }

  public update(): void {
    // Update logic
  }
}
```

## Architecture

### Entity-Component-System (ECS)

The engine uses an ECS pattern where:

- **Entities**: Game objects that can contain multiple components
- **Components**: Data containers that define object properties and behaviors
- **Systems**: Logic that operates on components (handled by the engine core)

### Service Locator

The ServiceLocator provides dependency injection for engine services:

- EventMediator for event communication
- TimeManager for time tracking
- InputManager for input handling

### Event System

The EventMediator handles communication between engine modules:

- Entity lifecycle events
- Scene management events
- Custom game events

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Three.js](https://threejs.org/)
- TypeScript for type safety
- ECS pattern inspired by modern game engines
