import { Item, Layer, Plan } from '../../../domain/model';

export class PlanViewModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly layers: LayerViewModel[]
    ) {}

    public toModel(): Plan {
        return new Plan(
            this.id,
            this.name,
            this.layers.map(
                (l) =>
                    new Layer(
                        l.id,
                        l.name,
                        l.children.map((i) => i as Item)
                    )
            )
        );
    }
}

export class LayerViewModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly children: ItemViewModel[]
    ) {}
}

export class ItemViewModel extends Item {}

export class ViewModel {
    public activePlan: PlanViewModel | undefined = undefined;
    public plans: PlanViewModel[] = [];
    public canUndo: boolean = false;
    public canRedo: boolean = false;

    private observers: ((
        viewModel: ViewModel,
        newValues: Partial<ViewModel>
    ) => any)[] = [];

    public update(values: Partial<ViewModel>) {
        Object.assign(this, values);
        this.observers.forEach((cb) => cb(this, values));
    }

    public onChange(
        callback: (viewModel: ViewModel, newValues: Partial<ViewModel>) => any
    ) {
        this.observers.push(callback);
    }
}
