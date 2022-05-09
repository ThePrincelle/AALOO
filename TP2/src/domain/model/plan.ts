import { Layer } from './layer';
import { Item, ItemType } from './item';

/**
 * A Plan object represents a document. It holds all the {@link Item}s and
 * {@link Layer}s contained in the scene graph.
 */
export class Plan {
    readonly selectedItems: Item[] = [];
    activeLayer: Layer | null;

    public constructor(
        public readonly id: string,
        public name: string = 'Untitled',
        public layers: Layer[] = [
            new Layer('0', 'Foundation', [
                Item.create('3', ItemType.Foundation, 'Foundation'),
            ]),
            new Layer('1', 'Walls'),
            new Layer('2', 'Items', [
                Item.create('4', ItemType.Furniture, 'Table'),
            ]),
        ]
    ) {
        this.activeLayer =
            this.layers.length > 0 ? this.layers[this.layers.length] : null;
    }

    /**
     * Adds a new layer at the end of the plan's layer list
     * and sets the {@link Plan#activeLayer}.
     *
     * @param layer - layer to add.
     */
    public addLayer(layer: Layer): void {
        this.layers.push(layer);
        this.activeLayer = layer;
    }

    /**
     * Inserts the given layer at the specified index in this plan's layer
     * list and sets the {@link Plan#activeLayer}.
     *
     * @param index - index at which to insert the layer.
     * @param layer - layer to insert.
     */
    public insertLayer(index: number, layer: Layer): void {
        this.layers.splice(index, 0, layer);
        this.activeLayer = layer;
    }

    /**
     * Removes the layer at the specified index in this plan's layer list.
     * If the layer was the active layer, the active layer is then reset.
     *
     * @param index - index of the layer to remove.
     */
    public removeLayer(index: number): void {
        const removedLayer = this.layers.splice(index, 1).at(0);

        const wasActiveLayer = removedLayer === this.activeLayer;
        if (wasActiveLayer) {
            this.activeLayer =
                this.layers.length > 0 ? this.layers[this.layers.length] : null;
        }
    }

    // TODO: usefull?
    public clear(): void {
        this.layers = [
            new Layer('0', 'Foundation', [
                Item.create('3', ItemType.Foundation, 'Foundation'),
            ]),
            new Layer('1', 'Walls'),
            new Layer('2', 'Items'),
        ];
        this.activeLayer = this.layers[this.layers.length];
    }

    // public toJson(): string {
    //     return JSON.stringify(this);
    // }

    // public static fromJson(json: string): Plan {
    //     const plan = JSON.parse(json) as Plan;
    //     return plan;
    // }
}
