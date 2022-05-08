export class DeleteItemRequest {
    constructor(
        public readonly itemId: string,
        public readonly planId: string,
        public readonly layerId: string
    ) {}
}
