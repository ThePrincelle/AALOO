import { LoadPlanResponse } from './loadPlanResponse';

export interface LoadPlanPresenterInterface {
    presentLoadPlan(response: LoadPlanResponse): void;
}
