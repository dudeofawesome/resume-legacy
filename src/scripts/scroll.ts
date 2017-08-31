const sidebarEle: HTMLDivElement = document.querySelector('#sidebar') as HTMLDivElement;
const nameEle: HTMLDivElement = document.querySelector('#sidebar .name') as HTMLDivElement;
const nameContainerEle: HTMLDivElement = document.querySelector('#sidebar .name-container') as HTMLDivElement;
const contactEle: HTMLDivElement = document.querySelector('#sidebar .contact') as HTMLDivElement;

document.addEventListener('scroll', ev => {
  let scroll_percent = window.scrollY / contactEle.clientHeight;
  scroll_percent = scroll_percent > 1 ? 1 : scroll_percent;
  scroll_percent = scroll_percent < 0 ? 0 : scroll_percent;

  // const scale = Math.cos(scroll_percent * Math.PI) / 4 + 0.75;
  const scale = -scroll_percent / 2 + 1;

  nameContainerEle.style.transform = `scale3d(${scale}, 1, 1)`;
  nameEle.style.transform = `scale3d(1, ${scale}, 1)`;

  if (window.scrollY - (sidebarEle.clientHeight - 44.5) > 0) {
    if (!nameEle.classList.contains('small-header')) {
      nameEle.classList.add('small-header');
    }
  } else {
    nameEle.classList.remove('small-header');
  }
});

// const intersectionObserver = new IntersectionObserver(entries => {
//   console.log(entries);
// }, {
//   // root: document.querySelector('#sidebar .name'),
//   threshold: 0
// });

// intersectionObserver.observe(document.querySelector('#sidebar .contact'));
