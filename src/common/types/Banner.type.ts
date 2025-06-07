export interface GridItemData {
  title: string;
  description: string;
  className: string; // Konsisten menggunakan className untuk layout grid
  imageUrl?: string; // Opsional
  icon?: React.ReactNode; // Opsional
}
