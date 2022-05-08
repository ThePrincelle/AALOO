import { Plan } from '../../../model';

export class UpdatePlanRequest {
    constructor(public readonly plan: Plan) {}
}
