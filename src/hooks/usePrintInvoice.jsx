const usePrintInvoice = () => {
  const handlePrint = (elementId = "printable-area") => {
    const printContents = document.getElementById(elementId)?.innerHTML;

    if (!printContents) {
      alert("Nothing to print.");
      return;
    }

    // Create a hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`
        <html>
          <head>
            <title>Mudra Billing System 💸</title>
            <style>
              
              @media print {
                body {
                  -webkit-print-color-adjust: exact;
                }
                #printable-area {
                    visibility: visible;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }

                #printable-area img {
                    max-width: 100%;
                }

              }
  
              body {
                font-family: "PT Serif", serif;
                padding: 10px;
                color: #000;
              }
  
              img {
                width: 110px;
                height: 110px;
                border-radius: 100%;
              }

              .companyData {margin-left: 10px; margin-top: -20px;}

              .companyData h2 {margin-bottom: -15px;}
              .companyData h3 {margin-bottom: -15px;}
              .companyData p {margin-bottom: -12px;}

              .customerDetails h2 {font-size: 16px; margin-bottom: -10px;}
              .customerDetails p {margin-bottom: -12px;}
              .customerDetails .memoNo {margin-bottom: 30px;}
              .customerDetails {margin-top: 50px;}
              .customerDetails div {margin-bottom: 20px;}

              .invoiceId h4 {margin-bottom: -12px;}

              .bg-[#f0f0f0] {background-color: #f0f0f0;}

              .bankDetails h3 {margin-bottom: -12px;}
              .bankDetails p {margin-bottom: -12px;}

              .termsCon h3 {margin-bottom: -12px;} 
              .termsCon p {margin-bottom: -12px;} 

              .invoiceFooter {margin-top: 70px;}
              .invoiceFooter {
                height: auto;
                // min-height: 150px;
                display: flex;
                justify-content: flex-end;
                // page-break-before: always;
            }


              .text-gray-700 {font-color: #364153;}

              .italic {font-style: italic;}

              .font-medium {
                   --tw-font-weight: var(--font-weight-medium) /* 500 */;
                   font-weight: var(--font-weight-medium) /* 500 */;
              }
  
              table {
                width: 100%;
                border-collapse: collapse;
                page-break-inside: avoid;
                margin-top: 30px;
              }
  
              th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: center;
              }
  
              .text-right {
                text-align: right;
              }
  
              .font-bold {
                font-weight: bold;
              }

              .text-center {
                text-align: center;
              }
            .text-2xl {font-size: 24px;}

            .border-b {
                border-bottom-style: var(--tw-border-style);
                border-bottom-width: 1px;
            }

            .pb-4 {
                padding-bottom: calc(var(--spacing) * 4)
            }

            .text-gray-600 {font-color: #4a5565;}
  
              
  
              .flex {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
  
              .border-t {
                border-top: 1px solid #000;
              }
  
              .w-40 {
                width: 160px;
              }
            </style>
          </head>
          <body onload="window.print(); setTimeout(() => window.close(), 100);">
            ${printContents}
          </body>
        </html>
      `);
      doc.close();
  };

  return handlePrint;
};

export default usePrintInvoice;
