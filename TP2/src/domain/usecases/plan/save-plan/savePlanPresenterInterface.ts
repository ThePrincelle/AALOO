import { SavePlanResponse } from './savePlanResponse';

export interface SavePlanPresenterInterface {
    presentSavePlan(response: SavePlanResponse): void;
}
