import {
    CreatePlan,
    DeletePlan,
    GetPlan,
    GetPlans,
    LoadPlan,
    PlanRepositoryInterface,
    SavePlan,
    UpdatePlan,
} from '../../../domain/usecases';
import { PlanController } from './planController';
import { PlanUIPresenter } from './planUIPresenter';
import { ViewModel } from './viewModel';

export class PlanFactory {
    private instances: any = {};

    constructor(private readonly planRepository: PlanRepositoryInterface) {}

    get controller() {
        return this.reuseOrInstantiate(
            'PlanController',
            () =>
                new PlanController(
                    this.presenter,
                    this.presenter,
                    this.presenter,
                    this.presenter,
                    this.presenter,
                    this.presenter,
                    this.presenter,
                    new CreatePlan(this.planRepository),
                    new DeletePlan(this.planRepository),
                    new GetPlan(this.planRepository),
                    new GetPlans(this.planRepository),
                    new LoadPlan(this.planRepository),
                    new SavePlan(this.planRepository),
                    new UpdatePlan(this.planRepository)
                )
        );
    }

    get presenter(): PlanUIPresenter {
        return this.reuseOrInstantiate(
            'PlanPresenter',
            () => new PlanUIPresenter()
        );
    }

    get viewModel(): ViewModel {
        return this.presenter.viewModel;
    }

    private reuseOrInstantiate<T>(id: string, callback: () => T): T {
        if (this.instances[id] === undefined) {
            this.instances[id] = callback();
        }

        return this.instances[id];
    }
}
