import { UndoActionResponse } from './undoActionResponse';

export interface UndoActionPresenterInterface {
    presentUndoAction(response: UndoActionResponse): void;
}
