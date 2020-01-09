import 'whatwg-fetch';
import Print from 'print-js';

(async function() {
  const RESUME_PDF_URL = `/Louis Orleans' Résumé.pdf`;
  let prerendered_pdf_avail = false;

  const res = await fetch(RESUME_PDF_URL, {
    method: 'HEAD',
  });
  console.log(res);
  if (res.status === 200) {
    prerendered_pdf_avail = true;
  }

  (window as any).pdfPrint = () => {
    if (prerendered_pdf_avail) {
      Print(RESUME_PDF_URL);
    } else {
      window.print();
    }
  };
})();
