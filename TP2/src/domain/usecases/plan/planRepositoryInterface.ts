import { Plan } from '../../model';

export interface PlanRepositoryInterface {
    /**
     * Get a new unique identifier.
     *
     * @returns {Promise<string>} The next unique id.
     */
    nextId(): Promise<string>;

    /**
     * Create a new plan.
     *
     * @param plan The plan to create.
     */
    create(plan: Plan): Promise<void>;

    /**
     * Get a plan with the given id.
     *
     * @returns {Promise<Plan | undefined>}
     *      The plan with the given id, if it exists.
     */
    get(planId: string): Promise<Plan | undefined>;

    /**
     * Get all existing plans.
     *
     * @returns {Promise<Plan[]>} All plans.
     */
    getAll(): Promise<Plan[]>;

    /**
     * Update a given plan.
     *
     * @param plan The plan to update.
     */
    update(plan: Plan): Promise<void>;

    /**
     * Delete the plan with the given id.
     *
     * @param planId Plan id to delete
     * @returns {Promise<Plan | undefined>}
     *      The deleted plan if it exists.
     */
    delete(planId: string): Promise<Plan | undefined>;

    /**
     * Save a given plan, in a persistant storage.
     *
     * @param planId Plan id to delete
     */
    save(plan: Plan): Promise<void>;

    /**
     * Load a plan with the given id, from a persistant storage.
     *
     * @param planId Plan id to delete
     * @returns {Promise<Plan | undefined>}
     *      The plan with the given id, if it exists.
     */
    load(planId: string): Promise<Plan | undefined>;
}
