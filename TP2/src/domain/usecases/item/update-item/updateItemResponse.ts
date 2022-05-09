import { Item } from '../../../model';

export class UpdateItemResponse {
    updatedItem?: Item;
    planId?: string;
    layerId?: string;

    isPlanInvalid: boolean = false;
    isLayerInvalid: boolean = false;
}
