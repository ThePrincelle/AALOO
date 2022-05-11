// import { ItemRepositoryInterface } from '../itemRepositoryInterface';
// import { GetItemPresenterInterface } from './getItemPresenterInterface';
// import { GetItemRequest } from './getItemRequest';
// import { GetItemResponse } from './getItemResponse';

// export class GetItem {
//     constructor(private repository: ItemRepositoryInterface) {}

//     async execute(
//         request: GetItemRequest,
//         presenter: GetItemPresenterInterface
//     ) {
//         const response = new GetItemResponse();
//         response.item = await this.repository.get(
//             request.itemId,
//             request.planId
//         );

//         presenter.presentGetItem(response);
//     }
// }
