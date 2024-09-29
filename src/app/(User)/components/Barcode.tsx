// components/Barcode.tsx
import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface BarcodeProps {
  value: string | number;
}

const Barcode: React.FC<BarcodeProps> = ({ value }) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value.toString(), {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 30,
        displayValue: false,
      });
    }
  }, [value]);

  return <svg ref={barcodeRef}></svg>;
};

export default Barcode;
