import { Item } from '../../../model';

export class DeleteItemResponse {
    deletedItem: Item | undefined;
    planId?: string;
    layerId?: string;

    isPlanInvalid: boolean = false;
    isLayerInvalid: boolean = false;
    isItemInvalid: boolean = false;
}
