import { Layer } from '../../../model';

export class UpdateLayerResponse {
    updatedLayer?: Layer;

    isPlanInvalid: boolean = false;
}
