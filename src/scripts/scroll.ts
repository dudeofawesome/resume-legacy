(function () {
  const sidebarEle: HTMLDivElement = document.querySelector('#sidebar') as HTMLDivElement;
  const nameEle: HTMLDivElement = document.querySelector('#sidebar .name') as HTMLDivElement;
  const nameContainerEle: HTMLDivElement = document.querySelector('#sidebar .name-container') as HTMLDivElement;
  const contactEle: HTMLDivElement = document.querySelector('#sidebar .contact') as HTMLDivElement;

  let isSmallScreen: boolean = false;
  let mq = window.matchMedia(`screen and (max-width: 46rem)`);
  isSmallScreen = mq.matches;
  mq.addListener(mq => {
    isSmallScreen = mq.matches;

    if (!isSmallScreen && nameEle.classList.contains('small-header')) {
      nameEle.classList.remove('small-header');
      nameContainerEle.style.transform = `scale3d(1, 1, 1)`;
      nameEle.style.transform = `scale3d(1, 1, 1)`;
    }
  });

  document.addEventListener('scroll', ev => {
    if (isSmallScreen) {
      let scroll_percent = window.scrollY / contactEle.clientHeight;
      scroll_percent = scroll_percent > 1 ? 1 : scroll_percent;
      scroll_percent = scroll_percent < 0 ? 0 : scroll_percent;

      const scale = Math.cos(scroll_percent * Math.PI) / 4 + 0.75;

      nameContainerEle.style.transform = `scale3d(${scale}, 1, 1)`;
      nameEle.style.transform = `scale3d(1, ${scale}, 1)`;

      if (window.scrollY - (sidebarEle.clientHeight - 44.5) > 0) {
        if (!nameEle.classList.contains('small-header')) {
          nameEle.classList.add('small-header');
        }
      } else {
        nameEle.classList.remove('small-header');
      }
    }
  });
})();
