import domtoimage from "dom-to-image";

const useShareInvoice = async () => {
  const node = document.getElementById("printable-area");
  if (!node) return alert("Invoice not found");

  try {
    const blob = await domtoimage.toBlob(node);
    const file = new File([blob], "invoice.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "Invoice",
        text: "Here's the invoice.",
        files: [file],
      });
    } else {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }
  } catch (err) {
    console.error("Share failed:", err);
    alert("Sharing failed.");
  }
};

export default useShareInvoice;