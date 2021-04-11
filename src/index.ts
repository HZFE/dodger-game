import swal from 'sweetalert';

import Game from './game';

const isMobile = !!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));

const game = new Game(
  document.getElementById('app') as HTMLCanvasElement,
  {
    width: isMobile ? document.body.offsetWidth : 600,
    height: isMobile ? document.body.offsetHeight: 600,
    isMobile,
  }
);

game.start();

game.onGameOver = async(count: number) => {
  let isConfirm = '';
  const alert = async (content: string) => swal(content, {
    buttons: ['不玩了', '再来一把!'],
    closeOnClickOutside: false,
  });
  if (count < 10) {
    isConfirm = await alert(`你只坚持了 ${count} 秒，有点弱诶 🥴`);
  } else if (count < 20) {
    isConfirm = await alert(`你坚持了 ${count} 秒，还算不错 🤓`);
  } else if (count < 30) {
    isConfirm = await alert(`你坚持了 ${count} 秒，强啊 🤠`);
  } else if (count < 100) {
    isConfirm = await alert(`你坚持了 ${count} 秒，你已经超神了！🥳`);
  } else {
    isConfirm = await alert('你丫的是开挂了吧？');
  }
  if (isConfirm) {
    game.start();
  }
};