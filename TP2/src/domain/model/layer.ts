import { Item } from './item';

export enum LayerType {
    Foundation = 'foundation',
    Structure = 'structure',
    Item = 'item',
    Hangable = 'hangable',
}

/**
 * The Layer item represents a layer in the {@link Plan}.
 */
export class Layer {
    public constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly children: Item[] = []
    ) {}
}
