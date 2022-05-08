import { GetItemResponse } from './getItemResponse';

export interface GetItemPresenterInterface {
    presentGetItem(response: GetItemResponse): void;
}
