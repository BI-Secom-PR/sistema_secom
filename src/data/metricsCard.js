export const metricCards = [
  {
    type: 'investment',
    title: 'Investimento',
    currentValue: 1000000,
    previousValue: 800000,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
      </svg>
    )
  },
  {
    type: 'impressions',
    title: 'Impressões',
    currentValue: 250000, 
    previousValue: 200000,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.5 18.5L9.5 12.5L13.5 16.5L22 6.92L20.59 5.5L13.5 13.5L9.5 9.5L2 17L3.5 18.5Z"/>
        <path d="M22 12V20H4V4H12V2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22H22C23.1 22 24 21.1 24 20V12H22Z"/>
      </svg>
    )
  },
  {
    type: 'views',
    title: 'Visualizações',
    currentValue: 180000,
    previousValue: 190000,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4C7 4 2.73 7.11 1 12C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12C21.27 7.11 17 4 12 4ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"/>
      </svg>
    )
  },
  {
    type: 'clicks',
    title: 'Cliques',
    currentValue: 45000,
    previousValue: 35000,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 5v10l5-5h6L9 5zm8.66 13A7.95 7.95 0 0112 20c-4.41 0-8-3.59-8-8 0-2.19.89-4.19 2.34-5.66l1.41 1.41A5.98 5.98 0 006 12c0 3.31 2.69 6 6 6 1.66 0 3.14-.69 4.22-1.78l1.44 1.44z"/>
      </svg>
    )
  },
  {
    type: 'engagement',
    title: 'Engajamento',
    currentValue: 75000,
    previousValue: 65000, 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V18H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V18H23V16.5C23 14.17 18.33 13 16 13Z"/>
      </svg>
    )
  }
 ];