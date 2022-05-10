import { PlanController, ViewModel } from '../../interface-adapter';
import { StatusbarAction } from './statusbar-action';
import './statusbar.scss';

export class StatusbarContainer {
    private readonly elementByAction = new Map<
        StatusbarAction,
        HTMLButtonElement
    >();

    public static create(
        host: HTMLElement,
        controller: PlanController,
        viewModel: ViewModel
    ): StatusbarContainer {
        const element = document.createElement('div');

        element.classList.add('statusbar-container');

        const leadingActionsContainer = document.createElement('div');
        leadingActionsContainer.classList.add(
            'actions-list',
            'actions-list-leading'
        );
        element.appendChild(leadingActionsContainer);

        const centerContainer = document.createElement('div');
        centerContainer.classList.add('actions-list', 'actions-list-center');
        element.appendChild(centerContainer);

        const trailingActionsContainer = document.createElement('div');
        trailingActionsContainer.classList.add(
            'actions-list',
            'actions-list-trailing'
        );
        element.appendChild(trailingActionsContainer);

        host.appendChild(element);

        return new StatusbarContainer(controller, viewModel, element);
    }

    private constructor(
        private readonly controller: PlanController,
        private readonly viewModel: ViewModel,
        private readonly element: HTMLElement
    ) {
        this.viewModel.onChange(
            (viewModel: ViewModel, _newValues: Partial<ViewModel>) => {
                this.build(this.element, this.controller, viewModel);
                this.elementByAction.forEach((element, action) => {
                    element.disabled = action.isDisabled();
                });
            }
        );
    }

    public addCenterItem(element: HTMLElement): void {
        this.element.lastChild?.appendChild(element);
    }

    public addLeadingAction(statusbarAction: StatusbarAction): void {
        const statusbarActionElement = statusbarAction.createElement();
        this.elementByAction.set(statusbarAction, statusbarActionElement);

        this.element.firstChild?.appendChild(statusbarActionElement);
    }

    public addTrailingAction(statusbarAction: StatusbarAction): void {
        const statusbarActionElement = statusbarAction.createElement();
        this.elementByAction.set(statusbarAction, statusbarActionElement);

        this.element.lastChild?.appendChild(statusbarActionElement);
    }

    private build(
        element: HTMLElement,
        controller: PlanController,
        viewModel: ViewModel
    ): void {
        element.children[1].innerHTML = '';

        const projectNameElement = document.createElement('span');
        projectNameElement.contentEditable = 'true';
        projectNameElement.spellcheck = false;
        projectNameElement.classList.add('statusbar-title');
        projectNameElement.appendChild(
            document.createTextNode(viewModel.activePlan?.name ?? 'Untitled')
        );
        projectNameElement.addEventListener('input', (_) => {
            StatusbarContainer.updatePlanTitle(
                projectNameElement,
                controller,
                viewModel
            );
        });
        projectNameElement.addEventListener('focusout', (_) => {
            StatusbarContainer.updatePlanTitle(
                projectNameElement,
                controller,
                viewModel
            );
            controller.savePlan({
                ...viewModel.activePlan!.toModel(),
                name: projectNameElement.innerText,
            });
        });
        element.children[1].appendChild(projectNameElement);
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
