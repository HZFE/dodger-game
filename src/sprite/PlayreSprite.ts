import {
  PlayerColor,
  PlayerHeight,
  PlayerStep,
  JoystickOffset,
  JoystickRadius,
  JoystickInnerRadius,
  JoystickInnerColor,
  JoystickBgcColor,
} from '../config';
import BulletSprite from './BulletSprite';
import Sprite from './Sprite';

/**
 * 用二进制表示方向
 */
const enum Direction {
  Up = 1,
  Down = 2,
  Left = 4,
  Right = 8,
}

/** 玩家精灵 */
export default class PlayerSprite extends Sprite {
  /** 玩家颜色 */
  color: string = PlayerColor;
  /** 玩家旋转的角度 */
  angle: number = 0;
  /** 玩家正在前进的方向 */
  direction: number = 0;
  /** 手指按住的位置 */
  touchPos?: { x: number, y: number };
  /** 虚拟摇杆的位置 */
  joystickPos?: { x: number, y: number }

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    private controlType: 'keyboard' | 'touch' = 'keyboard'
  ) {
    super(ctx, x, y);
    // 虚拟摇杆起始位置
    if (this.controlType === 'touch') {
      this.joystickPos = { x: JoystickOffset + JoystickRadius, y: this.ctx.canvas.height - JoystickOffset - JoystickRadius };
    }
  }

  /** 开始监听用户输入 */
  public startListener() {
    if (this.controlType === 'keyboard') {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
    } else if (this.controlType === 'touch') {
      window.addEventListener('touchstart', this.handleTouchStart, { passive: false });
      window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
      window.addEventListener('touchend', this.handleTouchEnd);
      window.addEventListener('touchcancel', this.handleTouchEnd);
    }
  }

  /** 停止监听用户输入 */
  public stopListener() {
    if (this.controlType === 'keyboard') {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
    } else if (this.controlType === 'touch') {
      window.removeEventListener('touchstart', this.handleTouchStart);
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleTouchEnd);
      window.removeEventListener('touchcancel', this.handleTouchEnd);
    }
  }

  /** 处理玩家按下键盘 */
  private handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        this.direction |= Direction.Up;
        break;
      case 's':
      case 'ArrowDown':
        this.direction |= Direction.Down;
        break;
      case 'a':
      case 'ArrowLeft':
        this.direction |= Direction.Left;
        break;
      case 'd':
      case 'ArrowRight':
        this.direction |= Direction.Right;
        break;
    }
  }

  /** 处理玩家松开按键 */
  private handleKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        this.direction &= ~Direction.Up;
        break;
      case 's':
      case 'ArrowDown':
        this.direction &= ~Direction.Down;
        break;
      case 'a':
      case 'ArrowLeft':
        this.direction &= ~Direction.Left;
        break;
      case 'd':
      case 'ArrowRight':
        this.direction &= ~Direction.Right;
        break;
    }
  }

  /** 处理手指触摸位置 */
  handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const event = e.targetTouches[0];
    const dpr = window.devicePixelRatio || 1;
    this.joystickPos = {
      x: event.pageX * dpr,
      y: event.pageY * dpr,
    }
  }

  handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const event = e.targetTouches[0];
    const dpr = window.devicePixelRatio || 1;
    this.touchPos = {
      x: event.pageX * dpr,
      y: event.pageY * dpr,
    }
  }

  /** 触摸结束 */
  handleTouchEnd = () => {
    this.touchPos = null;
  }

  /** 绘制玩家 */
  public render() {
    this.ctx.fillStyle = this.color;

    this.ctx.save();

    // 绘制玩家
    this.getPlayerPath();
    this.ctx.fill();

    // 如果为触摸控制，则加入虚拟摇杆
    if (this.controlType === 'touch') {
      this.renderVirtualJoystick();
    }

    this.ctx.restore();
  }

  /** 触摸位置是否在摇杆中心位置 */
  get touchInJoystickInner() {
    return Math.sqrt((this.touchPos.y - this.joystickPos.y) ** 2 + (this.touchPos.x - this.joystickPos.x) ** 2) <= JoystickInnerRadius;
  }

  /** 渲染虚拟摇杆 */
  private renderVirtualJoystick() {
    if (!this.joystickPos) return;

    // 绘制摇杆背景
    this.ctx.fillStyle = JoystickBgcColor;
    this.ctx.beginPath();
    this.ctx.arc(this.joystickPos.x, this.joystickPos.y, JoystickRadius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();

    // 绘制摇杆
    this.ctx.fillStyle = JoystickInnerColor;

    // 默认摇杆在中心位置
    let x = this.joystickPos.x;
    let y = this.joystickPos.y;

    // 如果有玩家触碰屏幕切触摸范围不在摇杆中心范围，则根据触碰位置与摇杆中心的角度绘制摇杆
    if (this.touchPos && !this.touchInJoystickInner) {
      x += (JoystickRadius - JoystickInnerRadius) * Math.cos(this.angle - Math.PI / 2);
      y += (JoystickRadius - JoystickInnerRadius) * Math.sin(this.angle - Math.PI / 2);
    }
    this.ctx.beginPath();
    this.ctx.arc(x, y, JoystickInnerRadius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
  }

  /** 得到玩家图形的路径 */
  public getPlayerPath() {
    this.ctx.beginPath();
    const angles = this.getPlayerAngles();
    this.ctx.moveTo(angles[0].x, angles[0].y);
    this.ctx.lineTo(angles[1].x, angles[1].y);
    this.ctx.lineTo(angles[2].x, angles[2].y);
    this.ctx.closePath();
  }

  /** 得到三角形的三个角 */
  public getPlayerAngles(): { x: number, y: number }[] {
    const d = PlayerHeight / 2;
    return [
      { x: this.x, y: this.y - d },
      { x: this.x - Math.cos(Math.PI / 6) * d, y: this.y + Math.sin(Math.PI / 6) * d },
      { x: this.x + Math.cos(Math.PI / 6) * d, y: this.y + Math.sin(Math.PI / 6) * d },
    ]
    // 根据转轴公式进行旋转
    .map(({ x, y }) => ({
      x: this.x + (x - this.x) * Math.cos(this.angle) - (y - this.y) * Math.sin(this.angle),
      y: this.y + (y - this.y) * Math.cos(this.angle) + (x - this.x) * Math.sin(this.angle),
    }));
  }

  /** 更新玩家位置 */
  public update() {
    if (this.controlType === 'touch') {
      if (!this.touchPos || this.touchInJoystickInner) return;
      // 获取手指按住的与摇杆中心的角度
      const angle = Math.atan2(this.touchPos.y - this.joystickPos.y, this.touchPos.x - this.joystickPos.x);

      // 根据角度将距离分为水平距离和垂直距离
      this.x += PlayerStep * Math.cos(angle);
      this.y += PlayerStep * Math.sin(angle);

      // 因为玩家的角度是朝上的，而正常坐标轴是朝右的，估每次旋转都加上 90°
      this.angle = angle + Math.PI / 2;
    } else {
      // 按方向前进
      if (this.direction & Direction.Up) {
        this.y -= PlayerStep;
      }
      if (this.direction & Direction.Down) {
        this.y += PlayerStep;
      }
      if (this.direction & Direction.Left) {
        this.x -= PlayerStep;
      }
      if (this.direction & Direction.Right) {
        this.x += PlayerStep;
      }
      // 按方向更新旋转角度
      switch (this.direction) {
        case Direction.Up:
          this.angle = 0;
          break;
        case Direction.Down:
          this.angle = Math.PI;
          break;
        case Direction.Left:
          this.angle = Math.PI / 2 * 3;
          break;
        case Direction.Right:
          this.angle = Math.PI / 2;
          break;
        case Direction.Left | Direction.Up:
          this.angle = -Math.PI / 4;
          break;
        case Direction.Left | Direction.Down:
          this.angle = -Math.PI / 4 * 3;
          break;
        case Direction.Right | Direction.Up:
          this.angle = Math.PI / 4;
          break;
        case Direction.Right | Direction.Down:
          this.angle = Math.PI / 4 * 3;
          break;
      }
    }
  }

  /** 判断子弹是否射中玩家 */
  public isCrash(bullet: BulletSprite): boolean {
    let isCrash = false;

    // 判断子弹圆心是否已经在三角形中
    this.ctx.save();
    this.getPlayerPath();
    isCrash = this.ctx.isPointInPath(bullet.x, bullet.y);
    this.ctx.restore();

    // 如果不在，则判断圆心到三条边的距离
    if (!isCrash) {
      const angles = this.getPlayerAngles();
      for (let i = 0; i < angles.length; i++) {
        // 先得到一条边的两个角
        const A = angles[i];
        const B = i === angles.length - 1 ? angles[0] : angles[i + 1];

        // 连接两个角得到三角形边的向量 v1
        let v1 = { x: B.x - A.x, y: B.y - A.y };
        // 连接圆心和第一个角得到的向量 v2
        let v2 = { x: bullet.x - A.x, y: bullet.y - A.y };

        // 三角形边的长度
        const len = Math.sqrt(v1.x * v1.x + v1.y * v1.y);

        // 将 v1 单位化
        v1 = { x: v1.x / len, y: v1.y / len };

        // v1·v2 的点积就是投影的长度
        const u = v1.x * v2.x + v1.y * v2.y;

        // 边上离圆心最近的点
        let lx, ly;

        // 如果投影长度 <= 0，则代表圆心在三角形边的左边，那距离最近的点就是角A
        if (u <= 0) {
          lx = A.x;
          ly = A.y;
        }
        // 如果投影长度 >= 边长，则代表圆心在三角形边的右边，那距离最近的点就是角B
        else if (u >= len) {
          lx = B.x;
          ly = B.y;
        }
        // 如果都不是则在边的正上方
        else {
          lx = A.x + u * v1.x;
          ly = A.y + u * v1.y;
        }

        // 判断圆心距离边最近的点是否小于半径
        if (Math.sqrt((bullet.x - lx) ** 2 + (bullet.y - ly) ** 2) < bullet.r) {
          isCrash = true;
          break;
        }
      }
    }
    return isCrash;
  }
}