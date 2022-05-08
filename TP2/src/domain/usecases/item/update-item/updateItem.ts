import { PlanRepositoryInterface } from '../../plan/planRepositoryInterface';
import { UpdateItemPresenterInterface } from './updateItemPresenterInterface';
import { UpdateItemRequest } from './updateItemRequest';
import { UpdateItemResponse } from './updateItemResponse';

export class UpdateItem {
    constructor(private repository: PlanRepositoryInterface) {}

    async execute(
        request: UpdateItemRequest,
        presenter: UpdateItemPresenterInterface
    ) {
        const response = new UpdateItemResponse();

        // Validate planId
        const plan = await this.repository.get(request.planId);
        if (!plan) {
            response.isPlanInvalid = true;
            presenter.presentUpdateItem(response);
            return;
        }

        // Validate layerId
        const layerIndex = plan.layers.findIndex(
            (l) => l.id === request.layerId
        );
        if (layerIndex === -1) {
            response.isLayerInvalid = true;
            presenter.presentUpdateItem(response);
            return;
        }

        plan.layers[layerIndex].children.push(request.item);
        await this.repository.update(plan);
        response.updatedItem = request.item;

        presenter.presentUpdateItem(response);
    }
}
