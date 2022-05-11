import { CreateItemResponse } from './createItemResponse';

export interface CreateItemPresenterInterface {
    presentCreateItem(response: CreateItemResponse): void;
}
