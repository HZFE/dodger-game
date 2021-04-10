parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"foLc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PlayerStep=exports.PlayerHeight=exports.PlayerColor=exports.BulletOffset=exports.BulletSpeedRange=exports.BulletColorList=exports.BulletRadiusRange=exports.CountFont=exports.BulletCount=exports.BackgroundColor=void 0,exports.BackgroundColor="#f3f3f3",exports.BulletCount=30,exports.CountFont="50px Georgia",exports.BulletRadiusRange=[5,80],exports.BulletColorList=["#3da8f5","#d71345","#ffaf38","#f7acbc","#7b5d5f","#f47920","#f05b72"],exports.BulletSpeedRange=[2,6],exports.BulletOffset=300,exports.PlayerColor="#232323",exports.PlayerHeight=40,exports.PlayerStep=5;
},{}],"iWx2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){return function(t,e,r){this.ctx=t,this.x=e,this.y=r}}();exports.default=t;
},{}],"qxir":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("../config"),o=e(require("./Sprite")),n=function(e){function o(t,o,n,i,l){var s=e.call(this,t,o,n)||this;return s.r=i,s.color=r.BulletColorList[~~(Math.random()*r.BulletColorList.length)],s.initBullet(l),s}return t(o,e),o.prototype.initBullet=function(t){var e=r.BulletSpeedRange[1]-(this.r-r.BulletRadiusRange[0])/(r.BulletRadiusRange[1]-r.BulletRadiusRange[0])*(r.BulletSpeedRange[1]-r.BulletSpeedRange[0]),o=t.x+(Math.random()*r.BulletOffset*2-r.BulletOffset),n=t.y+(Math.random()*r.BulletOffset*2-r.BulletOffset),i=Math.atan2(n-this.y,o-this.x);this.vx=Math.cos(i)*e,this.vy=Math.sin(i)*e},o.prototype.render=function(){this.ctx.fillStyle=this.color,this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.r,0,2*Math.PI,!0),this.ctx.closePath(),this.ctx.fill()},o.prototype.update=function(){this.x+=this.vx,this.y+=this.vy},o}(o.default);exports.default=n;
},{"../config":"foLc","./Sprite":"iWx2"}],"E1Sc":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var n,i=require("../config"),o=e(require("./Sprite"));!function(t){t[t.Up=1]="Up",t[t.Down=2]="Down",t[t.Left=4]="Left",t[t.Right=8]="Right"}(n||(n={}));var r=function(e){function o(t,o,r,a){void 0===a&&(a="keyboard");var s=e.call(this,t,o,r)||this;return s.controlType=a,s.color=i.PlayerColor,s.angle=0,s.direction=0,s.handleKeyDown=function(t){switch(t.key){case"w":case"ArrowUp":s.direction|=n.Up;break;case"s":case"ArrowDown":s.direction|=n.Down;break;case"a":case"ArrowLeft":s.direction|=n.Left;break;case"d":case"ArrowRight":s.direction|=n.Right}},s.handleKeyUp=function(t){switch(t.key){case"w":case"ArrowUp":s.direction&=~n.Up;break;case"s":case"ArrowDown":s.direction&=~n.Down;break;case"a":case"ArrowLeft":s.direction&=~n.Left;break;case"d":case"ArrowRight":s.direction&=~n.Right}},s.handleTouchStart=function(t){t.preventDefault();var e=t.targetTouches[0],n=window.devicePixelRatio||1;s.touchPos={x:e.pageX*n,y:e.pageY*n}},s.handleTouchEnd=function(){s.touchPos=null},s}return t(o,e),o.prototype.startListener=function(){"keyboard"===this.controlType?(window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp)):"touch"===this.controlType&&(window.addEventListener("touchstart",this.handleTouchStart,{passive:!1}),window.addEventListener("touchmove",this.handleTouchStart,{passive:!1}),window.addEventListener("touchend",this.handleTouchEnd),window.addEventListener("touchcancel",this.handleTouchEnd))},o.prototype.stopListener=function(){"keyboard"===this.controlType?(window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp)):"touch"===this.controlType&&(window.removeEventListener("touchstart",this.handleTouchStart),window.removeEventListener("touchmove",this.handleTouchStart),window.removeEventListener("touchend",this.handleTouchEnd),window.removeEventListener("touchcancel",this.handleTouchEnd))},o.prototype.render=function(){this.ctx.fillStyle=this.color,this.ctx.save(),this.getPlayerPath(),this.ctx.fill(),this.ctx.restore()},o.prototype.getPlayerPath=function(){this.ctx.beginPath();var t=this.getPlayerAngles();this.ctx.moveTo(t[0].x,t[0].y),this.ctx.lineTo(t[1].x,t[1].y),this.ctx.lineTo(t[2].x,t[2].y),this.ctx.closePath()},o.prototype.getPlayerAngles=function(){var t=this,e=i.PlayerHeight/2;return[{x:this.x,y:this.y-e},{x:this.x-Math.cos(Math.PI/6)*e,y:this.y+Math.sin(Math.PI/6)*e},{x:this.x+Math.cos(Math.PI/6)*e,y:this.y+Math.sin(Math.PI/6)*e}].map(function(e){var n=e.x,i=e.y;return{x:t.x+(n-t.x)*Math.cos(t.angle)-(i-t.y)*Math.sin(t.angle),y:t.y+(i-t.y)*Math.cos(t.angle)+(n-t.x)*Math.sin(t.angle)}})},o.prototype.update=function(){if("touch"===this.controlType){if(!this.touchPos)return;var t=Math.atan2(this.touchPos.y-this.y,this.touchPos.x-this.x);this.x+=i.PlayerStep*Math.cos(t),this.y+=i.PlayerStep*Math.sin(t),this.angle=t+Math.PI/2}else switch(this.direction&n.Up&&(this.y-=i.PlayerStep),this.direction&n.Down&&(this.y+=i.PlayerStep),this.direction&n.Left&&(this.x-=i.PlayerStep),this.direction&n.Right&&(this.x+=i.PlayerStep),this.direction){case n.Up:this.angle=0;break;case n.Down:this.angle=Math.PI;break;case n.Left:this.angle=Math.PI/2*3;break;case n.Right:this.angle=Math.PI/2;break;case n.Left|n.Up:this.angle=-Math.PI/4;break;case n.Left|n.Down:this.angle=-Math.PI/4*3;break;case n.Right|n.Up:this.angle=Math.PI/4;break;case n.Right|n.Down:this.angle=Math.PI/4*3}},o.prototype.isCrash=function(t){var e=!1;if(this.ctx.save(),this.getPlayerPath(),e=this.ctx.isPointInPath(t.x,t.y),this.ctx.restore(),!e)for(var n=this.getPlayerAngles(),i=0;i<n.length;i++){var o=n[i],r=i===n.length-1?n[0]:n[i+1],a={x:r.x-o.x,y:r.y-o.y},s={x:t.x-o.x,y:t.y-o.y},h=Math.sqrt(a.x*a.x+a.y*a.y),c=(a={x:a.x/h,y:a.y/h}).x*s.x+a.y*s.y,l=void 0,y=void 0;if(c<=0?(l=o.x,y=o.y):c>=h?(l=r.x,y=r.y):(l=o.x+c*a.x,y=o.y+c*a.y),Math.sqrt(Math.pow(t.x-l,2)+Math.pow(t.y-y,2))<t.r){e=!0;break}}return e},o}(o.default);exports.default=r;
},{"../config":"foLc","./Sprite":"iWx2"}],"dgAm":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var i=t(require("./sprite/BulletSprite")),e=require("./config"),h=t(require("./sprite/PlayreSprite")),s=function(){function t(t,i){this.canvas=t,this.isStart=!1,this.bullets=[],this.second=0,this.isMobile=i.isMobile;var e=window.devicePixelRatio||1;this.canvas.width=this.width=i.width*e,this.canvas.height=this.height=i.height*e,this.canvas.style.width=i.width+"px",this.canvas.style.height=i.height+"px",this.ctx=this.canvas.getContext("2d")}return Object.defineProperty(t.prototype,"count",{get:function(){return~~(this.second/1e3)},enumerable:!1,configurable:!0}),t.prototype.start=function(){var t=this;if(!this.isStart){this.player=new h.default(this.ctx,this.width/2,this.height/2,this.isMobile?"touch":"keyboard"),this.player.startListener();this.isStart=!0,requestAnimationFrame(function i(){if(!t.isStart)return t.render(),void(null==t||t.onGameOver(t.count));t.second+=16.67,t.render(),t.update(),requestAnimationFrame(i)})}},t.prototype.stop=function(){var t;this.isStart=!1,null===(t=this.player)||void 0===t||t.stopListener(),this.bullets.length=0,this.second=0},t.prototype.addNewBullet=function(){var t={x:this.width/2,y:this.height/2},h=Math.random()*(e.BulletRadiusRange[1]-e.BulletRadiusRange[0])+e.BulletRadiusRange[0],s=[{x:Math.random()*this.width,y:2*-h},{x:Math.random()*this.width,y:this.height+2*h},{x:2*-h,y:Math.random()*this.height},{x:this.width+2*h,y:Math.random()*this.height}][~~(4*Math.random())],r=s.x,n=s.y,a=new i.default(this.ctx,r,n,h,t);this.bullets.push(a)},t.prototype.render=function(){this.ctx.clearRect(0,0,this.width,this.height),this.renderBackground(),this.renderCount(),this.player.render(),this.bullets.forEach(function(t){return t.render()})},t.prototype.update=function(){var t=this;this.player.update();var i=e.PlayerHeight/2;this.player.x<i&&(this.player.x=i),this.player.y<i&&(this.player.y=i),this.player.x>this.width-i&&(this.player.x=this.width-i),this.player.y>this.height-i&&(this.player.y=this.height-i),this.bullets=this.bullets.filter(function(i){return i.update(),t.player.isCrash(i)&&(t.isStart=!1),!(i.x<2*-i.r||i.x>t.width+2*i.r||i.y<2*-i.r||i.y>t.height+2*i.r)});for(var h=this.bullets.length;h<e.BulletCount;h++)this.addNewBullet()},t.prototype.renderBackground=function(){this.ctx.fillStyle=e.BackgroundColor,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)},t.prototype.renderCount=function(){this.ctx.font=e.CountFont,this.ctx.textAlign="right",this.ctx.fillStyle="#000",this.ctx.fillText(""+this.count,this.width-20,50)},t}();exports.default=s;
},{"./sprite/BulletSprite":"qxir","./config":"foLc","./sprite/PlayreSprite":"E1Sc"}],"B6dB":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./game")),r=!!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),i=new t.default(document.getElementById("app"),{width:r?window.innerWidth:600,height:r?window.innerHeight:600,isMobile:r});i.start(),i.onGameOver=function(e){setTimeout(function(){e<10?alert("你只坚持了 "+e+" 秒，有点弱诶 🥴"):e<20?alert("你坚持了 "+e+" 秒，还算不错 🤓"):e<30?alert("你坚持了 "+e+" 秒，强啊 🤠"):e<100?alert("你坚持了 "+e+" 秒，你已经超神了！🥳"):alert("你丫的是开挂了吧？"),i.stop(),i.start()})};
},{"./game":"dgAm"}]},{},["B6dB"], null)
//# sourceMappingURL=src.4e33628f.js.map