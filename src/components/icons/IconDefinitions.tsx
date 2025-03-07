import L from 'leaflet';

// Definição dos SVGs dos ícones
export const iconSvgs: { [key: string]: string } = {
  museum: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M12 2L2 8v2h20V8L12 2zm0 3L17 8H7l5-3zm8 7h-2v7c0 1.1-.9 2-2 2h-2v-7h-4v7H8c-1.1 0-2-.9-2-2v-7H4v7c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4v-7z"/></svg>',
  park: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h4v2h-4v4h-2v-4H7v-2h4V8z"/></svg>',
  beach: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M13.127 14.56l1.43-1.43 6.44 6.443L19.57 21zm4.293-5.73l2.86-2.86c-3.95-3.95-10.35-3.96-14.3-.02 3.93-1.3 8.31-.25 11.44 2.88zM5.95 5.98c-3.94 3.95-3.93 10.35.02 14.3l2.86-2.86C5.7 14.29 4.65 9.91 5.95 5.98zm.02-.02l-.01.01c-.38 3.01 1.17 6.88 4.3 10.02l5.73-5.73c-3.13-3.13-7.01-4.68-10.02-4.3z"/></svg>',
  landmark: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  attraction: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/></svg>',
  viewpoint: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',
  restaurant: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>',
  bar: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z"/></svg>',
  hotel: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>',
  religious: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/></svg>',
  theatre: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M4 10v7h3v-7H4zm14 0v7h3v-7h-3zM12 2C8.13 2 5 5.13 5 9v7h2V9c0-2.76 2.24-5 5-5s5 2.24 5 5v7h2V9c0-3.87-3.13-7-7-7zm0 18c2.76 0 5-2.24 5-5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H7c0 2.76 2.24 5 5 5z"/></svg>',
  tourism: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
  historic: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#1976d2"><path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/></svg>'
};

export const createIconHtml = (category: string, iconSize: number = 32) => {
  const svg = iconSvgs[category.toLowerCase()] || iconSvgs['landmark'];
  return `
    <div style="
      background-color: white;
      border-radius: 50%;
      width: ${iconSize}px;
      height: ${iconSize}px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    ">
      <div style="
        width: ${iconSize * 0.75}px;
        height: ${iconSize * 0.75}px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1976d2;
      ">
        ${svg}
      </div>
    </div>
  `;
};

export const createLeafletIcon = (category: string, iconSize: number = 32) => {
  return L.divIcon({
    html: createIconHtml(category, iconSize),
    className: 'custom-icon',
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize/2, iconSize/2],
  });
};

export const categories = [
  { key: 'museum', label: 'Museu' },
  { key: 'park', label: 'Parque' },
  { key: 'beach', label: 'Praia' },
  { key: 'landmark', label: 'Marco Histórico' },
  { key: 'attraction', label: 'Atração' },
  { key: 'viewpoint', label: 'Vista Panorâmica' },
  { key: 'restaurant', label: 'Restaurante' },
  { key: 'bar', label: 'Bar' },
  { key: 'hotel', label: 'Hotel' },
  { key: 'religious', label: 'Religioso' },
  { key: 'theatre', label: 'Teatro' },
  { key: 'tourism', label: 'Turismo' },
  { key: 'historic', label: 'Histórico' }
]; 