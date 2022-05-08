import { Item } from '../../../model';

export class CreateItemResponse {
    item?: Item;

    isNameInvalid: boolean = false;
    isPlanInvalid: boolean = false;
    isLayerInvalid: boolean = false;
}
