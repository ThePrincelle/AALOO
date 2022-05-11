import { ItemType, Point } from '../../../model';
import { Shape } from '../../../model/shape';

export class CreateItemRequest {
    constructor(
        public readonly name: string,
        public readonly itemType: ItemType,
        public readonly planId: string,
        public readonly layerId: string,
        public readonly position?: Point,
        public readonly shape?: Shape,
        public readonly color?: string,
        public readonly id?: string
    ) {}
}
