import { Item } from '../../../model';
import { PlanRepositoryInterface } from '../../plan/planRepositoryInterface';
import { CreateItemPresenterInterface } from './createItemPresenterInterface';
import { CreateItemRequest } from './createItemRequest';
import { CreateItemResponse } from './createItemResponse';

export class CreateItem {
    constructor(private repository: PlanRepositoryInterface) {}

    async execute(
        request: CreateItemRequest,
        presenter: CreateItemPresenterInterface
    ): Promise<void> {
        const response = new CreateItemResponse();

        // Validate name
        if (request.name.trim().length === 0) {
            response.isNameInvalid = true;
            presenter.presentCreateItem(response);
            return;
        }

        // Validate planId
        const plan = await this.repository.get(request.planId);
        if (!plan) {
            response.isPlanInvalid = true;
            presenter.presentCreateItem(response);
            return;
        }

        // Validate layerId
        const layerIndex = plan.layers.findIndex(
            (l) => l.id === request.layerId
        );
        if (layerIndex === -1) {
            response.isLayerInvalid = true;
            presenter.presentCreateItem(response);
            return;
        }

        const id = request.id || (await this.repository.nextId());
        const item = Item.create(id, request.itemType, request.name);
        plan.layers[layerIndex].children.push(item);

        await this.repository.update(plan);
        response.item = item;

        presenter.presentCreateItem(response);
    }
}
