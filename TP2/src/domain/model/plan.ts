import { Layer } from './layer';
import { Item, ItemType } from './item';
import { Point } from './point';
import { Circle } from './shape';

/**
 * A Plan object represents a document. It holds all the {@link Item}s and
 * {@link Layer}s contained in the scene graph.
 */
export class Plan {
    public constructor(
        public readonly id: string,
        public name: string = `Untitled ${id}`,
        public layers: Layer[] = [
            new Layer('0', 'Foundation', [
                Item.create(
                    '4',
                    ItemType.Foundation,
                    'Foundation',
                    new Point(0, 0)
                ),
            ]),
            new Layer('1', 'Walls / Stairs'),
            new Layer('2', 'Items', [
                Item.create(
                    '5',
                    ItemType.Furniture,
                    'Table',
                    new Point(20, 20)
                ),
            ]),
            new Layer('3', 'Hanged Items', [
                Item.create(
                    '6',
                    ItemType.Hangable,
                    'Lamp',
                    new Point(250, 250),
                    new Circle(25)
                ),
            ]),
        ]
    ) {}
}
