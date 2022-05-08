import { PlanRepositoryInterface } from '../planRepositoryInterface';
import { UpdatePlanPresenterInterface } from './updatePlanPresenterInterface';
import { UpdatePlanRequest } from './updatePlanRequest';
import { UpdatePlanResponse } from './updatePlanResponse';

export class UpdatePlan {
    constructor(private repository: PlanRepositoryInterface) {}

    async execute(
        request: UpdatePlanRequest,
        presenter: UpdatePlanPresenterInterface
    ) {
        const response = new UpdatePlanResponse();
        await this.repository.update(request.plan);
        response.updatedPlan = request.plan;

        presenter.presentUpdatePlan(response);
    }
}
