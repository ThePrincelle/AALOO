import { DeletePlanResponse } from './deletePlanResponse';

export interface DeletePlanPresenterInterface {
    presentDeletePlan(response: DeletePlanResponse): void;
}
