import { Plan } from '../../../model';

export class UndoActionResponse {
    updatedPlan?: Plan;

    cannotUndo?: boolean;
}
