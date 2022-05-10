import {
    CreatePlan,
    DeletePlan,
    GetPlan,
    GetPlans,
    LoadPlan,
    PlanRepositoryInterface,
    SavePlan,
    UpdateItem,
    UpdatePlan,
    CanUndoRedo,
    UndoAction,
    RedoAction,
    HistoryRepositoryInterface,
    AddAction,
    ClearHistory,
} from '../../../domain/usecases';
import { PlanController } from './planController';
import { PlanUIPresenter } from './planUIPresenter';
import { ViewModel } from './viewModel';

export class PlanFactory {
    private instances: any = {};

    constructor(
        private readonly planRepository: PlanRepositoryInterface,
        private readonly historyRepository: HistoryRepositoryInterface
    ) {}

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
                    new CreatePlan(this.planRepository, this.historyRepository),
                    new DeletePlan(this.planRepository, this.historyRepository),
                    new GetPlan(this.planRepository),
                    new GetPlans(this.planRepository),
                    new LoadPlan(this.planRepository, this.historyRepository),
                    new SavePlan(this.planRepository),
                    new UpdatePlan(this.planRepository, this.historyRepository),

                    this.presenter,
                    new UpdateItem(this.planRepository, this.historyRepository),

                    this.presenter,
                    this.presenter,
                    this.presenter,
                    this.presenter,
                    this.presenter,
                    new CanUndoRedo(this.historyRepository),
                    new AddAction(this.historyRepository),
                    new UndoAction(this.historyRepository),
                    new RedoAction(this.historyRepository),
                    new ClearHistory(this.historyRepository)
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
