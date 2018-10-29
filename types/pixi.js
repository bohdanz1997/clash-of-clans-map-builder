interface PointLike {
  x: number;
  y: number;

  set(x?: number, y?: number): void;
  copy(point: PointLike): void;
}

export interface Point extends PointLike {
  constructor(x?: number, y?: number): Point;

  clone(): Point,
  equals(p: Point): boolean,
  add(point: Point): Point,
  addNum(num: number): Point,
  sub(point: Point): Point,
  subNum(num: number): Point,
  mult(point: Point): Point,
  multNum(num: number): Point,
  div(point: Point): Point,
  divNum(num: number): Point,
  floor(): Point,
}

export interface ObservablePoint extends PointLike {
  constructor(cb: () => any, scope?: any, x?: number, y?: number): ObservablePoint;
  clone(cb?: Function, scope?: any): ObservablePoint;
  equals(p: Point | ObservablePoint | PointLike): boolean;
  cb: () => any;
  scope: any;
}

export interface Rectangle {
  x: number,
  y: number,
  width: number,
  height: number,
  left: number,
  right: number,
  top: number,
  bottom: number,

  clone(): Rectangle,
  copy(rectangle: Rectangle): Rectangle,
  contains(x: number, y: number): boolean,
}

export interface Sprite {
  texture: {},
  width: number,
  height: number,
  position: Point,
}

export interface Container {
  x: number,
  y: number,
  name: string,
  position: Point,
  children: Container[],

  addChild(any): any,
  childByName(string): Container,
}

type ApplicationOptions = {}
type StageOptions = {
  children?: boolean;
  texture?: boolean;
  baseTexture?: boolean;
}

interface WebGLRenderer {}
interface CanvasRenderer {}

interface Ticker {}
interface Loader {}


export interface Application {
  constructor(options?: ApplicationOptions): Application;
  constructor(
    width?: number,
    height?: number,
    options?: ApplicationOptions,
    noWebGL?: boolean,
    sharedTicker?: boolean,
    sharedLoader?: boolean
  ): Application;

  renderer: WebGLRenderer | CanvasRenderer;
  stage: Container;
  ticker: Ticker;
  loader: Loader;
  +screen: Rectangle;
  +view: HTMLCanvasElement;

  stop(): void;
  start(): void;
  render(): void;
  destroy(
    removeView?: boolean,
    stageOptions?: StageOptions | boolean
  ): void;
}

export interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  rect: Rectangle;

  isEmpty(): boolean;
  clear(): void;

  getRectangle(rect?: Rectangle): Rectangle;
  addPoint(point: Point): void;
  addQuad(vertices: ArrayLike<number>): Bounds | undefined;
  addFrame(
    transform: Transform,
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): void;
  addVertices(
    transform: Transform,
    vertices: ArrayLike<number>,
    beginOffset: number,
    endOffset: number
  ): void;
  addBounds(bounds: Bounds): void;
  addBoundsMask(bounds: Bounds, mask: Bounds): void;
  addBoundsArea(bounds: Bounds, area: Rectangle): void;
}

class DisplayObject extends EventEmitter implements
  interaction.InteractiveTarget,
  accessibility.AccessibleTarget {

  name: string | null;

  // begin extras.getGlobalPosition
  getGlobalPosition(point?: Point, skipUpdate?: boolean): Point;
  // end extras.getGlobalPosition

  // begin accessible target
  accessible: boolean;
  accessibleTitle: string | null;
  accessibleHint: string | null;
  tabIndex: number;
  // end accessible target

  // begin interactive target
  interactive: boolean;
  interactiveChildren: boolean;
  hitArea:
    | PIXI.Rectangle
    | PIXI.Circle
    | PIXI.Ellipse
    | PIXI.Polygon
    | PIXI.RoundedRectangle
    | PIXI.HitArea;
  buttonMode: boolean;
  cursor: string;
  trackedPointers(): {
    [key: number]: interaction.InteractionTrackingData;
  };
  // Deprecated
  defaultCursor: string;
  // end interactive target

  transform: TransformBase;
  alpha: number;
  visible: boolean;
  renderable: boolean;
  parent: Container;
  worldAlpha: number;
  filterArea: Rectangle | null;
  x: number;
  y: number;
  worldTransform: Matrix;
  localTransform: Matrix;
  position: Point | ObservablePoint;
  scale: Point | ObservablePoint;
  pivot: Point | ObservablePoint;
  skew: ObservablePoint;
  rotation: number;
  worldVisible: boolean;
  mask: PIXI.Graphics | PIXI.Sprite | null;
  filters: Array<Filter<any>> | null;

  updateTransform(): void;
  displayObjectUpdateTransform(): void;
  getBounds(skipUpdate?: boolean, rect?: Rectangle): Rectangle;
  getLocalBounds(rect?: Rectangle): Rectangle;
  //creates and returns a new point
  toGlobal(position: PointLike): Point;
  //modifies the x and y of the passed point and returns it
  toGlobal<T: PointLike>(
    position: PointLike,
    point?: T,
    skipUpdate?: boolean
  ): T;
  //creates and returns a new point
  toLocal(position: PointLike, from?: DisplayObject): Point;
  //modifies the x and y of the passed point and returns it
  toLocal<T: PointLike>(
    position: PointLike,
    from?: DisplayObject,
    point?: T,
    skipUpdate?: boolean
  ): T;
  renderWebGL(renderer: WebGLRenderer): void;
  renderCanvas(renderer: CanvasRenderer): void;
  setParent(container: Container): Container;
  setTransform(
    x?: number,
    y?: number,
    scaleX?: number,
    scaleY?: number,
    rotation?: number,
    skewX?: number,
    skewY?: number,
    pivotX?: number,
    pivotY?: number
  ): DisplayObject;
  destroy(): void;
}

class Container extends DisplayObject {
  // begin extras.getChildByName
  getChildByName(name: string): DisplayObject;
  // end extras.getChildByName

  children: DisplayObject[];
  width: number;
  height: number;

  onChildrenChange: (...args: any[]) => void;
  addChild<T: DisplayObject>(...children: T[]): T;
  addChildAt<T: DisplayObject>(child: T, index: number): T;
  swapChildren(child: DisplayObject, child2: DisplayObject): void;
  getChildIndex(child: DisplayObject): number;
  setChildIndex(child: DisplayObject, index: number): void;
  getChildAt(index: number): DisplayObject;
  removeChild(child: DisplayObject): DisplayObject;
  removeChildAt(index: number): DisplayObject;
  removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
  updateTransform(): void;
  calculateBounds(): void;
  _calculateBounds(): void;
  containerUpdateTransform(): void;
  renderWebGL(renderer: WebGLRenderer): void;
  renderAdvancedWebGL(renderer: WebGLRenderer): void;
  _renderWebGL(renderer: WebGLRenderer): void;
  _renderCanvas(renderer: CanvasRenderer): void;
  renderCanvas(renderer: CanvasRenderer): void;
  destroy(options?: DestroyOptions | boolean): void;
}

interface TransformBase {
  static IDENTITY: TransformBase;

  worldTransform: Matrix;
  localTransform: Matrix;
  _worldID: number;
  updateLocalTransform(): void;
  updateTransform(parentTransform: TransformBase): void;
  updateWorldTransform(parentTransform: TransformBase): void;
}

interface TransformStatic extends TransformBase {
  position: ObservablePoint;
  scale: ObservablePoint;
  pivot: ObservablePoint;
  skew: ObservablePoint;

  _rotation: number;
  _sr?: number;
  _cr?: number;
  _cy?: number;
  _sy?: number;
  _nsx?: number;
  _cx?: number;
  _currentLocalID: number;

  onChange(): void;
  updateSkew(): void;
  updateLocalTransform(): void;
  updateTransform(parentTransform: TransformBase): void;
  setFromMatrix(matrix: Matrix): void;
  rotation: number;
}

interface Transform extends TransformBase {
  constructor();

  position: Point;
  scale: Point;
  skew: ObservablePoint;
  pivot: Point;

  _rotation: number;
  _sr?: number;
  _cr?: number;
  _cy?: number;
  _sy?: number;
  _sx?: number;
  _cx?: number;

  updateSkew(): void;
  setFromMatrix(matrix: Matrix): void;

  rotation: number;
}

// graphics
interface GraphicsData {
  constructor(
    lineWidth: number,
    lineColor: number,
    lineAlpha: number,
    fillColor: number,
    fillAlpha: number,
    fill: boolean,
    nativeLines: boolean,
    shape:
      | Circle
      | Rectangle
      | Ellipse
      | Polygon
      | RoundedRectangle
      | any,
    lineAlignment?: number
  );
  lineWidth: number;
  lineAlignment: number;
  nativeLines: boolean;
  lineColor: number;
  lineAlpha: number;
  _lineTint: number;
  fillColor: number;
  fillAlpha: number;
  _fillTint: number;
  fill: boolean;
  holes:
    | Circle[]
    | Rectangle[]
    | Ellipse[]
    | Polygon[]
    | RoundedRectangle[]
    | any[];
  shape: Circle | Rectangle | Ellipse | Polygon | RoundedRectangle | any;
  type?: number;
  clone(): GraphicsData;
  addHole(
    shape:
      | Circle
      | Rectangle
      | Ellipse
      | Polygon
      | RoundedRectangle
      | any
  ): void;
  destroy(options?: DestroyOptions | boolean): void;
}

interface Graphics extends Container {
  static CURVES: {
    adaptive: boolean;
    maxLength: number;
    minSegments: number;
    maxSegments: number;
  };

  constructor(nativeLines?: boolean);

  fillAlpha: number;
  lineWidth: number;
  nativeLines: boolean;
  lineColor: number;
  lineAlignment: number;
  graphicsData: GraphicsData[];
  tint: number;
  _prevTint: number;
  blendMode: number;
  currentPath: GraphicsData;
  _webGL: any;
  isMask: boolean;
  boundsPadding: number;
  _localBounds: Bounds;
  dirty: number;
  canvasTintDirty: number;
  fastRectDirty: number;
  clearDirty: number;
  boundsDirty: number;
  cachedSpriteDirty: boolean;
  _spriteRect: Rectangle;
  _fastRect: boolean;

  static _SPRITE_TEXTURE: Texture;

  clone(): Graphics;
  _quadraticCurveLength(
    fromX: number,
    fromY: number,
    cpX: number,
    cpY: number,
    toX: number,
    toY: number
  ): number;
  _bezierCurveLength(
    fromX: number,
    fromY: number,
    cpX: number,
    cpY: number,
    cpX2: number,
    cpY2: number,
    toX: number,
    toY: number
  ): number;
  _segmentsCount(length: number): number;
  lineStyle(
    lineWidth?: number,
    color?: number,
    alpha?: number,
    alignment?: number
  ): Graphics;
  moveTo(x: number, y: number): Graphics;
  lineTo(x: number, y: number): Graphics;
  quadraticCurveTo(
    cpX: number,
    cpY: number,
    toX: number,
    toY: number
  ): Graphics;
  bezierCurveTo(
    cpX: number,
    cpY: number,
    cpX2: number,
    cpY2: number,
    toX: number,
    toY: number
  ): Graphics;
  arcTo(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    radius: number
  ): Graphics;
  arc(
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean
  ): Graphics;
  beginFill(color: number, alpha?: number): Graphics;
  endFill(): Graphics;
  drawRect(x: number, y: number, width: number, height: number): Graphics;
  drawRoundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ): Graphics;
  drawCircle(x: number, y: number, radius: number): Graphics;
  drawEllipse(
    x: number,
    y: number,
    width: number,
    height: number
  ): Graphics;
  drawPolygon(path: number[] | Point[] | Polygon): Graphics;
  drawStar(
    x: number,
    y: number,
    points: number,
    radius: number,
    innerRadius: number,
    rotation?: number
  ): Graphics;
  clear(): Graphics;
  isFastRect(): boolean;
  _renderCanvas(renderer: CanvasRenderer): void;
  _calculateBounds(): Rectangle;
  _renderSpriteRect(renderer: PIXI.SystemRenderer): void;
  containsPoint(point: Point): boolean;
  updateLocalBounds(): void;
  drawShape(
    shape:
      | Circle
      | Rectangle
      | Ellipse
      | Polygon
      | RoundedRectangle
      | any
  ): GraphicsData;
  generateCanvasTexture(scaleMode?: number, resolution?: number): Texture;
  closePath(): Graphics;
  addHole(): Graphics;
  destroy(options?: DestroyOptions | boolean): void;
}





type MatrixParams6 = [number, number, number, number, number, number]

export interface Matrix {
  IDENTITY: Matrix,
  TEMP_MATRIX: Matrix,

  fromArray([]): void,
  set(...MatrixParams6): Matrix,
  toArray(transpose: boolean, out?: []): [],
  apply(pos: Point, newPos?: Point): Point,
  applyInverse(pos: Point, newPos?: Point): Point,
  translate(x: number, y: number): Matrix,
  scale(x: number, y: number): Matrix,
  rotate(angle: number): Matrix,
  append(matrix: Matrix): Matrix,
  setTransform(x: number, y: number, pivotX: number, pivotY: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number): Matrix,
  prepend(matrix: Matrix): Matrix,
  decompose(transform: any): any,
  invert(): Matrix,
  identity(): Matrix,
  clone(): Matrix,
  copy(matrix: Matrix): Matrix,
}




class EventEmitter {
  static prefixed: string | boolean;
  static EventEmitter: {
    new (): EventEmitter;
    prefixed: string | boolean;
  };
  /**
   * Minimal EventEmitter interface that is molded against the Node.js
   * EventEmitter interface.
   *
   * @constructor
   * @api public
   */
  constructor();
  /**
   * Return an array listing the events for which the emitter has registered listeners.
   *
   * @returns {(string | symbol)[]}
   */
  eventNames(): Array<string | Symbol>;
  /**
   * Return the listeners registered for a given event.
   *
   * @param {(string | symbol)} event The event name.
   * @returns {Function[]}
   */
  listeners(event: string | Symbol): Function[];
  /**
   * Check if there listeners for a given event.
   * If `exists` argument is not `true` lists listeners.
   *
   * @param {(string | symbol)} event The event name.
   * @param {boolean} exists Only check if there are listeners.
   * @returns {boolean}
   */
  listeners(event: string | Symbol, exists: boolean): boolean;
  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {(string | symbol)} event The event name.
   * @param {...*} args Arguments that are passed to registered listeners
   * @returns {boolean} `true` if the event had listeners, else `false`.
   */
  emit(event: string | Symbol, ...args: any[]): boolean;
  /**
   * Add a listener for a given event.
   *
   * @param {(string | symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   */
  on(event: string | Symbol, fn: Function, context?: any): this;
  /**
   * Add a one-time listener for a given event.
   *
   * @param {(string | symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   */
  once(event: string | Symbol, fn: Function, context?: any): this;
  /**
   * Remove the listeners of a given event.
   *
   * @param {(string | symbol)} event The event name.
   * @param {Function} fn Only remove the listeners that match this function.
   * @param {*} context Only remove the listeners that have this context.
   * @param {boolean} once Only remove one-time listeners.
   * @returns {EventEmitter} `this`.
   */
  removeListener(
    event: string | Symbol,
    fn?: Function,
    context?: any,
    once?: boolean
  ): this;
  /**
   * Remove all listeners, or those of the specified event.
   *
   * @param {(string | symbol)} event The event name.
   * @returns {EventEmitter} `this`.
   */
  removeAllListeners(event?: string | Symbol): this;
  /**
   * Alias method for `removeListener`
   */
  off(
    event: string | Symbol,
    fn?: Function,
    context?: any,
    once?: boolean
  ): this;
  /**
   * Alias method for `on`
   */
  addListener(
    event: string | Symbol,
    fn: Function,
    context?: any
  ): this;
  /**
   * This function doesn"t apply anymore.
   * @deprecated
   */
  setMaxListeners(): this;
}
