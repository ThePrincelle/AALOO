import { UpdateItemResponse } from './updateItemResponse';

export interface UpdateItemPresenterInterface {
    presentUpdateItem(response: UpdateItemResponse): void;
}
