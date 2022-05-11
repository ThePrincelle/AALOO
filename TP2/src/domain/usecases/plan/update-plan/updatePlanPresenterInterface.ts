import { UpdatePlanResponse } from './updatePlanResponse';

export interface UpdatePlanPresenterInterface {
    presentUpdatePlan(response: UpdatePlanResponse): void;
}
