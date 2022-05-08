import { Layer } from '../../../model';

export class UpdateLayerRequest {
    constructor(public readonly layer: Layer, public readonly planId: string) {}
}
