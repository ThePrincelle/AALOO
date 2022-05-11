import { Plan } from '../../../model';

export class CreatePlanResponse {
    plan?: Plan;
    isNameInvalid: boolean = false;
}
