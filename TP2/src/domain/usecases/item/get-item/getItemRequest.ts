export class GetItemRequest {
    constructor(
        public readonly itemId: string,
        public readonly planId: string
    ) {}
}
