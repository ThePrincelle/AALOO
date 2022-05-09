import { icon } from '@fortawesome/fontawesome-svg-core';
import { faFillDrip } from '@fortawesome/free-solid-svg-icons';
import * as paper from 'paper';
import { Item } from '../../../domain/model';
import { PlanController } from '../../interface-adapter';
import { PaperTool } from '../toolbar';
import { ColorToolbox } from '../toolboxes';

export class FillTool extends PaperTool {
    public readonly name = 'Remplir la forme';

    public readonly icon = icon(faFillDrip);

    public constructor(
        private readonly colorToolbox: ColorToolbox,
        private readonly controller: PlanController
    ) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
    }

    public enable(): void {
        super.enable();

        this.colorToolbox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.colorToolbox.visible = false;
    }

    public onMouseDown(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.downPoint);

        if (hit?.item) {
            let item = hit.item;
            if (hit.item.matches({ data: { isGrouped: true } })) {
                item = hit.item.parent;
            }

            item.children.forEach((child) => {
                if (child.matches({ data: { isDomainItem: true } })) {
                    child.data.fillcolor = this.colorToolbox.currentPaperColor;
                    child.data.strokecolor =
                        this.colorToolbox.currentPaperColor;
                    this.controller.updateItem(
                        child.data as Item,
                        child.data.planId,
                        child.data.layerId
                    );
                }
            });
        }
    }
}
