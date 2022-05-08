import { Item } from '../../../model';

export class DeleteItemResponse {
    deletedItem: Item | undefined;

    isPlanInvalid: boolean = false;
    isLayerInvalid: boolean = false;
    isItemInvalid: boolean = false;
}
