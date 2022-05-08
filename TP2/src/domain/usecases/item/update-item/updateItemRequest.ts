import { Item } from '../../../model';

export class UpdateItemRequest {
    constructor(
        public readonly item: Item,
        public readonly planId: string,
        public readonly layerId: string
    ) {}
}
