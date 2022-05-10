import { HistoryRepositoryInterface } from '../historyRepositoryInterface';
import { AddActionPresenterInterface } from './addActionPresenterInterface';
import { AddActionRequest } from './addActionRequest';
import { AddActionResponse } from './addActionResponse';

export class AddAction {
    constructor(private repository: HistoryRepositoryInterface) {}

    async execute(
        request: AddActionRequest,
        presenter: AddActionPresenterInterface
    ) {
        const response = new AddActionResponse();

        await this.repository.add(request.plan);

        presenter.presentAddAction(response);
    }
}
