import { Plan } from '../../../domain/model';
import {
    CreatePlan,
    CreatePlanPresenterInterface,
    CreatePlanRequest,
    DeletePlan,
    DeletePlanPresenterInterface,
    DeletePlanRequest,
    GetPlan,
    GetPlanPresenterInterface,
    GetPlanRequest,
    GetPlans,
    GetPlansPresenterInterface,
    LoadPlan,
    LoadPlanPresenterInterface,
    LoadPlanRequest,
    SavePlan,
    SavePlanPresenterInterface,
    SavePlanRequest,
    UpdatePlan,
    UpdatePlanPresenterInterface,
    UpdatePlanRequest,
} from '../../../domain/usecases';

export class PlanController {
    constructor(
        private readonly createPlanPresenter: CreatePlanPresenterInterface,
        private readonly deletePlanPresenter: DeletePlanPresenterInterface,
        private readonly getPlanPresenter: GetPlanPresenterInterface,
        private readonly getPlansPresenter: GetPlansPresenterInterface,
        private readonly loadPlanPresenter: LoadPlanPresenterInterface,
        private readonly savePlanPresenter: SavePlanPresenterInterface,
        private readonly updatePlanPresenter: UpdatePlanPresenterInterface,

        private readonly createPlanService: CreatePlan,
        private readonly deletePlanService: DeletePlan,
        private readonly getPlanService: GetPlan,
        private readonly getPlansService: GetPlans,
        private readonly loadPlanService: LoadPlan,
        private readonly savePlanService: SavePlan,
        private readonly updatePlanService: UpdatePlan
    ) {}

    public async createPlan(name: string): Promise<void> {
        await this.createPlanService.execute(
            new CreatePlanRequest(name),
            this.createPlanPresenter
        );
    }

    public async deletePlan(id: string): Promise<void> {
        await this.deletePlanService.execute(
            new DeletePlanRequest(id),
            this.deletePlanPresenter
        );
    }

    public async getPlan(id: string): Promise<void> {
        await this.getPlanService.execute(
            new GetPlanRequest(id),
            this.getPlanPresenter
        );
    }

    public async getPlans(): Promise<void> {
        await this.getPlansService.execute(this.getPlansPresenter);
    }

    public async loadPlan(id: string): Promise<void> {
        await this.loadPlanService.execute(
            new LoadPlanRequest(id),
            this.loadPlanPresenter
        );
    }

    public async savePlan(plan: Plan): Promise<void> {
        await this.savePlanService.execute(
            new SavePlanRequest(plan),
            this.savePlanPresenter
        );
    }

    public async updatePlan(plan: Plan): Promise<void> {
        await this.updatePlanService.execute(
            new UpdatePlanRequest(plan),
            this.updatePlanPresenter
        );
    }
}
