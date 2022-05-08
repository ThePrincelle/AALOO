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
        UpdatePlanPresenterInterface
{
    private _viewModel = new ViewModel();
    private _plans: Plan[] = [];

    get viewModel(): ViewModel {
        return this._viewModel;
    }

    get plans(): Plan[] {
        return this._plans;
    }

    public presentCreatePlan(response: CreatePlanResponse): void {
        this._plans = [...this._plans, response.plan!];
        this.updateViewPlans();
    }

    public presentDeletePlan(response: DeletePlanResponse): void {
        const index = this._plans.findIndex(
            (p) => p.id === response.deletedPlan!.id
        );
        if (index !== -1) {
            this._plans.splice(index, 1);
        }
        this.updateViewPlans();
    }

    public presentGetPlan(response: GetPlanResponse): void {
        const index = this._plans.findIndex((p) => p.id === response.plan!.id);
        if (index === -1) {
            this._plans.push(response.plan!);
        } else {
            this._plans[index] = response.plan!;
        }
        this.updateViewPlans();
    }

    public presentGetPlans(response: GetPlansResponse): void {
        this._plans = response.plans;
        this.updateViewPlans();
    }

    public presentLoadPlan(response: LoadPlanResponse): void {
        const res = new GetPlanResponse();
        res.plan = response.plan;
        this.presentGetPlan(res);
    }

    public presentSavePlan(_response: SavePlanResponse): void {
        this.updateViewPlans();
    }

    public presentUpdatePlan(response: UpdatePlanResponse): void {
        const res = new GetPlanResponse();
        res.plan = response.updatedPlan;
        this.presentGetPlan(res);
    }

    private updateViewPlans(): void {
        this.viewModel.update({
            plans: this._plans.map(
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
                                                item.strokeWidth
                                            )
                                    )
                                )
                        )
                    )
            ),
        });
    }
}