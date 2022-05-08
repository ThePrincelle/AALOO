import { icon } from '@fortawesome/fontawesome-svg-core';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import * as paper from 'paper';
import { PaperTool } from '../toolbar';

export class MoveTool extends PaperTool {
    public readonly name = 'Déplacer la forme';

    public readonly icon = icon(faArrowPointer);

    private selectedItem?: paper.Item;

    public constructor() {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
        this.paperTool.onMouseDrag = this.onMouseDrag.bind(this);
        this.paperTool.onMouseUp = this.onMouseUp.bind(this);
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
            // TODO: update controller, add command to history (undo/redo)
        }
    }
}
