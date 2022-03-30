import { icon } from '@fortawesome/fontawesome-svg-core';
import { faFireExtinguisher } from '@fortawesome/free-solid-svg-icons';
//import * as paper from 'paper';
import { PaperTool } from '../toolbar';

export class Extinguisher extends PaperTool {
    public readonly name = 'Placement d\'extincteur';

    public readonly icon = icon(faFireExtinguisher);

    public constructor() {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
    }

    public enable(): void {
        super.enable();
    }

    public disable(): void {
        super.disable();
    }

    public onMouseDown(/*event: paper.ToolEvent*/): void {
        //const hit = paper.project.activeLayer.hitTest(event.downPoint);
    }
}
