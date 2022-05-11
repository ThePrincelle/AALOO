import { Layer, LayerType } from './layer';
import { Item, ItemType } from './item';
import { Point } from './point';
import { Circle, Rectangle, Path } from './shape';

/**
 * A Plan object represents a document. It holds all the {@link Item}s and
 * {@link Layer}s contained in the scene graph.
 */
export class Plan {
    public constructor(
        public readonly id: string,
        public name: string = `Untitled ${id}`,
        public layers: Layer[] = [
            new Layer(LayerType.Foundation, 'Foundation', [
                Item.create(
                    '1',
                    ItemType.Foundation,
                    'Foundation',
                    new Point(-300, -250),
                    new Rectangle(600, 500)
                ),
            ]),
            new Layer(LayerType.Structure, 'Walls / Stairs / Windows', [
                Item.create(
                    '2',
                    ItemType.Wall,
                    'Wall',
                    new Point(0, -250),
                    new Path([new Point(0, 0), new Point(0, 100)], false),
                    '#2980b900',
                    '#2980b9'
                ),
                Item.create(
                    '3',
                    ItemType.Door,
                    'Door',
                    new Point(0, -150),
                    new Path([new Point(0, 0), new Point(0, 80)], false),
                    '#9b59b600',
                    '#9b59b6'
                ),
                Item.create(
                    '4',
                    ItemType.Wall,
                    'Wall',
                    new Point(0, -70),
                    new Path(
                        [
                            new Point(0, 0),
                            new Point(0, 100),
                            new Point(-300, 100),
                        ],
                        false
                    ),
                    '#2980b900',
                    '#2980b9'
                ),
            ]),
            new Layer(LayerType.Item, 'Items', [
                Item.create(
                    '5',
                    ItemType.Furniture,
                    'Table',
                    new Point(-280, -170),
                    new Rectangle(140, 70)
                ),
                Item.create(
                    '6',
                    ItemType.Furniture,
                    'Chair',
                    new Point(-270, -230),
                    new Rectangle(50, 50)
                ),
                Item.create(
                    '7',
                    ItemType.Furniture,
                    'Chair',
                    new Point(-200, -230),
                    new Rectangle(50, 50)
                ),
                Item.create(
                    '8',
                    ItemType.Furniture,
                    'Chair',
                    new Point(-270, -90),
                    new Rectangle(50, 50)
                ),
                Item.create(
                    '9',
                    ItemType.Furniture,
                    'Chair',
                    new Point(-200, -90),
                    new Rectangle(50, 50)
                ),
            ]),
            new Layer(LayerType.Hangable, 'Hanged Items', [
                Item.create(
                    '10',
                    ItemType.Hangable,
                    'Lamp',
                    new Point(-70, -135),
                    new Circle(25)
                ),
            ]),
        ]
    ) {}
}
