import { GetItemsResponse } from './getItemsResponse';

export interface GetItemsPresenterInterface {
    presentGetItems(response: GetItemsResponse): void;
}
