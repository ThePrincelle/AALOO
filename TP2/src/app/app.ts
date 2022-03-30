import * as paper from 'paper';
import { Plan } from '../plan';
import { Toolbar } from '../toolbar';
import { ToolboxesContainer } from '../toolbox';
import { ColorToolbox, SaveToolbox, CreatorToolbox } from '../toolboxes';
import { FillTool, Extinguisher, HangingElement, FixElement, MarkingPannel, Partitions, Structure } from '../tools';
import './app.scss';

export class App {
    public static create(host: HTMLElement): App {
        host.classList.add('app');

        return new App(host);
    }

    private constructor(private readonly element: HTMLElement) {
        const colorToolbox = new ColorToolbox();
        const creatorToolbox = new CreatorToolbox();

        const toolboxes = ToolboxesContainer.create(element);

        toolboxes.addToolbox(colorToolbox);
        toolboxes.addToolbox(new SaveToolbox());
        toolboxes.addToolbox(creatorToolbox);

        const toolbar = Toolbar.create(element);


        toolbar.addTool(new FillTool(colorToolbox));

        // Objects
        toolbar.addTool(new Extinguisher());
        toolbar.addTool(new FixElement(creatorToolbox));
        toolbar.addTool(new HangingElement(creatorToolbox));
        toolbar.addTool(new MarkingPannel(creatorToolbox));

        // Drawers
        toolbar.addTool(new Partitions());
        toolbar.addTool(new Structure());

        this.initializePlan();
    }

    private initializePlan(): void {
        const canvas = document.createElement('canvas');
        this.element.appendChild(canvas);

        paper.setup(canvas);

        const plan = new Plan();

        plan.initialize();
    }
}
