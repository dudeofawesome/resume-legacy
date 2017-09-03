/**
 * This script for tracking Printed Pages & Print Method in Google Analytics is provided as it is, and was put together by Eivind Savio
 * April 2013. Happy tracking!
 */
(function () {
  let runOnce: boolean;

  let printType: string;
  let mouseButton: string;

  const afterPrint = () => {
    // Because of Chrome we can only allow the code to run once.
    if (!runOnce) {
      runOnce = true;

      if (printType == null && mouseButton === 'Right') { // Print activated using Right Mouse Button
        printType = 'Right Mouse Button';
      } else if (printType == null) { // Print (probably) activated using Browser Menu
        printType = 'Browser Menu';
      }

      // Send Print Data to Google Analytics
      ga('send', 'event', {
        eventCategory: 'Page Print',
        eventAction: printType || 'unknown',
        eventLabel: window.location.pathname,
        eventValue: 100
      });

      printType = undefined;
      mouseButton = undefined;
    }
  };

  // Track printing from browsers using the Webkit engine
  if (window.matchMedia) {
    const mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(mql => {
      if (!mql.matches) {
        afterPrint();
      }
    });
  }

  // Internet Explorer
  window.onafterprint = afterPrint;

  // Track printing using Ctrl/Cmd+P.
  document.addEventListener('keydown', ev => {
    if (ev.keyCode === 80 && (ev.ctrlKey || ev.metaKey)) {
      printType = 'Ctrl/Cmd+P';
      // Opera is a little different so we must send the afterPrint() function to get the tracking to work.
      if (!!(window as any).opr || !!(window as any).opera) {
        afterPrint();
      }
    }
  });

  // Detect Right Mouse Button Click
  document.addEventListener('mousedown', ev => {
    if (ev.which === 3) {
      mouseButton = 'Right';
    }
  });
})();
