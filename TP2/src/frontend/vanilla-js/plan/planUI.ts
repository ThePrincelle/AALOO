import * as paper from 'paper';
import { Circle, Path, Rectangle, Shape } from '../../../domain/model/shape';
import { ViewModel } from '../../interface-adapter';
import { PlanFactory } from '../../interface-adapter/plan/planFactory';

export class PlanUI {
    constructor(private readonly planFactory: PlanFactory) {
        paper.view.center = new paper.Point(200, 200);

        this.planFactory.viewModel.onChange(
            (viewModel: ViewModel, _newValues: Partial<ViewModel>) => {
                this.build(viewModel);
            }
        );
    }

    public initialize(): void {
        this.planFactory.controller.getPlans();
    }

    private build(viewModel: ViewModel): void {
        const planId = viewModel.plans.at(0)?.id;

        // Reset paper plan
        paper.project.clear();

        // Draw paper elements
        viewModel.plans.at(0)?.layers.map((l) => {
            l.children.map((i) => {
                let shape: Shape;
                let item: paper.Item;
                switch (i.shape.type) {
                    case 'rectangle':
                        shape = i.shape as Rectangle;
                        item = new paper.Path.Rectangle(
                            new paper.Point(i.position.x, i.position.y),
                            new paper.Size(shape.width, shape.height)
                        );
                        break;
                    case 'circle':
                        shape = i.shape as Circle;
                        item = new paper.Path.Circle(
                            new paper.Point(i.position.x, i.position.y),
                            shape.radius
                        );
                        break;
                    case 'path':
                    case 'polygon':
                        shape = i.shape as Path;
                        item = new paper.Path(
                            shape.points.map(
                                (p) =>
                                    new paper.Segment(new paper.Point(p.x, p.y))
                            )
                        );
                        break;
                    default:
                        return null;
                }
                item.name = i.name;
                item.fillColor = new paper.Color(i.fillcolor ?? '#27ae60');
                item.fillColor.lightness *= 1.2;
                item.strokeWidth = 5;
                item.strokeColor = new paper.Color(i.strokecolor ?? '#27ae60');
                item.selected = false;
                item.locked = i.locked;
                item.visible = i.visible;
                item.data = {
                    isGrouped: true,
                    isDomainItem: true,
                    showSelected: true,
                    planId: planId,
                    layerId: l.id,
                    ...i,
                };

                const textItem = new paper.PointText(
                    item.bounds.bottomLeft.add(new paper.Point(5, -5))
                );
                textItem.content = i.name;
                textItem.fontWeight = 'bold';
                textItem.fillColor = new paper.Color(i.strokecolor);
                textItem.fillColor.lightness *= 0.8;
                textItem.locked = i.locked;
                textItem.visible = i.visible;
                textItem.data = {
                    isGrouped: true,
                    isDomainItem: false,
                    showSelected: false,
                    ...i,
                };

                const group = new paper.Group([item, textItem]);

                return group;
            });
        });
    }
}
