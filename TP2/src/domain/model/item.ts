import { Point } from './point';
import { Path, Rectangle, Shape } from './shape';

export enum ItemType {
    Layer = 'layer',
    Zone = 'zone',
    Foundation = 'foundation',
    Wall = 'wall',
    Window = 'window',
    Door = 'door',
    Furniture = 'furniture',
    Hangable = 'hangable',
    Staircase = 'staircase',
}

export class Item {
    public constructor(id: string, type: ItemType, name: string, shape: Shape);
    public constructor(
        id: string,
        type: ItemType,
        name: string,
        shape: Shape,
        fillcolor: string,
        strokecolor: string,
        strokeWidth: number
    );
    public constructor(
        id: string,
        type: ItemType,
        name: string,
        shape: Shape,
        fillcolor: string,
        strokecolor: string,
        strokeWidth: number,
        locked: boolean,
        visible: boolean,
        position: Point,
        rotation: number,
        scale: number
    );
    public constructor(
        public readonly id: string,
        public readonly type: ItemType,
        public readonly name: string,
        public readonly shape: Shape,

        public readonly fillcolor: string = '#ffffff',
        public readonly strokecolor: string = '#000000',
        public readonly strokeWidth: number = 1.0,

        public readonly locked: boolean = false,
        public readonly visible: boolean = true,
        // public readonly opacity: number = 1.0,
        // public readonly selected: boolean = false,
        public readonly position: Point = new Point(0, 0),
        public readonly rotation: number = 0.0,
        public readonly scale: number = 1.0
    ) {}

    /**
     * Factory to create a new Item with a given {@link ItemType}.
     *
     * @param id Item id.
     * @param type {@link ItemType}
     * @param name Item name.
     * @returns {Item} New item.
     */
    public static create(id: string, type: ItemType, name: string): Item {
        let shape: Shape;
        let fillColor: string = '#ffffff';
        let strokeColor: string = '#000000';
        let strokeWidth: number = 1.0;

        switch (type) {
            case ItemType.Layer:
                shape = new Rectangle(0, 0);
                break;
            case ItemType.Zone:
                shape = new Rectangle(200, 200);
                break;
            case ItemType.Foundation:
                shape = new Rectangle(500, 500);
                fillColor = '#3498db';
                strokeColor = '#3498db';
                break;
            case ItemType.Wall:
            case ItemType.Window:
            case ItemType.Door:
                shape = new Path([new Point(0, 0), new Point(0, 100)], false);
                break;
            case ItemType.Furniture:
            case ItemType.Hangable:
            case ItemType.Staircase:
                shape = new Rectangle(100, 100);
                fillColor = '#95a5a6';
                strokeColor = '#95a5a6';
                break;
            default:
                throw new Error(`Unknown ItemType: ${type}`);
        }

        return new Item(
            id,
            type,
            name,
            shape,
            fillColor,
            strokeColor,
            strokeWidth
        );
    }
}

// ? Notes:
// ? - Create an abstract class for the Item/WorldObject type.
// ?    - Create concrete classes for the different type of objects.
// ?        - Layer.
// ?        - PlaceableItem/Item.
// ?    - Create a factory method to create the concrete classes.
