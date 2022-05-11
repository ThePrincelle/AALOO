import { Plan } from '../../../model';
import { HistoryRepositoryInterface } from '../../action-history';
import { PlanRepositoryInterface } from '../planRepositoryInterface';
import { CreatePlanPresenterInterface } from './createPlanPresenterInterface';
import { CreatePlanRequest } from './createPlanRequest';
import { CreatePlanResponse } from './createPlanResponse';

export class CreatePlan {
    constructor(
        private repository: PlanRepositoryInterface,
        private historyrepository: HistoryRepositoryInterface
    ) {}

    async execute(
        request: CreatePlanRequest,
        presenter: CreatePlanPresenterInterface
    ): Promise<void> {
        const response = new CreatePlanResponse();

        // Validate plan name
        if (request.name.trim().length === 0) {
            response.isNameInvalid = true;
            presenter.presentCreatePlan(response);
            return;
        }

        const id = request.id || (await this.repository.nextId());
        const plan = new Plan(id, request.name);
        await this.repository.create(plan);
        response.plan = plan;

        await this.historyrepository.clear();

        presenter.presentCreatePlan(response);
    }
}
