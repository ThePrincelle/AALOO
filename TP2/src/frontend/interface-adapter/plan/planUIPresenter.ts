import { Plan } from '../../../domain/model';
import {
    CreatePlanPresenterInterface,
    CreatePlanResponse,
    DeletePlanPresenterInterface,
    DeletePlanResponse,
    GetPlanPresenterInterface,
    GetPlanResponse,
    GetPlansPresenterInterface,
    GetPlansResponse,
    LoadPlanPresenterInterface,
    LoadPlanResponse,
    SavePlanPresenterInterface,
    SavePlanResponse,
    UpdatePlanPresenterInterface,
    UpdatePlanResponse,
    UpdateItemPresenterInterface,
    UpdateItemResponse,
    CanUndoRedoPresenterInterface,
    CanUndoRedoResponse,
    UndoActionPresenterInterface,
    UndoActionResponse,
    AddActionPresenterInterface,
    AddActionResponse,
    RedoActionPresenterInterface,
    RedoActionResponse,
    ClearHistoryPresenterInterface,
    ClearHistoryResponse,
    CreateItemPresenterInterface,
    CreateItemResponse,
    DeleteItemPresenterInterface,
    DeleteItemResponse,
} from '../../../domain/usecases';
import {
    LayerViewModel,
    PlanViewModel,
    ViewModel,
    ItemViewModel,
} from './viewModel';

export class PlanUIPresenter
    implements
        CreatePlanPresenterInterface,
        DeletePlanPresenterInterface,
        GetPlanPresenterInterface,
        GetPlansPresenterInterface,
        LoadPlanPresenterInterface,
        SavePlanPresenterInterface,
        UpdatePlanPresenterInterface,
        UpdateItemPresenterInterface,
        CreateItemPresenterInterface,
        DeleteItemPresenterInterface,
        CanUndoRedoPresenterInterface,
        AddActionPresenterInterface,
        UndoActionPresenterInterface,
        RedoActionPresenterInterface,
        ClearHistoryPresenterInterface
{
    private _viewModel = new ViewModel();
    private _plans: Plan[] = [];
    private _activePlan: Plan | undefined = undefined;

    get viewModel(): ViewModel {
        return this._viewModel;
    }

    get plans(): Plan[] {
        return this._plans;
    }

    public presentCreatePlan(response: CreatePlanResponse): void {
        this._plans = [...this._plans, response.plan!];
        this._activePlan = response.plan;
        this.updateViewPlans();
    }

    public presentDeletePlan(response: DeletePlanResponse): void {
        const index = this._plans.findIndex(
            (p) => p.id === response.deletedPlan!.id
        );
        if (index !== -1) {
            this._plans.splice(index, 1);
        }
        this._activePlan = undefined;
        this.updateViewPlans();
    }

    public presentGetPlan(response: GetPlanResponse): void {
        const index = this._plans.findIndex((p) => p.id === response.plan!.id);
        if (index === -1) {
            this._plans.push(response.plan!);
        } else {
            this._plans[index] = response.plan!;
        }
        this._activePlan = response.plan;
        this.updateViewPlans();
    }

    public presentGetPlans(response: GetPlansResponse): void {
        this._plans = response.plans;
        this._activePlan = response.plans[0];
        this.updateViewPlans();
    }

    public presentLoadPlan(response: LoadPlanResponse): void {
        const res = new GetPlanResponse();
        res.plan = response.plan;
        this.presentGetPlan(res);
    }

    public presentSavePlan(response: SavePlanResponse): void {
        const res = new GetPlanResponse();
        res.plan = response.savedPlan;
        this.presentGetPlan(res);
    }

    public presentUpdatePlan(response: UpdatePlanResponse): void {
        const res = new GetPlanResponse();
        res.plan = response.updatedPlan;
        this.presentGetPlan(res);
    }

    public presentUpdateItem(response: UpdateItemResponse): void {
        const planIndex = this._plans.findIndex(
            (p) => p.id === response.planId
        );
        if (planIndex === -1) throw new Error('Plan not found');

        const layerIndex = this._plans[planIndex].layers.findIndex(
            (l) => l.id === response.layerId
        );
        if (layerIndex === -1) throw new Error('Layer not found');

        const index = this._plans[planIndex].layers[
            layerIndex
        ].children.findIndex((i) => i.id === response.updatedItem!.id);
        this._plans[planIndex].layers[layerIndex].children[index] =
            response.updatedItem!;
        this.updateViewPlans();
    }

    public presentCreateItem(response: CreateItemResponse): void {
        const planIndex = this._plans.findIndex(
            (p) => p.id === response.planId
        );
        if (planIndex === -1) throw new Error('Plan not found');

        const layerIndex = this._plans[planIndex].layers.findIndex(
            (l) => l.id === response.layerId
        );
        if (layerIndex === -1) throw new Error('Layer not found');

        this._plans[planIndex].layers[layerIndex].children.push(response.item!);
        this.updateViewPlans();
    }

    public presentDeleteItem(response: DeleteItemResponse): void {
        const planIndex = this._plans.findIndex(
            (p) => p.id === response.planId
        );
        if (planIndex === -1) throw new Error('Plan not found');

        const layerIndex = this._plans[planIndex].layers.findIndex(
            (l) => l.id === response.layerId
        );
        if (layerIndex === -1) throw new Error('Layer not found');

        const itemIdex = this._plans[planIndex].layers[
            layerIndex
        ].children.findIndex((i) => i.id === response.deletedItem!.id);

        if (itemIdex !== -1) {
            this._plans[planIndex].layers[layerIndex].children.splice(
                itemIdex,
                1
            );
        }

        this.updateViewPlans();
    }

    public presentCanUndoRedo(response: CanUndoRedoResponse): void {
        this.viewModel.update({
            canUndo: response.canUndo,
            canRedo: response.canRedo,
        });
    }

    public presentAddAction(_: AddActionResponse): void {
        return;
    }

    public presentUndoAction(response: UndoActionResponse): void {
        const res = new GetPlanResponse();
        res.plan = response.updatedPlan;
        this.presentGetPlan(res);
    }

    public presentRedoAction(response: RedoActionResponse): void {
        const res = new GetPlanResponse();
        res.plan = response.updatedPlan;
        this.presentGetPlan(res);
    }

    public presentClearHistory(_: ClearHistoryResponse): void {
        return;
    }

    private updateViewPlans(): void {
        const plans = this._plans.map(
            (plan) =>
                new PlanViewModel(
                    plan.id,
                    plan.name,
                    plan.layers.map(
                        (layer) =>
                            new LayerViewModel(
                                layer.id,
                                layer.name,
                                layer.children.map(
                                    (item) =>
                                        new ItemViewModel(
                                            item.id,
                                            item.type,
                                            item.name,
                                            item.shape,
                                            item.fillcolor,
                                            item.strokecolor,
                                            item.strokeWidth,
                                            item.position,
                                            item.locked,
                                            item.visible,
                                            item.rotation,
                                            item.scale
                                        )
                                )
                            )
                    )
                )
        );

        this.viewModel.update({
            activePlan: plans.find((p) => p.id == this._activePlan!.id),
            plans: plans,
        });
    }
}
