import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Weapon } from '../interfaces/Weapon';

// Function to convert weapons array to CSV format
export const exportToCSV = (weapons: Weapon[], filename: string) => {
  const csvContent = [
    ['ID', 'Model', 'Serial Number', 'Type', 'Status', 'Caliber', 'Location'],
    ...weapons.map(weapon => [
      weapon.id,
      weapon.model,
      weapon.serialNumber,
      weapon.type,
      weapon.Status,
      weapon.Caliber,
      weapon.location,
    ]),
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

// Function to convert weapons array to Excel format
export const exportToExcel = (weapons: Weapon[], filename: string) => {
  const worksheetData = [
    ['ID', 'Model', 'Serial Number', 'Type', 'Status', 'Caliber', 'Location'],
    ...weapons.map(weapon => [
      weapon.id,
      weapon.model,
      weapon.serialNumber,
      weapon.type,
      weapon.Status,
      weapon.Caliber,
      weapon.location,
    ]),
  ];

  const worksheet =  XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Weapons');
  XLSX.writeFile(workbook, filename);
};