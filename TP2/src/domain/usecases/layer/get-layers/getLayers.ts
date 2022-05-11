import { PlanRepositoryInterface } from '../../plan/planRepositoryInterface';
import { GetLayersPresenterInterface } from './getLayersPresenterInterface';
import { GetLayersRequest } from './getLayersRequest';
import { GetLayersResponse } from './getLayersResponse';

export class GetLayers {
    constructor(private repository: PlanRepositoryInterface) {}

    async execute(
        request: GetLayersRequest,
        presenter: GetLayersPresenterInterface
    ) {
        const response = new GetLayersResponse();

        // Validate planId
        const plan = await this.repository.get(request.planId);
        if (!plan) {
            response.isPlanInvalid = true;
            presenter.presentGetLayers(response);
            return;
        }

        response.layers = plan.layers;

        presenter.presentGetLayers(response);
    }
}
