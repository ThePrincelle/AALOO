import { Plan } from '../../domain/model';
import { PlanRepositoryInterface } from '../../domain/usecases/plan';
import { JsonOf } from './type/jsonOf';

export class PlanLocalStorageRepository implements PlanRepositoryInterface {
    private key: string = 'paper-plans';
    private plans: Plan[] = [];

    constructor(private storage: Storage) {
        if (!this.storage.getItem(this.key)) {
            this.saveList([]);
        }
    }

    //#region interface methods

    /** @inheritdoc */
    public async nextId(): Promise<string> {
        // TODO: Better implementation (e.g. UUID, Singleton with cache, etc.)
        const nextId = this.storage.getItem('paper-nextId');
        const nextIdNumber = nextId ? parseInt(nextId, 10) : 0;
        const nextIdString = (nextIdNumber + 1).toString();
        this.storage.setItem('paper-nextId', nextIdString);

        return nextIdString;
    }

    /** @inheritdoc */
    public async create(plan: Plan): Promise<void> {
        this.plans = this.getList();
        const index = this.plans.findIndex((p) => p.id === plan.id);
        if (index !== -1) {
            throw new Error(`Plan '${plan.name} (${plan.id})' already exists`);
        }
        this.plans.push(JSON.parse(JSON.stringify(plan)));
        this.saveList(this.plans);
    }

    /**
     * Get a plan from the cached plans,
     * fallback to localstorage if not found.
     *
     * @param planId The id of the plan to get.
     * @returns {Promise<Plan | undefined>}
     *      The plan if found, undefined otherwise.
     */
    public async get(planId: string): Promise<Plan | undefined> {
        // Note: does not call local storage if it is found in the cache
        let plan = this.plans.find((p) => p.id === planId);
        plan = plan ?? (await this.load(planId));

        return JSON.parse(JSON.stringify(plan));
    }

    /** @inheritdoc */
    public async getAll(): Promise<Plan[]> {
        this.plans = this.getList();

        if (this.plans.length === 0) {
            const id = await this.nextId();
            await this.create(new Plan(id));
        }

        return JSON.parse(JSON.stringify(this.plans));
    }

    /**
     * Update the plan but does not save to the local storage.
     *
     * @param plan The plan to update.
     */
    public async update(plan: Plan): Promise<void> {
        plan = JSON.parse(JSON.stringify(plan));
        this.plans = this.getList();
        const index = this.plans.findIndex((p) => p.id === plan.id);
        if (index === -1) {
            this.plans.push(plan);
        } else {
            this.plans[index] = plan;
        }
    }

    /** @inheritdoc */
    public async delete(planId: string): Promise<Plan | undefined> {
        let deletedPlan: Plan | undefined = undefined;
        this.plans = this.getList();
        const index = this.plans.findIndex((p) => p.id === planId);
        if (index !== -1) {
            const deletedPlans = this.plans.splice(index, 1);
            deletedPlan = deletedPlans.at(0);
            this.saveList(this.plans);
        }

        return deletedPlan;
    }

    /**
     * Update the plan and saves it to the local storage.
     *
     * @param plan The plan to save.
     */
    public async save(plan: Plan): Promise<void> {
        this.update(plan);
        this.saveList(this.plans);
    }

    /**
     * Load a plan from the local storage.
     *
     * @param planId The id of the plan to load.
     * @returns {Promise<Plan | undefined>}
     *      The plan if found, undefined otherwise.
     */
    public async load(planId: string): Promise<Plan | undefined> {
        this.plans = this.getList();
        const plan = this.plans.find((p) => p.id === planId);

        return JSON.parse(JSON.stringify(plan));
    }

    //#endregion

    //#region private methods

    private saveList(list: Plan[]): void {
        const listAsJson: string = JSON.stringify(list);
        this.storage.setItem(this.key, listAsJson);
    }

    private getList(): Plan[] {
        const rawList: JsonOf<Plan>[] = JSON.parse(
            this.storage.getItem(this.key) || '[]'
        );

        return rawList.map((raw) => new Plan(raw.id, raw.name, raw.layers));
    }

    //#endregion
}
