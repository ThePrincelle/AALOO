import { PlanRepositoryInterface } from '../../plan/planRepositoryInterface';
import { UpdateLayerPresenterInterface } from './updateLayerPresenterInterface';
import { UpdateLayerRequest } from './updateLayerRequest';
import { UpdateLayerResponse } from './updateLayerResponse';

export class UpdateLayer {
    constructor(private repository: PlanRepositoryInterface) {}

    async execute(
        request: UpdateLayerRequest,
        presenter: UpdateLayerPresenterInterface
    ) {
        const response = new UpdateLayerResponse();

        // Validate planId
        const plan = await this.repository.get(request.planId);
        if (!plan) {
            response.isPlanInvalid = true;
            presenter.presentUpdateLayer(response);
            return;
        }

        // Update plan layer if it exists else create new layer
        const layerIndex = plan.layers.findIndex(
            (l) => l.id === request.layer.id
        );
        if (layerIndex === -1) {
            plan.layers.push(request.layer);
        } else {
            plan.layers[layerIndex] = request.layer;
        }

        await this.repository.update(plan);
        response.updatedLayer = request.layer;

        presenter.presentUpdateLayer(response);
    }
}
