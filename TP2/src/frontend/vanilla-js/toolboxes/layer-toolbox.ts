import { icon } from '@fortawesome/fontawesome-svg-core';
import {
    faAdd,
    faEye,
    faEyeSlash,
    faLock,
    faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { Toolbox } from '../toolbox';
import './layer-toolbox.scss';
import {
    ItemViewModel,
    LayerViewModel,
    PlanController,
    ViewModel,
} from '../../interface-adapter/plan';

export class LayerToolbox extends Toolbox {
    protected readonly title = 'Layers';

    private planId: string | undefined;

    private readonly addIcon = icon(faAdd);
    private readonly eyeIcon = icon(faEye);
    private readonly eyeSlashIcon = icon(faEyeSlash);
    private readonly lockIcon = icon(faLock);
    private readonly unlockIcon = icon(faUnlock);

    public constructor(
        private readonly controller: PlanController,
        private readonly viewModel: ViewModel
    ) {
        super();
        this.planId = this.viewModel.plans.at(0)?.id;
    }

    public createElement(): HTMLElement {
        const addLayerElement = document.createElement('button');
        addLayerElement.classList.add('new-layer-button');
        addLayerElement.title = 'Ajouter un layer';
        addLayerElement.appendChild(this.addIcon.node[0]);
        addLayerElement.onclick = () => {
            // TODO: Create layer from controller
            console.log('TODO: Create layer');
            // TODO: Refresh view with presenter
            this.controller.getPlans();
        };

        const element = super.createElement(addLayerElement);
        element.id = 'layer-toolbox';

        const layerListElement: HTMLElement = document.createElement('ul');
        layerListElement.classList.add('layer-list');

        element.appendChild(layerListElement);

        // Set viewModel update callback
        this.viewModel.onChange(
            (_viewModel: ViewModel, _newValues: Partial<ViewModel>) => {
                this.planId = this.viewModel.plans.at(0)?.id;

                // Reset the layer list
                layerListElement.innerHTML = '';

                // Create a layer drawer for each layer
                this.viewModel?.plans.at(0)?.layers.forEach((layer) => {
                    layerListElement.appendChild(this.createLayerDrawer(layer));
                });
            }
        );

        // Populate this view with data
        this.controller.getPlans();

        this.visible = true;

        return element;
    }

    private createLayerDrawer(layerVM: LayerViewModel): HTMLElement {
        const element = document.createElement('li');
        element.classList.add('layer-drawer');

        const layer = document.createElement('details');
        layer.open = true;
        const layerTitle = document.createElement('summary');
        layerTitle.classList.add('layer-drawer-title');
        layerTitle.classList.add('disable-select');
        layerTitle.appendChild(document.createTextNode(layerVM.name));
        layer.appendChild(layerTitle);

        const layerListElement = document.createElement('ul');
        layerListElement.classList.add('layer-item-list');

        // Create an item element for each item in the layer
        layerVM.children.forEach((itemVM) => {
            layerListElement.appendChild(
                this.createItemElement(itemVM, layerVM.id)
            );
        });

        layer.appendChild(layerListElement);
        element.appendChild(layer);

        return element;
    }

    private createItemElement(
        itemVM: ItemViewModel,
        layerId: string
    ): HTMLElement {
        const element = document.createElement('li');
        element.classList.add('layer-item');

        const itemElement = document.createElement('div');
        itemElement.appendChild(document.createTextNode(itemVM.name));
        itemElement.classList.add('layer-item-element');
        itemElement.classList.add('disable-select');

        element.appendChild(itemElement);
        this.addIcons(element, itemVM, layerId);

        return element;
    }

    private addIcons(
        element: HTMLElement,
        itemVM: ItemViewModel,
        layerId: string
    ): HTMLElement {
        const iconsContainer = document.createElement('div');
        iconsContainer.classList.add('icons-container');

        const showButtonElement = document.createElement('button');
        showButtonElement.classList.add('item-button');
        showButtonElement.appendChild(
            itemVM.visible ? this.eyeIcon.node[0] : this.eyeSlashIcon.node[0]
        );
        showButtonElement.setAttribute(
            'aria-checked',
            (!itemVM.visible).toString()
        );
        showButtonElement.onclick = () => {
            this.controller.updateItem(
                { ...itemVM, visible: !itemVM.visible },
                this.planId!,
                layerId
            );
        };
        iconsContainer.appendChild(showButtonElement);

        const lockButtonElement = document.createElement('button');
        lockButtonElement.classList.add('item-button');
        lockButtonElement.appendChild(
            itemVM.locked ? this.lockIcon.node[0] : this.unlockIcon.node[0]
        );
        lockButtonElement.setAttribute(
            'aria-checked',
            itemVM.locked.toString()
        );
        lockButtonElement.onclick = () => {
            this.controller.updateItem(
                { ...itemVM, locked: !itemVM.locked },
                this.planId!,
                layerId
            );
        };
        iconsContainer.appendChild(lockButtonElement);

        element.appendChild(iconsContainer);

        return element;
    }
}
