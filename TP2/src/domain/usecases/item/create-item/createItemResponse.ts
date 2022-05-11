import { Item } from '../../../model';

export class CreateItemResponse {
    item?: Item;
    planId?: string;
    layerId?: string;

    isNameInvalid: boolean = false;
    isPlanInvalid: boolean = false;
    isLayerInvalid: boolean = false;
}
