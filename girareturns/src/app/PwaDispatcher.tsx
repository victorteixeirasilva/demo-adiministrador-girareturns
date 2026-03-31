'use client';
import { useEffect } from 'react';

export default function DynamicManifest() {
  useEffect(() => {
    const pathID = localStorage.getItem('pathID');
    
    if (pathID) {
      const baseManifest = {
        "name": "GiraReturns",
        "short_name": "Girae",
        "display": "standalone",
        "background_color": "#000000",
        "theme_color": "#22C55E",
        "icons": [
          { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
          { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
        ],
        // Aqui montamos a rota dinâmica
        "start_url": `/login/?id=${pathID}`
      };

      // Cria um Blob com o conteúdo do manifesto
      const stringManifest = JSON.stringify(baseManifest);
      const blob = new Blob([stringManifest], { type: 'application/json' });
      const manifestURL = URL.createObjectURL(blob);

      // Substitui o link do manifesto no <head>
      const manifestLink = document.querySelector('link[rel="manifest"]');
      if (manifestLink) {
        manifestLink.setAttribute('href', manifestURL);
      }
    }
  }, []);

  return null; // Componente apenas de lógica
}