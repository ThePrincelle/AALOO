export class CreateLayerRequest {
    constructor(
        public readonly name: string,
        public readonly planId: string,
        public readonly id?: string
    ) {}
}
