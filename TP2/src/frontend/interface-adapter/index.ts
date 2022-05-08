import { PlanFactory } from './plan/planFactory';
import { PlanLocalStorageRepository } from '../../infrastructure/local-storage/planLocalStorageRepository';

export * from './plan/';

export const planRepository = new PlanLocalStorageRepository(
    window.localStorage
);
export const planFactory = new PlanFactory(planRepository);
