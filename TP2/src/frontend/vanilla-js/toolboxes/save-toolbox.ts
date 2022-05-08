import { PlanController, ViewModel } from '../../interface-adapter';
import { Toolbox } from '../toolbox';

export class SaveToolbox extends Toolbox {
    protected readonly title = 'Projet';

    public constructor(
        private readonly controller: PlanController,
        private readonly viewModel: ViewModel
    ) {
        super();
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        const saveButtonElement = document.createElement('button');

        saveButtonElement.classList.add('btn');
        saveButtonElement.appendChild(
            document.createTextNode('Sauvegarder (localStorage)')
        );

        saveButtonElement.addEventListener('click', () => this.savePlan());

        element.appendChild(saveButtonElement);

        const restoreButtonElement = document.createElement('button');

        restoreButtonElement.classList.add('btn');
        restoreButtonElement.appendChild(document.createTextNode('Restaurer'));

        restoreButtonElement.addEventListener('click', () =>
            this.restorePlan()
        );

        element.appendChild(restoreButtonElement);

        this.visible = true;

        return element;
    }

    private savePlan(): void {
        if (this.viewModel.plans.length > 0)
            this.controller.savePlan(this.viewModel.toModel().at(0)!);
    }

    private restorePlan(): void {
        if (this.viewModel.plans.length > 0)
            this.controller.loadPlan(this.viewModel.plans.at(0)!.id);
    }
}
