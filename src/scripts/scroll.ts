(function () {
  const nameEle: HTMLDivElement = document.querySelector(
    'header .name',
  ) as HTMLDivElement;
  const nameContainerEle: HTMLDivElement = document.querySelector(
    'header .name-container',
  ) as HTMLDivElement;
  const infoEle: HTMLDivElement = document.querySelector(
    '#sidebar-info',
  ) as HTMLDivElement;

  let isSmallScreen: boolean = false;
  const mq = window.matchMedia(`screen and (max-width: 35rem)`);
  isSmallScreen = mq.matches;
  let wasSmallScreen = isSmallScreen;
  mq.addListener(mq => {
    isSmallScreen = mq.matches;

    if (!isSmallScreen && wasSmallScreen) {
      nameEle.classList.remove('small-header');
      nameContainerEle.style.transform = `scale3d(1, 1, 1)`;
      nameEle.style.transform = `scale3d(1, 1, 1)`;
    }

    wasSmallScreen = isSmallScreen;
  });

  let lastScroll = window.pageYOffset;
  document.addEventListener('scroll', ev => {
    if (isSmallScreen) {
      let scroll_percent = window.pageYOffset / infoEle.clientHeight;
      scroll_percent = Math.max(Math.min(scroll_percent, 1), 0);

      const scale = Math.cos(scroll_percent * Math.PI) / 4 + 0.75;

      nameContainerEle.style.transform = `scale3d(${scale}, 1, 1)`;
      nameEle.style.transform = `scale3d(1, ${scale}, 1)`;

      const scrollDown = window.pageYOffset > lastScroll;
      const name = nameEle.getBoundingClientRect();
      const info = infoEle.getBoundingClientRect();
      const borderWidth = 8;

      if (scrollDown && info.bottom <= name.bottom + borderWidth) {
        nameEle.classList.add('small-header');
      } else if (!scrollDown && info.bottom > name.bottom) {
        nameEle.classList.remove('small-header');
      }
    }

    lastScroll = window.pageYOffset;
  });
})();
