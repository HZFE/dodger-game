import Game from './game';

const game = new Game(
  document.getElementById('app') as HTMLCanvasElement,
  {
    width: 600,
    height: 600,
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
    } else {
      alert(`你坚持了 ${count} 秒，你已经超神了！🥳`);
    }
    game.stop();
    game.start();
  });
};