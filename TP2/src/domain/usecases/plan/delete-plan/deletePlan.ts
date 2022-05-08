import { PlanRepositoryInterface } from '../planRepositoryInterface';
import { DeletePlanPresenterInterface } from './deletePlanPresenterInterface';
import { DeletePlanRequest } from './deletePlanRequest';
import { DeletePlanResponse } from './deletePlanResponse';

export class DeletePlan {
    constructor(private repository: PlanRepositoryInterface) {}

    async execute(
        request: DeletePlanRequest,
        presenter: DeletePlanPresenterInterface
    ) {
        const response = new DeletePlanResponse();
        response.deletedPlan = await this.repository.delete(request.planId);

        presenter.presentDeletePlan(response);
    }
}
