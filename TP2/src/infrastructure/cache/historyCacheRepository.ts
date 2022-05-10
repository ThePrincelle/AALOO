import { Plan } from '../../domain/model';
import { HistoryRepositoryInterface } from '../../domain/usecases';

export class HistoryCacheRepository implements HistoryRepositoryInterface {
    private undoStack: Plan[] = [];
    private redoStack: Plan[] = [];

    public async canUndoRedo(): Promise<{
        canUndo: boolean;
        canRedo: boolean;
    }> {
        return {
            canUndo: this.undoStack.length > 1,
            canRedo: this.redoStack.length > 0,
        };
    }

    public async undo(): Promise<Plan | undefined> {
        const plan = this.undoStack.pop();
        if (plan) {
            this.redoStack.push(plan);
        }
        return JSON.parse(JSON.stringify(this.undoStack.at(-1)));
    }

    public async redo(): Promise<Plan | undefined> {
        const plan = this.redoStack.pop();
        if (plan) {
            this.undoStack.push(plan);
        }
        return JSON.parse(JSON.stringify(plan));
    }

    public async add(plan: Plan): Promise<void> {
        this.undoStack.push(JSON.parse(JSON.stringify(plan)));
        this.redoStack = [];
    }

    public async clear(): Promise<void> {
        this.undoStack = [];
        this.redoStack = [];
    }
}
