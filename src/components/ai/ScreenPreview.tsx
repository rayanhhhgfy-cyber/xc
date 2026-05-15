import React, { useEffect, useState } from 'react';

const ScreenPreview = () => {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:8000/api' : '/api';

  const fetchScreenshot = async () => {
    try {
      const response = await fetch(`${API_BASE}/screenshot`);
      const data = await response.json();
      setScreenshot(data.image);
    } catch (err) {
      console.error("Failed to fetch screenshot", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchScreenshot, 3000);
    fetchScreenshot();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-2 border-gray-700 rounded-lg overflow-hidden bg-black aspect-video flex items-center justify-center">
      {screenshot ? (
        <img
          src={`data:image/jpeg;base64,${screenshot}`}
          alt="Screen Preview"
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <div className="text-gray-500 animate-pulse">Connecting to backend...</div>
      )}
    </div>
  );
};

export default ScreenPreview;
