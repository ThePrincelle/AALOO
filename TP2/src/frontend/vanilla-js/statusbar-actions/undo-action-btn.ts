import { faRotateBackward } from '@fortawesome/free-solid-svg-icons';
import { StatusbarAction } from '../statusbar/statusbar-action';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { PlanController, ViewModel } from '../../interface-adapter';

export class UndoActionBtn extends StatusbarAction {
    public readonly title = 'Annuler la dernière action';
    public readonly icon = icon(faRotateBackward);

    public readonly onclick = () => {
        if (this.viewModel.canUndo) {
            this.controller.undo();
        }
    };

    public isDisabled(): boolean {
        return !this.viewModel.canUndo;
    }

    constructor(
        private readonly controller: PlanController,
        private readonly viewModel: ViewModel
    ) {
        super();
    }
}
