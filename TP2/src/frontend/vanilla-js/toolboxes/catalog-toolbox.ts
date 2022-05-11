import { Toolbox } from '../toolbox';
import { Icon, icon } from '@fortawesome/fontawesome-svg-core';
import { Item, ItemType, LayerType, Point } from '../../../domain/model';
import {
    faArchway,
    faBed,
    faChair,
    faCube,
    faDoorOpen,
    faFireExtinguisher,
    faHelmetSafety,
    faLightbulb,
    faSignHanging,
    faSquarePlus,
    faStairs,
    faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';
import './catalog-toolbox.scss';
import { PlanController, ViewModel } from '../../interface-adapter';
import { Rectangle, Path, Circle } from '../../../domain/model/shape';

interface CatalogItem {
    name: string;
    icon: Icon;
    layerType: LayerType;
    props: Pick<Item, 'type' | 'name' | 'shape' | 'fillcolor'>;
}

interface CatalogSection {
    title: string;
    items: CatalogItem[];
}

export class CatalogToolbox extends Toolbox {
    protected readonly title = 'Catalogue';

    private sections: CatalogSection[] = [
        {
            title: 'Foundation',
            items: [
                // Foundation
                {
                    name: 'Foundation',
                    icon: icon(faHelmetSafety),
                    layerType: LayerType.Foundation,
                    props: {
                        type: ItemType.Foundation,
                        name: 'Foundation',
                        shape: new Rectangle(500, 500),
                        fillcolor: '#3498db',
                    },
                },
                // Wall
                {
                    name: 'Wall',
                    icon: icon(faCube),
                    layerType: LayerType.Structure,
                    props: {
                        type: ItemType.Wall,
                        name: 'Wall',
                        shape: new Path(
                            [new Point(0, 0), new Point(0, 100)],
                            false
                        ),
                        fillcolor: '#2980b9',
                    },
                },
                // Stair
                {
                    name: 'Stairs',
                    icon: icon(faStairs),
                    layerType: LayerType.Structure,
                    props: {
                        type: ItemType.Furniture,
                        name: 'Stairs',
                        shape: new Rectangle(150, 100),
                        fillcolor: '#95a5a6',
                    },
                },
                // Window
                {
                    name: 'Window',
                    icon: icon(faTableCellsLarge),
                    layerType: LayerType.Structure,
                    props: {
                        type: ItemType.Window,
                        name: 'Window',
                        shape: new Path(
                            [new Point(0, 0), new Point(0, 100)],
                            false
                        ),
                        fillcolor: '#f1c40f',
                    },
                },
                // Door
                {
                    name: 'Door',
                    icon: icon(faDoorOpen),
                    layerType: LayerType.Structure,
                    props: {
                        type: ItemType.Wall,
                        name: 'Door',
                        shape: new Path(
                            [new Point(0, 0), new Point(0, 100)],
                            false
                        ),
                        fillcolor: '#9b59b6',
                    },
                },
            ],
        },
        {
            title: 'Furniture',
            items: [
                // Table
                {
                    name: 'Table',
                    icon: icon(faArchway),
                    layerType: LayerType.Item,
                    props: {
                        type: ItemType.Furniture,
                        name: 'Table',
                        shape: new Rectangle(150, 100),
                        fillcolor: '#8b4513',
                    },
                },
                // Chair
                {
                    name: 'Chair',
                    icon: icon(faChair),
                    layerType: LayerType.Item,
                    props: {
                        type: ItemType.Furniture,
                        name: 'Chair',
                        shape: new Rectangle(50, 50),
                        fillcolor: '#8b4513',
                    },
                },
                // Bed
                {
                    name: 'Bed',
                    icon: icon(faBed),
                    layerType: LayerType.Item,
                    props: {
                        type: ItemType.Furniture,
                        name: 'Bed',
                        shape: new Rectangle(150, 100),
                        fillcolor: '#e74c3c',
                    },
                },
            ],
        },
        {
            title: 'Hangable',
            items: [
                // Lamp
                {
                    name: 'Lamp',
                    icon: icon(faLightbulb),
                    layerType: LayerType.Hangable,
                    props: {
                        type: ItemType.Hangable,
                        name: 'Lamp',
                        shape: new Circle(25),
                        fillcolor: '#f39c12',
                    },
                },
                // Spot
            ],
        },
        {
            title: 'Other',
            items: [
                {
                    name: 'Fire extinguisher',
                    icon: icon(faFireExtinguisher),
                    layerType: LayerType.Item,
                    props: {
                        type: ItemType.Furniture,
                        name: 'Fire extinguisher',
                        shape: new Circle(25),
                        fillcolor: '#c0392b',
                    },
                },
                {
                    name: 'Blank Item',
                    icon: icon(faSquarePlus),
                    layerType: LayerType.Item,
                    props: {
                        type: ItemType.Furniture,
                        name: 'Item',
                        shape: new Rectangle(50, 50),
                        fillcolor: '#1abc9c',
                    },
                },
                {
                    name: 'Blank Hangable',
                    icon: icon(faSignHanging),
                    layerType: LayerType.Hangable,
                    props: {
                        type: ItemType.Hangable,
                        name: 'Item',
                        shape: new Circle(25),
                        fillcolor: '#1abc9c',
                    },
                },
            ],
        },
    ];

    public constructor(
        private readonly controller: PlanController,
        private readonly viewModel: ViewModel
    ) {
        super();
    }

    public createElement(): HTMLElement {
        const element = super.createElement();

        element.classList.add('catalog-toolbox');

        const sectionListElement = document.createElement('ul');
        sectionListElement.classList.add('catalog-toolbox-section-list');

        this.sections.forEach((section) =>
            sectionListElement.appendChild(this.createCatalogSection(section))
        );
        element.appendChild(sectionListElement);

        this.visible = true;

        return element;
    }

    private createCatalogSection(section: CatalogSection): HTMLElement {
        const sectionElement = document.createElement('li');

        sectionElement.classList.add('catalog-toolbox-section');

        // Add section title
        const titleElement = document.createElement('div');
        titleElement.classList.add('catalog-toolbox-section-title');
        titleElement.appendChild(document.createTextNode(section.title));
        sectionElement.appendChild(titleElement);

        const itemListElement = document.createElement('ul');
        itemListElement.classList.add('catalog-toolbox-section-items');

        section.items.forEach((item) => {
            const itemElement = document.createElement('li');
            itemElement.classList.add('catalog-toolbox-section-item');

            // Add icon
            const iconElement = document.createElement('div');
            iconElement.classList.add('catalog-toolbox-section-item-icon');
            iconElement.appendChild(item.icon.node[0]);
            itemElement.appendChild(iconElement);

            // Add name
            const nameElement = document.createElement('div');
            nameElement.classList.add('catalog-toolbox-section-item-name');
            nameElement.appendChild(document.createTextNode(item.name));
            itemElement.appendChild(nameElement);

            itemElement.addEventListener('click', (_) =>
                this.onItemClick(item)
            );

            itemListElement.appendChild(itemElement);
        });

        sectionElement.appendChild(itemListElement);

        return sectionElement;
    }

    private onItemClick(item: CatalogItem): void {
        const planId = this.viewModel.activePlan!.id;
        const layerId = item.layerType;

        this.controller.createItem(
            item.props.name,
            item.props.type,
            planId,
            layerId,
            new Point(0, 0),
            item.props.shape,
            item.props.fillcolor
        );
    }
}
