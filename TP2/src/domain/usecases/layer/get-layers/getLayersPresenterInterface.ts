import { GetLayersResponse } from './getLayersResponse';

export interface GetLayersPresenterInterface {
    presentGetLayers(response: GetLayersResponse): void;
}
