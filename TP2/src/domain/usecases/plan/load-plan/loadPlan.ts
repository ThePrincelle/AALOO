import { PlanRepositoryInterface } from '../planRepositoryInterface';
import { LoadPlanPresenterInterface } from './loadPlanPresenterInterface';
import { LoadPlanRequest } from './loadPlanRequest';
import { LoadPlanResponse } from './loadPlanResponse';

export class LoadPlan {
    constructor(private repository: PlanRepositoryInterface) {}

    async execute(
        request: LoadPlanRequest,
        presenter: LoadPlanPresenterInterface
    ) {
        const response = new LoadPlanResponse();
        response.plan = await this.repository.load(request.planId);

        presenter.presentLoadPlan(response);
    }
}
