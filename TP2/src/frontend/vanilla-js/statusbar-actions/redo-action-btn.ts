import { faRotateForward } from '@fortawesome/free-solid-svg-icons';
import { StatusbarAction } from '../statusbar/statusbar-action';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { PlanController, ViewModel } from '../../interface-adapter';

export class RedoActionBtn extends StatusbarAction {
    public readonly title = 'Rétablir la dernière action';
    public readonly icon = icon(faRotateForward);

    public readonly onclick = () => {
        if (this.viewModel.canUndo) {
            this.controller.redo();
        }
    };

    public isDisabled(): boolean {
        return !this.viewModel.canRedo;
    }

    constructor(
        private readonly controller: PlanController,
        private readonly viewModel: ViewModel
    ) {
        super();
    }
}
