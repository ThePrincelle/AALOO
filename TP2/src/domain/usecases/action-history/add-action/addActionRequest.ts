import { Plan } from '../../../model';

export class AddActionRequest {
    constructor(public readonly plan: Plan) {}
}
