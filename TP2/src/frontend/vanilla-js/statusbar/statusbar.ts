import { icon } from '@fortawesome/fontawesome-svg-core';
import {
    faFloppyDisk,
    faRotateBackward,
    faRotateForward,
} from '@fortawesome/free-solid-svg-icons';
import { PlanController, ViewModel } from '../../interface-adapter';
import './statusbar.scss';

export class Statusbar {
    private static readonly saveIcon = icon(faFloppyDisk);
    private static readonly undoIcon = icon(faRotateBackward);
    private static readonly redoIcon = icon(faRotateForward);

    public static create(
        host: HTMLElement,
        controller: PlanController,
        viewModel: ViewModel
    ): Statusbar {
        const toolbarElement = this.build(
            document.createElement('div'),
            controller,
            viewModel
        );

        host.appendChild(toolbarElement);

        return new Statusbar(controller, viewModel, toolbarElement);
    }

    private constructor(
        private readonly controller: PlanController,
        private readonly viewModel: ViewModel,
        private element: HTMLElement
    ) {
        this.viewModel.onChange(
            (viewModel: ViewModel, _newValues: Partial<ViewModel>) => {
                Statusbar.build(this.element, this.controller, viewModel);
            }
        );
    }

    private static build(
        element: HTMLElement,
        controller: PlanController,
        viewModel: ViewModel
    ): HTMLElement {
        element.innerHTML = '';

        element.classList.add('statusbar');

        const leadingActionsContainer = document.createElement('div');
        leadingActionsContainer.classList.add('actions-list');
        element.appendChild(leadingActionsContainer);

        const saveBtnElement = document.createElement('button');
        saveBtnElement.classList.add('action-btn');
        saveBtnElement.title = 'Sauvegarder le plan';
        saveBtnElement.appendChild(this.saveIcon.node[0]);
        leadingActionsContainer.appendChild(saveBtnElement);

        const undoBtnElement = document.createElement('button');
        undoBtnElement.classList.add('action-btn');
        undoBtnElement.title = 'Annuler la dernière action';
        undoBtnElement.disabled = !viewModel.canUndo;
        undoBtnElement.appendChild(this.undoIcon.node[0]);
        if (viewModel.canUndo) {
            undoBtnElement.addEventListener('click', (_) => {
                controller.undo();
            });
        }
        leadingActionsContainer.appendChild(undoBtnElement);

        const redoBtnElement = document.createElement('button');
        redoBtnElement.classList.add('action-btn');
        redoBtnElement.title = 'Rétablir la dernière action';
        redoBtnElement.disabled = !viewModel.canRedo;
        redoBtnElement.appendChild(this.redoIcon.node[0]);
        if (viewModel.canRedo) {
            redoBtnElement.addEventListener('click', (_) => {
                controller.redo();
            });
        }
        leadingActionsContainer.appendChild(redoBtnElement);

        const projectNameElement = document.createElement('span');
        projectNameElement.contentEditable = 'true';
        projectNameElement.spellcheck = false;
        projectNameElement.classList.add('statusbar-title');
        projectNameElement.appendChild(
            document.createTextNode(viewModel.activePlan?.name ?? 'Untitled')
        );
        projectNameElement.addEventListener('input', (_) => {
            Statusbar.updatePlanTitle(
                projectNameElement,
                controller,
                viewModel
            );
        });
        projectNameElement.addEventListener('focusout', (_) => {
            Statusbar.updatePlanTitle(
                projectNameElement,
                controller,
                viewModel
            );
            controller.savePlan({
                ...viewModel.activePlan!.toModel(),
                name: projectNameElement.innerText,
            });
        });
        element.appendChild(projectNameElement);

        const trailingActionsContainer = document.createElement('div');
        trailingActionsContainer.classList.add('actions-list');
        element.appendChild(trailingActionsContainer);

        return element;
    }

    private static updatePlanTitle(
        element: HTMLElement,
        controller: PlanController,
        viewModel: ViewModel
    ): void {
        const value = element.innerText;
        let newValue = value.replace('\n', '');
        newValue = newValue.length ? newValue : 'Untitled';

        if (newValue !== value) {
            element.innerText = newValue;
            controller.savePlan({
                ...viewModel.activePlan!.toModel(),
                name: newValue,
            });
        }
    }
}
