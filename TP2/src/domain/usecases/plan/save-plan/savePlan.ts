import { PlanRepositoryInterface } from '../planRepositoryInterface';
import { SavePlanPresenterInterface } from './savePlanPresenterInterface';
import { SavePlanRequest } from './savePlanRequest';
import { SavePlanResponse } from './savePlanResponse';

export class SavePlan {
    constructor(private repository: PlanRepositoryInterface) {}

    async execute(
        request: SavePlanRequest,
        presenter: SavePlanPresenterInterface
    ) {
        const response = new SavePlanResponse();
        await this.repository.save(request.plan);
        response.savedPlan = request.plan;

        presenter.presentSavePlan(response);
    }
}
