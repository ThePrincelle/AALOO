import { icon } from '@fortawesome/fontawesome-svg-core';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
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

    private readonly addIcon = icon(faAdd);

    public constructor(
        private readonly controller: PlanController,
        private readonly viewModel: ViewModel
    ) {
        super();
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
        layerTitle.appendChild(document.createTextNode(layerVM.name));
        layer.appendChild(layerTitle);

        const layerListElement = document.createElement('ul');
        layerListElement.classList.add('layer-item-list');

        // Create an item element for each item in the layer
        layerVM.children.forEach((itemVM) => {
            layerListElement.appendChild(this.createItemElement(itemVM));
        });

        layer.appendChild(layerListElement);
        element.appendChild(layer);

        return element;
    }

    private createItemElement(itemVM: ItemViewModel): HTMLElement {
        const element = document.createElement('li');
        element.classList.add('layer-item');

        const itemElement = document.createElement('div');
        itemElement.appendChild(document.createTextNode(itemVM.name));
        itemElement.classList.add('layer-item-element');

        element.appendChild(itemElement);

        return element;
    }
}
