# Plan Architecture

## Observer Pattern

[Observer Pattern](https://refactoring.guru/design-patterns/observer)

[Inkscape architecture](https://wiki.inkscape.org/wiki/Architectural_overview)

## Classes

* Editor
* Plan
* Layer
* Item

### Plan

```mermaid
classDiagram
    Item <|-- Layer
    Plan "1" *-- "*" Layer
    Plan "1" *-- "*" Item

    class Plan {
        - index: number
        - name: string
        - layers: Layer[]
        - activeLayer: Layer
        - selectedItems: Item[]

        + addLayer(layer: Layer): Layer | null
        + insertLayer(index: number, layer: Layer): Layer | null
        + removeLayer(index: number): Layer | null
        + clear(): void
        + activate(): void
    }

    class Item {
        - id: number RO
        - name: number
        - locked: boolean
        - visible: boolean
        - opacity: number
        - selected: boolean
        - position: Point
        - rotation: number
        - scale: number
        - parent: Item | null
        - children: Item[]

        - firstChild: Item | null RO
        - lastChild: Item | null RO
        - nextSibling: Item | null RO
        - previousSibling: Item | null RO
        - index: number RO

        - strokeColor: Color | null
        - strokeWidth: number
        - fillColor: Color | null
        - selectedColor: Color | null

        + addChild(item: Item): Item | null
        + insertChild(index: number, child: Item): Item | null
        + addChildren(items: Item[]): Item[] | null
        + insertChildren(index: number, children: Item[]): Item[] | null
        + remove(): boolean
    }

    class Layer {
        + clear(): boolean
        + activate(): void

        + constructor(name: string, items: Item[])
    }
```