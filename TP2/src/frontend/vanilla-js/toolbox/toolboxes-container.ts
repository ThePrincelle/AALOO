import { Toolbox } from './toolbox';
import './toolboxes-container.scss';

export class ToolboxesContainer {
    public static create(
        host: HTMLElement,
        isRightAligned: boolean
    ): ToolboxesContainer {
        const element = document.createElement('div');

        element.classList.add('toolboxes-container');
        element.classList.add(isRightAligned ? 'right' : 'left');

        host.appendChild(element);

        return new ToolboxesContainer(element);
    }

    private constructor(private readonly element: HTMLElement) {}

    public addToolbox(toolbox: Toolbox): void {
        this.element.appendChild(toolbox.createElement());
    }
}
