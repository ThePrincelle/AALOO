import { GetPlanResponse } from './getPlanResponse';

export interface GetPlanPresenterInterface {
    presentGetPlan(response: GetPlanResponse): void;
}
