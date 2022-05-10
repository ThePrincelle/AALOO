import * as paper from 'paper';
import { PlanUI } from '../plan';
import { Statusbar } from '../statusbar';
import { Toolbar } from '../toolbar';
import { ToolboxesContainer } from '../toolbox';
import {
    ColorToolbox,
    SaveToolbox,
    PathToolbox,
    LayerToolbox,
} from '../toolboxes';
import { FillTool, MoveTool, PathTool } from '../tools';
import './app.scss';

import { planFactory, PlanFactory } from '../../interface-adapter';

export class App {
    public static create(host: HTMLElement): App {
        host.classList.add('app');

        return new App(host, planFactory);
    }

    private constructor(
        private readonly element: HTMLElement,
        private readonly planFactory: PlanFactory
    ) {
        this.initializePaper();
        this.initializePlan();

        Statusbar.create(
            element,
            this.planFactory.controller,
            this.planFactory.viewModel
        );

        const colorToolbox = new ColorToolbox();
        const pathToolbox = new PathToolbox();

        const toolboxes = ToolboxesContainer.create(element);

        toolboxes.addToolbox(
            new LayerToolbox(
                this.planFactory.controller,
                this.planFactory.viewModel
            )
        );
        toolboxes.addToolbox(colorToolbox);
        toolboxes.addToolbox(pathToolbox);
        toolboxes.addToolbox(
            new SaveToolbox(
                this.planFactory.controller,
                this.planFactory.viewModel
            )
        );

        const toolbar = Toolbar.create(element);

        toolbar.addTool(new MoveTool(this.planFactory.controller));
        toolbar.addTool(
            new FillTool(colorToolbox, this.planFactory.controller)
        );
        toolbar.addTool(new PathTool(pathToolbox));
    }

    private initializePaper(): void {
        const canvas = document.createElement('canvas');
        this.element.appendChild(canvas);

        paper.setup(canvas);
    }

    private initializePlan(): void {
        const plan = new PlanUI(this.planFactory);

        plan.initialize();
    }
}
