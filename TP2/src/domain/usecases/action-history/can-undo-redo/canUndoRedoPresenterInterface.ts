import { CanUndoRedoResponse } from './canUndoRedoResponse';

export interface CanUndoRedoPresenterInterface {
    presentCanUndoRedo(response: CanUndoRedoResponse): void;
}
