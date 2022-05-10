import { HistoryRepositoryInterface } from '../historyRepositoryInterface';
import { UndoActionPresenterInterface } from './undoActionPresenterInterface';
import { UndoActionResponse } from './undoActionResponse';

export class UndoAction {
    constructor(private repository: HistoryRepositoryInterface) {}

    async execute(presenter: UndoActionPresenterInterface) {
        const response = new UndoActionResponse();
        const { canUndo } = await this.repository.canUndoRedo();

        if (!canUndo) {
            response.cannotUndo = true;
            presenter.presentUndoAction(response);
            return;
        }

        const plan = await this.repository.undo();
        response.updatedPlan = plan;

        presenter.presentUndoAction(response);
    }
}
