import { CreatePlanResponse } from './createPlanResponse';

export interface CreatePlanPresenterInterface {
    presentCreatePlan(response: CreatePlanResponse): void;
}
