import { Icon } from '@fortawesome/fontawesome-svg-core';

export abstract class StatusbarAction {
    public abstract readonly title: string;

    public abstract readonly icon: Icon;

    public abstract readonly onclick: () => void;

    public abstract isDisabled(): boolean;

    public createElement(): HTMLButtonElement {
        const element = document.createElement('button');
        element.classList.add('action-btn');
        element.title = this.title;
        element.appendChild(this.icon.node[0]);
        element.addEventListener('click', (_) => this.onclick());

        return element;
    }
}
