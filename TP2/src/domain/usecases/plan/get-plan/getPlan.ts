import { PlanRepositoryInterface } from '../planRepositoryInterface';
import { GetPlanPresenterInterface } from './getPlanPresenterInterface';
import { GetPlanRequest } from './getPlanRequest';
import { GetPlanResponse } from './getPlanResponse';

export class GetPlan {
    constructor(private repository: PlanRepositoryInterface) {}

    async execute(
        request: GetPlanRequest,
        presenter: GetPlanPresenterInterface
    ) {
        const response = new GetPlanResponse();
        response.plan = await this.repository.get(request.planId);

        presenter.presentGetPlan(response);
    }
}
