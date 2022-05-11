import { HistoryRepositoryInterface } from '../../action-history';
import { PlanRepositoryInterface } from '../../plan/planRepositoryInterface';
import { DeleteItemPresenterInterface } from './deleteItemPresenterInterface';
import { DeleteItemRequest } from './deleteItemRequest';
import { DeleteItemResponse } from './deleteItemResponse';

export class DeleteItem {
    constructor(
        private repository: PlanRepositoryInterface,
        private historyrepository: HistoryRepositoryInterface
    ) {}

    async execute(
        request: DeleteItemRequest,
        presenter: DeleteItemPresenterInterface
    ) {
        const response = new DeleteItemResponse();

        // Validate planId
        const plan = await this.repository.get(request.planId);
        if (!plan) {
            response.isPlanInvalid = true;
            presenter.presentDeleteItem(response);
            return;
        }

        // Validate layerId
        const layerIndex = plan.layers.findIndex(
            (l) => l.id === request.layerId
        );
        if (layerIndex === -1) {
            response.isLayerInvalid = true;
            presenter.presentDeleteItem(response);
            return;
        }

        // Validate itemId
        const itemIndex = plan.layers[layerIndex].children.findIndex(
            (i) => i.id === request.itemId
        );
        if (itemIndex === -1) {
            response.isItemInvalid = true;
            presenter.presentDeleteItem(response);
            return;
        }

        const item = plan.layers[layerIndex].children
            .splice(itemIndex, 1)
            .at(0);
        await this.repository.save(plan);
        response.deletedItem = item;
        response.planId = request.planId;
        response.layerId = request.layerId;

        // Add to history
        await this.historyrepository.add(plan);

        presenter.presentDeleteItem(response);
    }
}
