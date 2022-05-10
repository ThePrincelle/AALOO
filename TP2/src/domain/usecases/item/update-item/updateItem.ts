import { HistoryRepositoryInterface } from '../../action-history';
import { PlanRepositoryInterface } from '../../plan/planRepositoryInterface';
import { UpdateItemPresenterInterface } from './updateItemPresenterInterface';
import { UpdateItemRequest } from './updateItemRequest';
import { UpdateItemResponse } from './updateItemResponse';

export class UpdateItem {
    constructor(
        private repository: PlanRepositoryInterface,
        private historyrepository: HistoryRepositoryInterface
    ) {}

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

        // Add to history
        await this.historyrepository.add({ ...plan });

        // Check if item exists
        const itemIndex = plan.layers[layerIndex].children.findIndex(
            (i) => i.id === request.item.id
        );
        if (itemIndex === -1) {
            plan.layers[layerIndex].children.push(request.item);
        } else {
            plan.layers[layerIndex].children[itemIndex] = request.item;
        }

        await this.repository.update(plan);
        response.updatedItem = request.item;
        response.planId = request.planId;
        response.layerId = request.layerId;

        presenter.presentUpdateItem(response);
    }
}
