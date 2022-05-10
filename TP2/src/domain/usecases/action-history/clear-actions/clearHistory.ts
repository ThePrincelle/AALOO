import { HistoryRepositoryInterface } from '../historyRepositoryInterface';
import { ClearHistoryPresenterInterface } from './clearHistoryPresenterInterface';
import { ClearHistoryResponse } from './clearHistoryResponse';

export class ClearHistory {
    constructor(private repository: HistoryRepositoryInterface) {}

    async execute(presenter: ClearHistoryPresenterInterface) {
        const response = new ClearHistoryResponse();

        await this.repository.clear();

        presenter.presentClearHistory(response);
    }
}
