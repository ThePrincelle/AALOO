import './toolbox.scss';

export abstract class Toolbox {
    protected abstract readonly title: string;

    protected element?: HTMLElement;

    public constructor() {}

    public get visible(): boolean {
        return this.element?.style.display == 'flex';
    }

    public set visible(value: boolean) {
        if (this.element) {
            this.element.style.display = value ? 'flex' : 'none';
        }
    }

    public createElement(action?: HTMLElement): HTMLElement {
        this.element = document.createElement('div');

        this.element.style.display = 'none';
        this.element.classList.add('toolbox');

        const headingElement = document.createElement('div');
        headingElement.classList.add('toolbox-heading');
        const titleElement = document.createElement('div');

        titleElement.classList.add('toolbox-title');
        titleElement.innerText = this.title;

        headingElement.appendChild(titleElement);

        if (action) {
            action.classList.add('toolbox-action');
            headingElement.appendChild(action);
        }

        this.element.appendChild(headingElement);

        return this.element;
    }
}
