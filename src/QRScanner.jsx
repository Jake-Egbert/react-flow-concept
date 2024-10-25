import React, { useEffect, useRef, useState, useCallback } from "react";

const QRScanner = () => {
  const cameraRef = useRef(null);
  const screenshotRef = useRef(null);
  const [qrData, setQrData] = useState("");
  const [cameraIsOpen, setCameraIsOpen] = useState(false);

  useEffect(() => {
    let stream;

    if (cameraIsOpen) {
      const startCamera = async () => {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (cameraRef.current) {
          cameraRef.current.srcObject = stream;
        }
      };

      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraIsOpen]);

  const handleScanClick = useCallback(async () => {
    if (!("BarcodeDetector" in window)) {
      alert("BarcodeDetector API is not supported in this browser.");
      return;
    }

    const barcodeDetector = new BarcodeDetector({ formats: ["qr_code"] });
    const video = cameraRef.current;
    const screenshot = screenshotRef.current;
    const context = screenshot.getContext("2d");

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      context.drawImage(video, 0, 0, screenshot.width, screenshot.height);

      try {
        const barcodes = await barcodeDetector.detect(screenshot);
        if (barcodes.length > 0) {
          setQrData(barcodes[0].rawValue);
        } else {
          setQrData("No QR code detected");
        }
      } catch (err) {
        console.error("Barcode detection failed:", err);
      }
    } else {
      setQrData("Camera still loading");
    }
  }, []);

  return (
    <>
      <button onClick={() => setCameraIsOpen((prev) => !prev)}>
        {cameraIsOpen ? "Close Camera" : "Open Camera"}
      </button>
      {cameraIsOpen && (
        <div>
          <h1>QR Code Scanner</h1>
          <video
            ref={cameraRef}
            style={{ width: "100%" }}
            autoPlay
            playsInline
          />
          <button onClick={handleScanClick}>Scan QR Code</button>
          {qrData && <p>{qrData}</p>}

          <canvas ref={screenshotRef}></canvas>
        </div>
      )}
    </>
  );
};

export default QRScanner;
