import { BulletColorList, BulletOffset, BulletRadiusRange, BulletSpeedRange } from '../config';
import Sprite from './Sprite';

/** 子弹精灵 */
export default class BulletSprite extends Sprite {
  /** 子弹颜色 */
  color: string = BulletColorList[~~(Math.random() * BulletColorList.length)];
  /** 水平速度 */
  vx!: number;
  /** 垂直速度 */
  vy!: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    /** 半径 */
    public r: number,
    /** 攻击目标 */
    target: { x: number, y: number },
  ) {
    super(ctx, x, y);
    this.initBullet(target);
  }

  /** 初始化子弹 */
  initBullet(target: { x: number, y: number }) {
    // 根据半径得到我们的速度
    const speed = BulletSpeedRange[1] - (
      ((this.r - BulletRadiusRange[0]) / (BulletRadiusRange[1] - BulletRadiusRange[0])) // 子弹半径在半径范围里的比例
      * (BulletSpeedRange[1] - BulletSpeedRange[0]) // 乘以速度的范围
    );

    // 子弹偏差后的结果位置
    const targetX = target.x + ((Math.random() * BulletOffset * 2) - BulletOffset);
    const targetY = target.y + ((Math.random() * BulletOffset * 2) - BulletOffset);

    // 知道两点就能确定角度了
    const angle = Math.atan2(targetY - this.y, targetX - this.x);

    // 三角函数得到子弹的水平速度和垂直速度了
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }

  /** 绘制子弹 */
  public render() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
  }

  /** 更新子弹位置 */
  public update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}