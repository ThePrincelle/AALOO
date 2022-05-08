import { DeleteItemResponse } from './deleteItemResponse';

export interface DeleteItemPresenterInterface {
    presentDeleteItem(response: DeleteItemResponse): void;
}
