import { Layer } from '../../../model';
import { PlanRepositoryInterface } from '../../plan/planRepositoryInterface';
import { CreateLayerPresenterInterface } from './createLayerPresenterInterface';
import { CreateLayerRequest } from './createLayerRequest';
import { CreateLayerResponse } from './createLayerResponse';

export class CreateLayer {
    constructor(private repository: PlanRepositoryInterface) {}

    async execute(
        request: CreateLayerRequest,
        presenter: CreateLayerPresenterInterface
    ): Promise<void> {
        const response = new CreateLayerResponse();

        // Validate name
        if (request.name.trim().length === 0) {
            response.isNameInvalid = true;
            presenter.presentCreateLayer(response);
            return;
        }

        // Validate planId
        const plan = await this.repository.get(request.planId);
        if (!plan) {
            response.isPlanInvalid = true;
            presenter.presentCreateLayer(response);
            return;
        }

        const id = request.id || (await this.repository.nextId());
        const layer = new Layer(id, request.name);
        plan.layers.push(layer);
        await this.repository.update(plan);
        response.layer = layer;

        presenter.presentCreateLayer(response);
    }
}
