import { CreateLayerResponse } from './createLayerResponse';

export interface CreateLayerPresenterInterface {
    presentCreateLayer(response: CreateLayerResponse): void;
}
