import { ItemType } from '../../../model';

export class CreateItemRequest {
    constructor(
        public readonly name: string,
        public readonly itemType: ItemType,
        public readonly planId: string,
        public readonly layerId: string,
        public readonly id?: string
    ) {}
}
