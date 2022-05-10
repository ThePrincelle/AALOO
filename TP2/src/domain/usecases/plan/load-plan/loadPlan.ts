import { HistoryRepositoryInterface } from '../../action-history';
import { PlanRepositoryInterface } from '../planRepositoryInterface';
import { LoadPlanPresenterInterface } from './loadPlanPresenterInterface';
import { LoadPlanRequest } from './loadPlanRequest';
import { LoadPlanResponse } from './loadPlanResponse';

export class LoadPlan {
    constructor(
        private repository: PlanRepositoryInterface,
        private historyrepository: HistoryRepositoryInterface
    ) {}

    async execute(
        request: LoadPlanRequest,
        presenter: LoadPlanPresenterInterface
    ) {
        const response = new LoadPlanResponse();
        response.plan = await this.repository.load(request.planId);

        await this.historyrepository.clear();

        presenter.presentLoadPlan(response);
    }
}
