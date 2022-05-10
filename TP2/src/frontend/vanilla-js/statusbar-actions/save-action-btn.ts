import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { StatusbarAction } from '../statusbar/statusbar-action';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { PlanController, ViewModel } from '../../interface-adapter';

export class SaveActionBtn extends StatusbarAction {
    public readonly title = 'Sauvegarder le plan';
    public readonly icon = icon(faFloppyDisk);

    public readonly onclick = () => {
        // TODO: save the plan
        this.controller;
        this.viewModel;
    };

    public isDisabled(): boolean {
        return false;
    }

    constructor(
        private readonly controller: PlanController,
        private readonly viewModel: ViewModel
    ) {
        super();
    }
}
