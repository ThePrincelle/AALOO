import { Item, Plan } from '../../../domain/model';
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
    UpdateItem,
    UpdateItemPresenterInterface,
    UpdateItemRequest,
    UpdatePlan,
    UpdatePlanPresenterInterface,
    UpdatePlanRequest,
    CanUndoRedoPresenterInterface,
    CanUndoRedo,
    UndoActionPresenterInterface,
    UndoAction,
    RedoActionPresenterInterface,
    RedoAction,
    AddActionPresenterInterface,
    ClearHistoryPresenterInterface,
    AddAction,
    ClearHistory,
    AddActionRequest,
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
        private readonly updatePlanService: UpdatePlan,

        private readonly updateItemPresenter: UpdateItemPresenterInterface,
        private readonly updateItemService: UpdateItem,

        private readonly canUndoRedoPresenter: CanUndoRedoPresenterInterface,
        private readonly addActionPresenter: AddActionPresenterInterface,
        private readonly undoActionPresenter: UndoActionPresenterInterface,
        private readonly redoActionPresenter: RedoActionPresenterInterface,
        private readonly clearHistoryPresenter: ClearHistoryPresenterInterface,
        private readonly canUndoRedoService: CanUndoRedo,
        private readonly addActionService: AddAction,
        private readonly undoActionService: UndoAction,
        private readonly redoActionService: RedoAction,
        private readonly clearHistoryService: ClearHistory
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

    public async updateItem(
        item: Item,
        planId: string,
        layerId: string
    ): Promise<void> {
        await this.updateItemService.execute(
            new UpdateItemRequest(item, planId, layerId),
            this.updateItemPresenter
        );
        await this.canUndoRedoService.execute(this.canUndoRedoPresenter);
    }

    public async canUndoRedo(): Promise<void> {
        await this.canUndoRedoService.execute(this.canUndoRedoPresenter);
    }

    public async addAction(plan: Plan): Promise<void> {
        await this.addActionService.execute(
            new AddActionRequest(plan),
            this.addActionPresenter
        );
    }

    public async undo(): Promise<void> {
        await this.undoActionService.execute(this.undoActionPresenter);
        await this.canUndoRedoService.execute(this.canUndoRedoPresenter);
    }

    public async redo(): Promise<void> {
        await this.redoActionService.execute(this.redoActionPresenter);
        await this.canUndoRedoService.execute(this.canUndoRedoPresenter);
    }

    public async clearHistory(): Promise<void> {
        await this.clearHistoryService.execute(this.clearHistoryPresenter);
    }
}
