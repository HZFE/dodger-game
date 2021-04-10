// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerStep = exports.PlayerHeight = exports.PlayerColor = exports.BulletOffset = exports.BulletSpeedRange = exports.BulletColorList = exports.BulletRadiusRange = exports.CountFont = exports.BulletCount = exports.BackgroundColor = void 0;
/**
 * 游戏相关配置
 */

/** 游戏背景颜色 */

exports.BackgroundColor = '#f3f3f3';
/** 一个屏幕中子弹的数量 */

exports.BulletCount = 30;
/** 分数文本样式 */

exports.CountFont = '50px Georgia';
/**
 * 子弹相关配置
 * */

/** 生成的子弹半径范围 */

exports.BulletRadiusRange = [5, 80];
/** 生成的子弹颜色列表 */

exports.BulletColorList = ['#3da8f5', '#d71345', '#ffaf38', '#f7acbc', '#7b5d5f', '#f47920', '#f05b72'];
/** 生成的子弹速度范围 */

exports.BulletSpeedRange = [2, 6];
/** 子弹射击偏离范围 */

exports.BulletOffset = 300;
/**
 * 玩家相关配置
 */

/** 玩家颜色 */

exports.PlayerColor = '#232323';
/** 玩家三角形的高 */

exports.PlayerHeight = 40;
/** 玩家每次移动的距离 */

exports.PlayerStep = 5;
},{}],"src/sprite/Sprite.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Sprite =
/** @class */
function () {
  function Sprite(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }

  return Sprite;
}();

exports.default = Sprite;
},{}],"src/sprite/BulletSprite.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var config_1 = require("../config");

var Sprite_1 = __importDefault(require("./Sprite"));
/** 子弹精灵 */


var BulletSprite =
/** @class */
function (_super) {
  __extends(BulletSprite, _super);

  function BulletSprite(ctx, x, y,
  /** 半径 */
  r,
  /** 攻击目标 */
  target) {
    var _this = _super.call(this, ctx, x, y) || this;

    _this.r = r;
    /** 子弹颜色 */

    _this.color = config_1.BulletColorList[~~(Math.random() * config_1.BulletColorList.length)];

    _this.initBullet(target);

    return _this;
  }
  /** 初始化子弹 */


  BulletSprite.prototype.initBullet = function (target) {
    // 根据半径得到我们的速度
    var speed = config_1.BulletSpeedRange[1] - (this.r - config_1.BulletRadiusRange[0]) / (config_1.BulletRadiusRange[1] - config_1.BulletRadiusRange[0]) * ( // 子弹半径在半径范围里的比例
    config_1.BulletSpeedRange[1] - config_1.BulletSpeedRange[0]) // 乘以速度的范围
    ; // 再加上最低的速度
    // 子弹偏差后的结果位置

    var targetX = target.x + (Math.random() * config_1.BulletOffset * 2 - config_1.BulletOffset);
    var targetY = target.y + (Math.random() * config_1.BulletOffset * 2 - config_1.BulletOffset); // 知道两点就能确定角度了

    var angle = Math.atan2(targetY - this.y, targetX - this.x); // 三角函数得到子弹的水平速度和垂直速度了

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  };
  /** 绘制子弹 */


  BulletSprite.prototype.render = function () {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
  };
  /** 更新子弹位置 */


  BulletSprite.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
  };

  return BulletSprite;
}(Sprite_1.default);

exports.default = BulletSprite;
},{"../config":"src/config.ts","./Sprite":"src/sprite/Sprite.ts"}],"src/sprite/PlayreSprite.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var config_1 = require("../config");

var Sprite_1 = __importDefault(require("./Sprite"));
/**
 * 用二进制表示方向
 */


var Direction;

(function (Direction) {
  Direction[Direction["Up"] = 1] = "Up";
  Direction[Direction["Down"] = 2] = "Down";
  Direction[Direction["Left"] = 4] = "Left";
  Direction[Direction["Right"] = 8] = "Right";
})(Direction || (Direction = {}));
/** 玩家精灵 */


var PlayerSprite =
/** @class */
function (_super) {
  __extends(PlayerSprite, _super);

  function PlayerSprite(ctx, x, y, controlType) {
    if (controlType === void 0) {
      controlType = 'keyboard';
    }

    var _this = _super.call(this, ctx, x, y) || this;

    _this.controlType = controlType;
    /** 玩家颜色 */

    _this.color = config_1.PlayerColor;
    /** 玩家旋转的角度 */

    _this.angle = 0;
    /** 玩家正在前进的方向 */

    _this.direction = 0;
    /** 处理玩家按下键盘 */

    _this.handleKeyDown = function (e) {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          _this.direction |= Direction.Up;
          break;

        case 's':
        case 'ArrowDown':
          _this.direction |= Direction.Down;
          break;

        case 'a':
        case 'ArrowLeft':
          _this.direction |= Direction.Left;
          break;

        case 'd':
        case 'ArrowRight':
          _this.direction |= Direction.Right;
          break;
      }
    };
    /** 处理玩家松开按键 */


    _this.handleKeyUp = function (e) {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          _this.direction &= ~Direction.Up;
          break;

        case 's':
        case 'ArrowDown':
          _this.direction &= ~Direction.Down;
          break;

        case 'a':
        case 'ArrowLeft':
          _this.direction &= ~Direction.Left;
          break;

        case 'd':
        case 'ArrowRight':
          _this.direction &= ~Direction.Right;
          break;
      }
    };
    /** 处理手指触摸位置 */


    _this.handleTouchStart = function (e) {
      e.preventDefault();
      var event = e.targetTouches[0];
      var dpr = window.devicePixelRatio || 1;
      _this.touchPos = {
        x: event.pageX * dpr,
        y: event.pageY * dpr
      };
    };
    /** 触摸结束 */


    _this.handleTouchEnd = function () {
      _this.touchPos = null;
    };

    return _this;
  }
  /** 开始监听用户输入 */


  PlayerSprite.prototype.startListener = function () {
    if (this.controlType === 'keyboard') {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
    } else if (this.controlType === 'touch') {
      window.addEventListener('touchstart', this.handleTouchStart, {
        passive: false
      });
      window.addEventListener('touchmove', this.handleTouchStart, {
        passive: false
      });
      window.addEventListener('touchend', this.handleTouchEnd);
      window.addEventListener('touchcancel', this.handleTouchEnd);
    }
  };
  /** 停止监听用户输入 */


  PlayerSprite.prototype.stopListener = function () {
    if (this.controlType === 'keyboard') {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
    } else if (this.controlType === 'touch') {
      window.removeEventListener('touchstart', this.handleTouchStart);
      window.removeEventListener('touchmove', this.handleTouchStart);
      window.removeEventListener('touchend', this.handleTouchEnd);
      window.removeEventListener('touchcancel', this.handleTouchEnd);
    }
  };
  /** 绘制玩家 */


  PlayerSprite.prototype.render = function () {
    this.ctx.fillStyle = this.color; // 旋转角度

    this.ctx.save(); // 绘制玩家

    this.getPlayerPath();
    this.ctx.fill(); // 将旋转复位

    this.ctx.restore();
  };
  /** 得到玩家图形的路径 */


  PlayerSprite.prototype.getPlayerPath = function () {
    this.ctx.beginPath();
    var angles = this.getPlayerAngles();
    this.ctx.moveTo(angles[0].x, angles[0].y);
    this.ctx.lineTo(angles[1].x, angles[1].y);
    this.ctx.lineTo(angles[2].x, angles[2].y);
    this.ctx.closePath();
  };
  /** 得到三角形的三个角 */


  PlayerSprite.prototype.getPlayerAngles = function () {
    var _this = this;

    var d = config_1.PlayerHeight / 2;
    return [{
      x: this.x,
      y: this.y - d
    }, {
      x: this.x - Math.cos(Math.PI / 6) * d,
      y: this.y + Math.sin(Math.PI / 6) * d
    }, {
      x: this.x + Math.cos(Math.PI / 6) * d,
      y: this.y + Math.sin(Math.PI / 6) * d
    }] // 根据转轴公式进行旋转
    .map(function (_a) {
      var x = _a.x,
          y = _a.y;
      return {
        x: _this.x + (x - _this.x) * Math.cos(_this.angle) - (y - _this.y) * Math.sin(_this.angle),
        y: _this.y + (y - _this.y) * Math.cos(_this.angle) + (x - _this.x) * Math.sin(_this.angle)
      };
    });
  };
  /** 更新玩家位置 */


  PlayerSprite.prototype.update = function () {
    if (this.controlType === 'touch') {
      if (!this.touchPos) return; // 获取手指按住的与玩家的角度

      var angle = Math.atan2(this.touchPos.y - this.y, this.touchPos.x - this.x); // 根据角度将距离分为水平距离和垂直距离

      this.x += config_1.PlayerStep * Math.cos(angle);
      this.y += config_1.PlayerStep * Math.sin(angle); // 因为玩家的角度是朝上的，而正常坐标轴是朝右的，估每次旋转都加上 90°

      this.angle = angle + Math.PI / 2;
    } else {
      // 按方向前进
      if (this.direction & Direction.Up) {
        this.y -= config_1.PlayerStep;
      }

      if (this.direction & Direction.Down) {
        this.y += config_1.PlayerStep;
      }

      if (this.direction & Direction.Left) {
        this.x -= config_1.PlayerStep;
      }

      if (this.direction & Direction.Right) {
        this.x += config_1.PlayerStep;
      } // 按方向更新旋转角度


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
  };
  /** 判断子弹是否射中玩家 */


  PlayerSprite.prototype.isCrash = function (bullet) {
    var isCrash = false; // 判断子弹圆心是否已经在三角形中

    this.ctx.save();
    this.getPlayerPath();
    isCrash = this.ctx.isPointInPath(bullet.x, bullet.y);
    this.ctx.restore(); // 如果不在，则判断圆心到三条边的距离

    if (!isCrash) {
      var angles = this.getPlayerAngles();

      for (var i = 0; i < angles.length; i++) {
        // 先得到一条边的两个角
        var A = angles[i];
        var B = i === angles.length - 1 ? angles[0] : angles[i + 1]; // 连接两个角得到三角形边的向量 v1

        var v1 = {
          x: B.x - A.x,
          y: B.y - A.y
        }; // 连接圆心和第一个角得到的向量 v2

        var v2 = {
          x: bullet.x - A.x,
          y: bullet.y - A.y
        }; // 三角形边的长度

        var len = Math.sqrt(v1.x * v1.x + v1.y * v1.y); // 将 v1 单位化

        v1 = {
          x: v1.x / len,
          y: v1.y / len
        }; // v1·v2 的点积就是投影的长度

        var u = v1.x * v2.x + v1.y * v2.y; // 边上离圆心最近的点

        var lx = void 0,
            ly = void 0; // 如果投影长度 <= 0，则代表圆心在三角形边的左边，那距离最近的点就是角A

        if (u <= 0) {
          lx = A.x;
          ly = A.y;
        } // 如果投影长度 >= 边长，则代表圆心在三角形边的右边，那距离最近的点就是角B
        else if (u >= len) {
            lx = B.x;
            ly = B.y;
          } // 如果都不是则在边的正上方
          else {
              lx = A.x + u * v1.x;
              ly = A.y + u * v1.y;
            } // 判断圆心距离边最近的点是否小于半径


        if (Math.sqrt(Math.pow(bullet.x - lx, 2) + Math.pow(bullet.y - ly, 2)) < bullet.r) {
          isCrash = true;
          break;
        }
      }
    }

    return isCrash;
  };

  return PlayerSprite;
}(Sprite_1.default);

exports.default = PlayerSprite;
},{"../config":"src/config.ts","./Sprite":"src/sprite/Sprite.ts"}],"src/game.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BulletSprite_1 = __importDefault(require("./sprite/BulletSprite"));

var config_1 = require("./config");

var PlayreSprite_1 = __importDefault(require("./sprite/PlayreSprite"));

var Game =
/** @class */
function () {
  function Game(canvas, options) {
    this.canvas = canvas;
    /** 游戏是否已开始 */

    this.isStart = false;
    /** 子弹列表 */

    this.bullets = [];
    /** 游戏进行的秒数 */

    this.second = 0;
    this.isMobile = options.isMobile;
    var dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width = options.width * dpr;
    this.canvas.height = this.height = options.height * dpr;
    this.canvas.style.width = options.width + "px";
    this.canvas.style.height = options.height + "px";
    this.ctx = this.canvas.getContext('2d');
  }

  Object.defineProperty(Game.prototype, "count", {
    /** 游戏分数 */
    get: function get() {
      return ~~(this.second / 1000);
    },
    enumerable: false,
    configurable: true
  });
  /** 开始游戏 */

  Game.prototype.start = function () {
    var _this = this;

    if (this.isStart) return; // 初始化玩家

    this.player = new PlayreSprite_1.default(this.ctx, this.width / 2, this.height / 2, this.isMobile ? 'touch' : 'keyboard');
    this.player.startListener();

    var step = function step() {
      if (!_this.isStart) {
        _this.render(); // GameOver


        _this === null || _this === void 0 ? void 0 : _this.onGameOver(_this.count);
        return;
      } // 记录当前游戏时间


      _this.second += 16.67;

      _this.render();

      _this.update();

      requestAnimationFrame(step);
    };

    this.isStart = true;
    requestAnimationFrame(step);
  };
  /** 结束游戏 */


  Game.prototype.stop = function () {
    var _a;

    this.isStart = false;
    (_a = this.player) === null || _a === void 0 ? void 0 : _a.stopListener();
    this.bullets.length = 0;
    this.second = 0;
  };
  /** 生成一个子弹 */


  Game.prototype.addNewBullet = function () {
    // 先假设目标在屏幕正中间
    var target = {
      x: this.width / 2,
      y: this.height / 2
    }; // 生成一个随机的子弹半径

    var r = Math.random() * (config_1.BulletRadiusRange[1] - config_1.BulletRadiusRange[0]) + config_1.BulletRadiusRange[0]; // 生成一个随机位置（随机从四个方向进入）

    var _a = [{
      x: Math.random() * this.width,
      y: -r * 2
    }, {
      x: Math.random() * this.width,
      y: this.height + r * 2
    }, {
      x: -r * 2,
      y: Math.random() * this.height
    }, {
      x: this.width + r * 2,
      y: Math.random() * this.height
    } // 右边
    ][~~(Math.random() * 4)],
        x = _a.x,
        y = _a.y;
    var bullet = new BulletSprite_1.default(this.ctx, x, y, r, target);
    this.bullets.push(bullet);
  };
  /** 绘制游戏 */


  Game.prototype.render = function () {
    // 每次绘制前都需要先清空画布
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.renderBackground();
    this.renderCount();
    this.player.render();
    this.bullets.forEach(function (bullet) {
      return bullet.render();
    });
  };
  /** 更新游戏 */


  Game.prototype.update = function () {
    var _this = this; // 更新玩家位置


    this.player.update(); // 不允许超出游戏屏幕边缘

    var edge = config_1.PlayerHeight / 2;
    if (this.player.x < edge) this.player.x = edge;
    if (this.player.y < edge) this.player.y = edge;
    if (this.player.x > this.width - edge) this.player.x = this.width - edge;
    if (this.player.y > this.height - edge) this.player.y = this.height - edge;
    this.bullets = this.bullets.filter(function (bullet) {
      // 更新子弹位置
      bullet.update(); // 判断子弹是否射中玩家

      if (_this.player.isCrash(bullet)) {
        _this.isStart = false;
      } // 如果飞出屏幕则将子弹销毁


      return !(bullet.x < -bullet.r * 2 || // 飞出左边屏幕
      bullet.x > _this.width + bullet.r * 2 || // 飞出右边屏幕
      bullet.y < -bullet.r * 2 || // 飞出上边屏幕
      bullet.y > _this.height + bullet.r * 2 // 飞出下边屏幕
      );
    }); // 如果屏幕中的子弹数量低于设置的数量，则补全数量

    for (var i = this.bullets.length; i < config_1.BulletCount; i++) {
      this.addNewBullet();
    }
  };
  /** 绘制游戏背景 */


  Game.prototype.renderBackground = function () {
    this.ctx.fillStyle = config_1.BackgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };
  /** 绘制分数 */


  Game.prototype.renderCount = function () {
    this.ctx.font = config_1.CountFont;
    this.ctx.textAlign = 'right';
    this.ctx.fillStyle = '#000';
    this.ctx.fillText("" + this.count, this.width - 20, 50);
  };

  return Game;
}();

exports.default = Game;
},{"./sprite/BulletSprite":"src/sprite/BulletSprite.ts","./config":"src/config.ts","./sprite/PlayreSprite":"src/sprite/PlayreSprite.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_1 = __importDefault(require("./game"));

var isMobile = !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
var game = new game_1.default(document.getElementById('app'), {
  width: isMobile ? window.innerWidth : 600,
  height: isMobile ? window.innerHeight : 600,
  isMobile: isMobile
});
game.start();

game.onGameOver = function (count) {
  setTimeout(function () {
    if (count < 10) {
      alert("\u4F60\u53EA\u575A\u6301\u4E86 " + count + " \u79D2\uFF0C\u6709\u70B9\u5F31\u8BF6 \uD83E\uDD74");
    } else if (count < 20) {
      alert("\u4F60\u575A\u6301\u4E86 " + count + " \u79D2\uFF0C\u8FD8\u7B97\u4E0D\u9519 \uD83E\uDD13");
    } else if (count < 30) {
      alert("\u4F60\u575A\u6301\u4E86 " + count + " \u79D2\uFF0C\u5F3A\u554A \uD83E\uDD20");
    } else if (count < 100) {
      alert("\u4F60\u575A\u6301\u4E86 " + count + " \u79D2\uFF0C\u4F60\u5DF2\u7ECF\u8D85\u795E\u4E86\uFF01\uD83E\uDD73");
    } else {
      alert('你丫的是开挂了吧？');
    }

    game.stop();
    game.start();
  });
};
},{"./game":"src/game.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59073" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map