import { Item, Layer, Plan } from '../../../domain/model';

export class PlanViewModel {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly layers: LayerViewModel[]
    ) {}
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
    public plans: PlanViewModel[] = [];

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

    public toModel(): Plan[] {
        return this.plans.map(
            (p) =>
                new Plan(
                    p.id,
                    p.name,
                    p.layers.map(
                        (l) =>
                            new Layer(
                                l.id,
                                l.name,
                                l.children.map(
                                    (i) =>
                                        new Item(
                                            i.id,
                                            i.type,
                                            i.name,
                                            i.shape,
                                            i.fillcolor,
                                            i.strokecolor,
                                            i.strokeWidth,
                                            i.locked,
                                            i.visible,
                                            i.position,
                                            i.rotation,
                                            i.scale
                                        )
                                )
                            )
                    )
                )
        );
    }
}
