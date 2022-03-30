import { Toolbox } from '../toolbox';

export class CreatorToolbox extends Toolbox {
    protected readonly title = 'Createur';

    public createElement(): HTMLElement {
        const element = super.createElement();

        element.classList.add('creator-toolbox');

        return element;
    }
}
