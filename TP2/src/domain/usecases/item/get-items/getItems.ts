// import { ItemRepositoryInterface } from '../itemRepositoryInterface';
// import { GetItemsPresenterInterface } from './getItemsPresenterInterface';
// import { GetItemsRequest } from './getItemsRequest';
// import { GetItemsResponse } from './getItemsResponse';

// export class GetItems {
//     constructor(private repository: ItemRepositoryInterface) {}

//     async execute(
//         request: GetItemsRequest,
//         presenter: GetItemsPresenterInterface
//     ) {
//         const response = new GetItemsResponse();
//         response.items = await this.repository.getAll(request.planId);

//         presenter.presentGetItems(response);
//     }
// }
