import { Tool } from './tool';
import './toolbar.scss';
import './tooltip.scss';

export class Toolbar {
    private readonly elementByTool = new Map<Tool, HTMLElement>();

    private enabledTool?: Tool;

    public static create(host: HTMLElement): Toolbar {
        const toolbarElement = document.createElement('div');

        toolbarElement.classList.add('toolbar');

        host.appendChild(toolbarElement);

        return new Toolbar(toolbarElement);
    }

    private constructor(private readonly element: HTMLElement) {
    }

    public addTool(tool: Tool): void {
        const toolElement = document.createElement('div');

        this.elementByTool.set(tool, toolElement);

        //toolElement.title = tool.name;
        toolElement.appendChild(this.createHoverDetails(tool));
        toolElement.classList.add('tool');

        toolElement.appendChild(tool.icon.node[0]);

        toolElement.addEventListener('click', () => this.toggleTool(tool));

        this.element.appendChild(toolElement);
    }

    private createHoverDetails(tool: Tool): HTMLSpanElement {
        // Create a new tooltip element
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltip');

        // Append the tooltip with the tool name
        let text = document.createTextNode(tool.name);
        tooltip.appendChild(text);

        // Return the element
        return tooltip;
    }

    private toggleTool(tool: Tool): void {
        if (this.enabledTool) {
            this.enabledTool.disable?.();

            const toolElement = this.elementByTool.get(this.enabledTool)!;
            toolElement.classList.remove('active');
        }

        if (tool == this.enabledTool) {
            this.enabledTool = undefined;
            return;
        }

        tool.enable();

        const toolElement = this.elementByTool.get(tool)!;
        toolElement.classList.add('active');

        this.enabledTool = tool;
    }
}
