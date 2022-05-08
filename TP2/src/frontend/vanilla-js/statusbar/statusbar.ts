import { ViewModel } from '../../interface-adapter';
import './statusbar.scss';

export class Statusbar {
    public static create(host: HTMLElement, viewModel: ViewModel): Statusbar {
        const toolbarElement = this.build(
            document.createElement('div'),
            viewModel
        );

        host.appendChild(toolbarElement);

        return new Statusbar(viewModel, toolbarElement);
    }

    private constructor(
        private readonly viewModel: ViewModel,
        private element: HTMLElement
    ) {
        this.viewModel.onChange(
            (viewModel: ViewModel, _newValues: Partial<ViewModel>) => {
                Statusbar.build(this.element, viewModel);
            }
        );
    }

    private static build(
        element: HTMLElement,
        viewModel: ViewModel
    ): HTMLElement {
        element.innerHTML = '';

        element.classList.add('statusbar');

        const projectNameElement = document.createElement('span');
        projectNameElement.contentEditable = 'true';
        projectNameElement.spellcheck = false;
        projectNameElement.classList.add('statusbar-title');
        projectNameElement.appendChild(
            document.createTextNode(viewModel.plans.at(0)?.name ?? 'Untitled')
        );
        projectNameElement.addEventListener('input', (_) => {
            Statusbar.updatePlanTitle(projectNameElement);
        });
        projectNameElement.addEventListener('focusout', (_) => {
            Statusbar.updatePlanTitle(projectNameElement);
            // TODO: Update plan name through controller
        });
        element.appendChild(projectNameElement);

        return element;
    }

    private static updatePlanTitle(element: HTMLElement): void {
        const value = element.innerText;
        let newValue = value.replace('\n', '');
        newValue = newValue.length ? newValue : 'Untitled';

        if (newValue !== value) {
            element.innerText = newValue;
            // TODO: Update plan name through controller
        }
    }
}
