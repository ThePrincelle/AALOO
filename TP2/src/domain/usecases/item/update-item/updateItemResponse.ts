import { Item } from '../../../model';

export class UpdateItemResponse {
    updatedItem?: Item;

    isPlanInvalid: boolean = false;
    isLayerInvalid: boolean = false;
}
