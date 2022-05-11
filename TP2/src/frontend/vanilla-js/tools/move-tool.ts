import { icon } from '@fortawesome/fontawesome-svg-core';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import * as paper from 'paper';
import { Item } from '../../../domain/model';
import { PlanController } from '../../interface-adapter';
import { PaperTool } from '../toolbar';

export class MoveTool extends PaperTool {
    public readonly name = 'Déplacer la forme';

    public readonly icon = icon(faArrowPointer);

    private selectedItem?: paper.Item;
    private downPoint?: paper.Point;

    public constructor(private readonly controller: PlanController) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
        this.paperTool.onMouseDrag = this.onMouseDrag.bind(this);
        this.paperTool.onMouseUp = this.onMouseUp.bind(this);

        this.paperTool.onKeyUp = this.onKeyUp.bind(this);
    }

    public enable(): void {
        this.selectedItem = undefined;
        super.enable();
    }

    public disable(): void {
        super.disable();

        if (this.selectedItem) this.selectedItem.selected = false;

        this.selectedItem = undefined;
    }

    public onMouseDown(event: paper.ToolEvent): void {
        this.downPoint = event.downPoint;
        const hit = paper.project.activeLayer.hitTest(event.downPoint);

        if (hit?.item) {
            // Deselect previous selected item
            if (this.selectedItem) this.selectedItem.selected = false;

            let item = hit.item;
            // If the item is a group, select the parent
            if (hit.item.matches({ data: { isGrouped: true } })) {
                item = hit.item.parent;
            }
            this.selectedItem = item;

            if (this.selectedItem.data.locked == false) return;

            // Only set the selected property to the items that shows
            // a selected state
            item.getItems({ data: { showSelected: true } }).forEach((child) => {
                child.selected = true;
            });
        } else {
            // If not hit, deselect previous selected item if any
            this.selectedItem?.set({ selected: false });
            this.selectedItem = undefined;
        }
    }

    public onMouseDrag(event: paper.ToolEvent): void {
        // Move the selected item with its group
        this.selectedItem
            ?.getItems({ data: { isGrouped: true } })
            .forEach((child) => child.translate(event.delta));
    }

    public onMouseUp(event: paper.ToolEvent): void {
        if (this.selectedItem && !event.point.equals(event.lastPoint)) {
            this.selectedItem.children.forEach((child) => {
                if (child.matches({ data: { isDomainItem: true } })) {
                    const newPosition = {
                        x:
                            child.data.position.x +
                            (event.point.x - this.downPoint!.x),
                        y:
                            child.data.position.y +
                            (event.point.y - this.downPoint!.y),
                    };
                    this.controller.updateItem(
                        { ...child.data, position: newPosition } as Item,
                        child.data.planId,
                        child.data.layerId
                    );
                }
            });
        }
    }

    public onKeyUp(event: paper.KeyEvent): void {
        if (!this.selectedItem) return;

        switch (event.key) {
            case 'delete':
            case 'backspace':
                const item = this.selectedItem;
                this.selectedItem = undefined;

                item.children.forEach((child) => {
                    if (child.matches({ data: { isDomainItem: true } })) {
                        this.controller.deleteItem(
                            child.data.id,
                            child.data.planId,
                            child.data.layerId
                        );
                    }
                });
                break;
        }
    }
}
