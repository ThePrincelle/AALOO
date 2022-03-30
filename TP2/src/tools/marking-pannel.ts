import { icon } from '@fortawesome/fontawesome-svg-core';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
//import * as paper from 'paper';
import { PaperTool } from '../toolbar';
import { CreatorToolbox } from '../toolboxes';

export class MarkingPannel extends PaperTool {
    public readonly name = 'Poser des enseignes';

    public readonly icon = icon(faFlag);

    public constructor(private creatorToolBox: CreatorToolbox) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
    }

    public enable(): void {
        super.enable();

        this.creatorToolBox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.creatorToolBox.visible = false;
    }

    public onMouseDown(/*event: paper.ToolEvent*/): void {
        //const hit = paper.project.activeLayer.hitTest(event.downPoint);
    }
}
