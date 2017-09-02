if (window.location.hostname !== `localhost`) {
  ga('create', 'UA-46636851-8', 'auto');
}

ga('send', 'pageview');

const listener = (ev: MouseEvent) => {
  const anchor: HTMLAnchorElement = ev.srcElement as HTMLAnchorElement;
  ga('send', {
    hitType: 'event',
    eventCategory: 'Click Link',
    eventAction: anchor.hasAttribute('name') ? anchor.getAttribute('name') : anchor.innerHTML,
    eventLabel: anchor.href
  });
};

const anchors = document.getElementsByTagName('a');
for (let i = 0; i < anchors.length; i++) {
  anchors[i].addEventListener('click', listener);
}
