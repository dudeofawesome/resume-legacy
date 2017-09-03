(function () {
  const continueNavigation = (url: string): () => void => {
    return () => window.location.href = url;
  }

  const listener = (ev: MouseEvent) => {
    const anchor: HTMLAnchorElement = ev.srcElement as HTMLAnchorElement;

    // Send outbound link click event to GA
    ga('send', 'event', {
      eventCategory: 'Outbound Link',
      eventAction: ev.type,
      eventLabel: anchor.href,
      eventValue: +anchor.getAttribute('value') || 10,
      // Use a beacon, if available
      transport: navigator.sendBeacon != null ? 'beacon' : 'auto',
      hitCallback: continueNavigation(anchor.href)
    });

    /**
     * Force page navigation in case we fail to reach GA
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#knowing_when_the_hit_has_been_sent
     */
    setTimeout(continueNavigation(anchor.href), 1000);

    ev.preventDefault();
    return false;
  };

  // Find all anchor tags and add click listeners to them
  const anchors = document.getElementsByTagName('a');
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', listener);
  }
})();
