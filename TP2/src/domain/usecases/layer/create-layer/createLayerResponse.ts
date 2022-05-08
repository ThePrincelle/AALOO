import { Layer } from '../../../model';

export class CreateLayerResponse {
    layer?: Layer;

    isNameInvalid: boolean = false;
    isPlanInvalid: boolean = false;
}
