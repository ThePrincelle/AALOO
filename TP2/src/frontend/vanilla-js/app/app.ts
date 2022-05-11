import * as paper from 'paper';
import { PlanUI } from '../plan';
import { StatusbarContainer } from '../statusbar';
import { Toolbar } from '../toolbar';
import { ToolboxesContainer } from '../toolbox';
import {
    ColorToolbox,
    SaveToolbox,
    LayerToolbox,
    CatalogToolbox,
} from '../toolboxes';
import { FillTool, MoveTool } from '../tools';
import {
    RedoActionBtn,
    SaveActionBtn,
    UndoActionBtn,
} from '../statusbar-actions';
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
        this.initializeKeyboard();

        const statusbarContainer = StatusbarContainer.create(
            element,
            this.planFactory.controller,
            this.planFactory.viewModel
        );

        statusbarContainer.addLeadingAction(
            new SaveActionBtn(
                this.planFactory.controller,
                this.planFactory.viewModel
            )
        );
        statusbarContainer.addLeadingAction(
            new UndoActionBtn(
                this.planFactory.controller,
                this.planFactory.viewModel
            )
        );
        statusbarContainer.addLeadingAction(
            new RedoActionBtn(
                this.planFactory.controller,
                this.planFactory.viewModel
            )
        );

        const colorToolbox = new ColorToolbox();
        // const pathToolbox = new PathToolbox();
        const catalogToolbox = new CatalogToolbox(
            this.planFactory.controller,
            this.planFactory.viewModel
        );

        const layerToolboxes = ToolboxesContainer.create(element, false);
        layerToolboxes.addToolbox(
            new LayerToolbox(
                this.planFactory.controller,
                this.planFactory.viewModel
            )
        );

        const toolboxes = ToolboxesContainer.create(element, true);

        toolboxes.addToolbox(catalogToolbox);
        toolboxes.addToolbox(colorToolbox);
        // toolboxes.addToolbox(pathToolbox);
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
        // toolbar.addTool(new PathTool(pathToolbox));
    }

    private initializePaper(): void {
        const canvas = document.createElement('canvas');
        this.element.appendChild(canvas);

        paper.setup(canvas);
    }

    private async initializePlan(): Promise<void> {
        const plan = new PlanUI(this.planFactory);

        await plan.initialize();
    }

    private initializeKeyboard(): void {
        document.onkeydown = (e: KeyboardEvent) => {
            var code = e.key;

            if (!e.ctrlKey) return;

            switch (code) {
                case 's':
                    this.planFactory.controller.savePlan(
                        this.planFactory.viewModel.activePlan!
                    );
                    e.preventDefault();
                    break;
                case 'z':
                    if (e.shiftKey) {
                        this.planFactory.viewModel.canRedo &&
                            this.planFactory.controller.redo();
                    } else {
                        this.planFactory.viewModel.canUndo &&
                            this.planFactory.controller.undo();
                    }
                    e.preventDefault();
                    break;
                case 'y':
                    this.planFactory.viewModel.canRedo &&
                        this.planFactory.controller.redo();
                    e.preventDefault();
                    break;
                default:
                    break;
            }
        };
    }
}
