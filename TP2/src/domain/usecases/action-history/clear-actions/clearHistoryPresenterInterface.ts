import { ClearHistoryResponse } from './clearHistoryResponse';

export interface ClearHistoryPresenterInterface {
    presentClearHistory(response: ClearHistoryResponse): void;
}
