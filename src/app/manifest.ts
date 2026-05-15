import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Controle de Figurinhas Copa 2026',
    short_name: 'Álbum Copa',
    description: 'Controle suas figurinhas da Copa do Mundo de 2026',
    start_url: '/album-copa-2026/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/album-copa-2026/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/album-copa-2026/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
