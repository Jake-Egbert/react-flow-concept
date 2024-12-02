import React, { useEffect, useRef, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import jsQR from "jsqr";

const QRScanner = () => {
  const cameraRef = useRef(null);
  const screenshotRef = useRef(null);
  const [qrData, setQrData] = useState("");
  const [cameraIsOpen, setCameraIsOpen] = useState(false);

  const history = useHistory();

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

  const scanQRCode = useCallback(() => {
    const video = cameraRef.current;
    const canvas = screenshotRef.current;
    const context = canvas.getContext("2d");

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setQrData(code.data);
        history.push(code.data);
      } else {
        setQrData("No QR code detected");
      }
    }
  }, []);

  useEffect(() => {
    let interval;
    if (cameraIsOpen) {
      interval = setInterval(scanQRCode, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [cameraIsOpen, scanQRCode]);

  return (
    <>
      <button
        className="qr-scanner"
        onClick={() => setCameraIsOpen((prev) => !prev)}
      >
        {cameraIsOpen ? "Close Camera" : "Open Camera"}
      </button>
      {cameraIsOpen && (
        <div>
          <h1>QR Code Scanner</h1>
          <video
            ref={cameraRef}
            style={{ width: "500px" }}
            autoPlay
            playsInline
          />
          <p>{qrData}</p>
          <canvas ref={screenshotRef} style={{ display: "none" }}></canvas>
        </div>
      )}
    </>
  );
};

export default QRScanner;
