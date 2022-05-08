import { Layer } from '../../../model';

export class GetLayersResponse {
    layers: Layer[] = [];

    isPlanInvalid: boolean = false;
}
