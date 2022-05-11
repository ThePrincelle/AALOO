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

        await this.repository.update(request.plan);
        response.updatedPlan = request.plan;

        // Add to history
        await this.historyrepository.add(request.plan);

        presenter.presentUpdatePlan(response);
    }
}
