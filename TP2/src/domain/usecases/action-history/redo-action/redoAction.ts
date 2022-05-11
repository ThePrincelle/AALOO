import { HistoryRepositoryInterface } from '../historyRepositoryInterface';
import { RedoActionPresenterInterface } from './redoActionPresenterInterface';
import { RedoActionResponse } from './redoActionResponse';

export class RedoAction {
    constructor(private repository: HistoryRepositoryInterface) {}

    async execute(presenter: RedoActionPresenterInterface) {
        const response = new RedoActionResponse();
        const { canRedo } = await this.repository.canUndoRedo();

        if (!canRedo) {
            response.cannotRedo = true;
            presenter.presentRedoAction(response);
            return;
        }

        const plan = await this.repository.redo();
        response.updatedPlan = plan;

        presenter.presentRedoAction(response);
    }
}
