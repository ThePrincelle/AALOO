import { Plan } from '../../../model';

export class RedoActionResponse {
    updatedPlan?: Plan;

    cannotRedo?: boolean;
}
