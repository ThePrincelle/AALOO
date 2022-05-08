import { icon } from '@fortawesome/fontawesome-svg-core';
import { faDrawPolygon } from '@fortawesome/free-solid-svg-icons';
import * as paper from 'paper';
import { PaperTool } from '../toolbar';
import { PathToolbox } from '../toolboxes';

export class PathTool extends PaperTool {
    public readonly name = 'Créer un chemin';

    public readonly icon = icon(faDrawPolygon);

    private path: paper.Path;

    public constructor(private readonly pathToolbox: PathToolbox) {
        super();

        this.paperTool.onMouseDown = this.onMouseDown.bind(this);
        this.paperTool.onMouseDrag = this.onMouseDrag.bind(this);
        this.paperTool.onKeyDown = this.onKeyDown.bind(this);

        this.pathToolbox.onPathClosed = this.onPathClosed.bind(this);

        this.path = this.createPath();
    }

    public enable(): void {
        super.enable();

        this.path.selected = true;
        this.pathToolbox.visible = true;
    }

    public disable(): void {
        super.disable();

        this.clearPath();
        this.pathToolbox.visible = false;
    }

    public onKeyDown(event: paper.KeyEvent) {
        if (event.key === 'escape' && !this.path.isEmpty()) {
            this.clearPath();
        }
    }

    public onMouseDown(event: paper.ToolEvent): void {
        const hit = paper.project.activeLayer.hitTest(event.downPoint);
        if (hit?.item instanceof paper.Path) {
            if (this.path.isEmpty()) {
                this.path = (hit!.item as paper.Path).clone();
                this.path.selected = true;
            }
        } else {
            this.path.add(event.downPoint);
        }
    }

    public onMouseDrag(event: paper.ToolEvent): void {
        this.path.lastSegment.point = event.point;
    }

    public onPathClosed(): void {
        this.path.closed = this.pathToolbox.isPathClosed;
        if (this.pathToolbox.isPathClosed) {
            this.path.fillColor = new paper.Color('#27ae60');
            this.path.fillColor.lightness *= 1.2;
        } else {
            this.path.fillColor = null;
        }
    }

    private createPath(): paper.Path {
        const path = new paper.Path();
        path.closed = this.pathToolbox.isPathClosed;
        path.strokeColor = new paper.Color('#27ae60');
        if (this.pathToolbox.isPathClosed) {
            path.fillColor = new paper.Color('#27ae60');
            path.fillColor.lightness *= 1.2;
        }
        path.strokeWidth = 10;
        path.selected = false;
        return path;
    }

    private clearPath(): void {
        this.path.selected = false;
        this.path = this.createPath();
        this.path.selected = true;
    }
}
