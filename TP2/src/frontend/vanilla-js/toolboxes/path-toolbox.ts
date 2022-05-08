import { Toolbox } from '../toolbox';
import './path-toolbox.scss';

export class PathToolbox extends Toolbox {
    protected readonly title = 'Path';

    private closedPath: boolean = true;

    public onPathClosed: Function | null = null;

    public get isPathClosed(): boolean {
        return this.closedPath;
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        element.classList.add('path-toolbox');

        const closePathInputElement = document.createElement('div');

        closePathInputElement.classList.add('checkbox-input');

        const closePathCheckboxElement = document.createElement('input');

        closePathCheckboxElement.setAttribute('type', 'checkbox');
        closePathCheckboxElement.setAttribute('id', 'path-checkbox');
        closePathCheckboxElement.setAttribute(
            'checked',
            this.closedPath.toString()
        );
        closePathCheckboxElement.classList.add('input-close-path-checkbox');
        closePathCheckboxElement.addEventListener('click', () =>
            this.closePath()
        );
        closePathInputElement.appendChild(closePathCheckboxElement);

        const closePathLabelElement = document.createElement('label');

        closePathLabelElement.setAttribute('for', 'path-checkbox');
        closePathLabelElement.classList.add('input-close-path-label');
        closePathLabelElement.appendChild(
            document.createTextNode('Close path')
        );
        closePathInputElement.appendChild(closePathLabelElement);

        element.appendChild(closePathInputElement);

        return element;
    }

    private closePath(): void {
        this.closedPath = !this.closedPath;
        this.onPathClosed?.call(this);
    }
}
