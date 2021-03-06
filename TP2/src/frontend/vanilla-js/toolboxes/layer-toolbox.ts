import { icon } from '@fortawesome/fontawesome-svg-core';
import {
    faEye,
    faEyeSlash,
    faLayerGroup,
    faLock,
    faTrashCan,
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

    private readonly layersIcon = icon(faLayerGroup);
    private readonly eyeIcon = icon(faEye);
    private readonly eyeSlashIcon = icon(faEyeSlash);
    private readonly lockIcon = icon(faLock);
    private readonly unlockIcon = icon(faUnlock);
    private readonly delelteIcon = icon(faTrashCan);

    public constructor(
        private readonly controller: PlanController,
        private readonly viewModel: ViewModel
    ) {
        super();
    }

    public createElement(): HTMLElement {
        const element = super.createElement(this.layersIcon);

        element.id = 'layer-toolbox';

        const layerListElement: HTMLElement = document.createElement('ul');
        layerListElement.classList.add('layer-list');

        element.appendChild(layerListElement);

        // Set viewModel update callback
        this.viewModel.onChange(
            (_viewModel: ViewModel, _newValues: Partial<ViewModel>) => {
                // Reset the layer list
                layerListElement.innerHTML = '';

                // Create a layer drawer for each layer
                this.viewModel?.activePlan?.layers.forEach((layer) => {
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
            layerListElement.prepend(
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
                this.viewModel.activePlan!.id,
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
                this.viewModel.activePlan!.id,
                layerId
            );
        };
        iconsContainer.appendChild(lockButtonElement);

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.classList.add('item-button', 'delelte');
        deleteButtonElement.appendChild(this.delelteIcon.node[0]);
        deleteButtonElement.onclick = () => {
            this.controller.deleteItem(
                itemVM.id,
                this.viewModel.activePlan!.id,
                layerId
            );
        };
        iconsContainer.appendChild(deleteButtonElement);

        element.appendChild(iconsContainer);

        return element;
    }
}
