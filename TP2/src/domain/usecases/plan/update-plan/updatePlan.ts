import { HistoryRepositoryInterface } from '../../action-history';
import { PlanRepositoryInterface } from '../planRepositoryInterface';
import { UpdatePlanPresenterInterface } from './updatePlanPresenterInterface';
import { UpdatePlanRequest } from './updatePlanRequest';
import { UpdatePlanResponse } from './updatePlanResponse';

export class UpdatePlan {
    constructor(
        private repository: PlanRepositoryInterface,
        private historyrepository: HistoryRepositoryInterface
    ) {}

    async execute(
        request: UpdatePlanRequest,
        presenter: UpdatePlanPresenterInterface
    ) {
        const response = new UpdatePlanResponse();

        const oldPlan = await this.repository.get(request.plan.id);

        if (oldPlan) {
            // Add to history
            await this.historyrepository.add({ ...oldPlan });
        }

        await this.repository.update(request.plan);
        response.updatedPlan = request.plan;

        presenter.presentUpdatePlan(response);
    }
}
