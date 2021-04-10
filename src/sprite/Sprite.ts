export default abstract class Sprite {
  constructor(
    public ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
  ) {}
  /** 绘制该精灵的方法 */
  abstract render(): void;
  /** 每次绘制后会调用的方法 */
  abstract update(): void;
}
