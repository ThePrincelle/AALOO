import { Plan } from '../../../model';

export class SavePlanRequest {
    constructor(public readonly plan: Plan) {}
}
