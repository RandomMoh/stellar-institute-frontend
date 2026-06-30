import React, { createContext, useContext, useState, useEffect } from 'react';

const WebsiteImagesContext = createContext({});

export function WebsiteImagesProvider({ children }) {
  const [images, setImages] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || '/api';
    fetch(`${API}/admin-images`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const imgMap = {};
          data.forEach(img => {
            imgMap[img.placeholder_key] = img.image_url;
          });
          setImages(imgMap);
        }
      })
      .catch(err => console.error('Failed to load website images:', err))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <WebsiteImagesContext.Provider value={{ images, loaded }}>
      {children}
    </WebsiteImagesContext.Provider>
  );
}

export function useWebsiteImage(placeholderKey) {
  const context = useContext(WebsiteImagesContext);
  if (!context || !context.images) return null;
  return context.images[placeholderKey] || null;
}

export function useWebsiteImages() {
  return useContext(WebsiteImagesContext);
}
