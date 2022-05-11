import { PlanFactory } from './plan/planFactory';
import { PlanLocalStorageRepository } from '../../infrastructure/local-storage/planLocalStorageRepository';
import { HistoryCacheRepository } from '../../infrastructure/cache/historyCacheRepository';

export * from './plan/';

export const planRepository = new PlanLocalStorageRepository(
    window.localStorage
);
export const historyRepository = new HistoryCacheRepository();
export const planFactory = new PlanFactory(planRepository, historyRepository);
