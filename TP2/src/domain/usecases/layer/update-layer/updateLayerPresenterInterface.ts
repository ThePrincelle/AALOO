import { UpdateLayerResponse } from './updateLayerResponse';

export interface UpdateLayerPresenterInterface {
    presentUpdateLayer(response: UpdateLayerResponse): void;
}
