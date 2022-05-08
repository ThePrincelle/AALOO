import { PlanRepositoryInterface } from '../planRepositoryInterface';
import { GetPlansPresenterInterface } from './getPlansPresenterInterface';
import { GetPlansResponse } from './getPlansResponse';

export class GetPlans {
    constructor(private repository: PlanRepositoryInterface) {}

    async execute(presenter: GetPlansPresenterInterface) {
        const response = new GetPlansResponse();
        response.plans = await this.repository.getAll();

        presenter.presentGetPlans(response);
    }
}
