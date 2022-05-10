import { Plan } from '../../model';

export interface HistoryRepositoryInterface {
    canUndoRedo(): Promise<{ canUndo: boolean; canRedo: boolean }>;

    add(plan: Plan): Promise<void>;

    undo(): Promise<Plan | undefined>;

    redo(): Promise<Plan | undefined>;

    clear(): Promise<void>;
}
