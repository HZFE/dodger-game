import Game from './game';

const isMobile = !!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));

const game = new Game(
  document.getElementById('app') as HTMLCanvasElement,
  {
    width: isMobile ? window.innerWidth : 600,
    height: isMobile ? window.innerHeight: 600,
    isMobile,
  }
);

game.start();

game.onGameOver = (count: number) => {
  setTimeout(() => {
    if (count < 10) {
      alert(`你只坚持了 ${count} 秒，有点弱诶 🥴`);
    } else if (count < 20) {
      alert(`你坚持了 ${count} 秒，还算不错 🤓`);
    } else if (count < 30) {
      alert(`你坚持了 ${count} 秒，强啊 🤠`);
    } else if (count < 100) {
      alert(`你坚持了 ${count} 秒，你已经超神了！🥳`);
    } else {
      alert('你丫的是开挂了吧？');
    }
    game.stop();
    game.start();
  });
};