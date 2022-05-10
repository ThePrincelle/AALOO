import { HistoryRepositoryInterface } from '../../action-history';
import { PlanRepositoryInterface } from '../planRepositoryInterface';
import { DeletePlanPresenterInterface } from './deletePlanPresenterInterface';
import { DeletePlanRequest } from './deletePlanRequest';
import { DeletePlanResponse } from './deletePlanResponse';

export class DeletePlan {
    constructor(
        private repository: PlanRepositoryInterface,
        private historyrepository: HistoryRepositoryInterface
    ) {}

    async execute(
        request: DeletePlanRequest,
        presenter: DeletePlanPresenterInterface
    ) {
        const response = new DeletePlanResponse();
        response.deletedPlan = await this.repository.delete(request.planId);

        await this.historyrepository.clear();

        presenter.presentDeletePlan(response);
    }
}
