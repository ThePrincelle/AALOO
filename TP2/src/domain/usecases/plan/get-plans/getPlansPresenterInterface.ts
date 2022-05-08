import { GetPlansResponse } from './getPlansResponse';

export interface GetPlansPresenterInterface {
    presentGetPlans(response: GetPlansResponse): void;
}
