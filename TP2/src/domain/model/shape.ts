import { Point } from './point';

interface _Shape {
    type: string;
}

export class Rectangle implements _Shape {
    public type: string = 'rectangle';

    public constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly width: number,
        public readonly height: number
    ) {}
}

export class Circle implements _Shape {
    public type: string = 'circle';

    public constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly radius: number
    ) {}
}

export class Path implements _Shape {
    public type: string = 'path';

    public constructor(
        public readonly points: Point[],
        public readonly closed: boolean
    ) {}
}

export class Polygon extends Path implements _Shape {
    public type: string = 'polygon';

    public constructor(public readonly points: Point[]) {
        super(points, true);
    }
}

export type Shape = Rectangle | Circle | Path | Polygon;
