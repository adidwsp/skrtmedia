export interface Ticket {
  id: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  ticketType: string;
  price: number;
  qrCodeUrl: string; // URL ke gambar QR code atau data
  isUsed: boolean;
}