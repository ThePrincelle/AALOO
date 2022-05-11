import { HistoryRepositoryInterface } from '../historyRepositoryInterface';
import { CanUndoRedoPresenterInterface } from './canUndoRedoPresenterInterface';
import { CanUndoRedoResponse } from './canUndoRedoResponse';

export class CanUndoRedo {
    constructor(private repository: HistoryRepositoryInterface) {}

    async execute(presenter: CanUndoRedoPresenterInterface) {
        const response = new CanUndoRedoResponse();
        const res = await this.repository.canUndoRedo();
        response.canRedo = res.canRedo;
        response.canUndo = res.canUndo;

        presenter.presentCanUndoRedo(response);
    }
}
