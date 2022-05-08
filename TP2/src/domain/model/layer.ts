import { Item } from './item';

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
