import { RedoActionResponse } from './redoActionResponse';

export interface RedoActionPresenterInterface {
    presentRedoAction(response: RedoActionResponse): void;
}
