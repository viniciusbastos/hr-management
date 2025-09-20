import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Weapon } from '../interfaces/Weapon'

// Function to convert weapons array to CSV format
export const exportToCSV = (weapons: Weapon[], filename: string) => {
  const csvContent = [
    ['ID', 'Model', 'Serial Number', 'Type', 'Status', 'Caliber', 'Location'],
    ...weapons.map((weapon) => [
      weapon.id,
      weapon.model,
      weapon.serialNumber,
      weapon.type,
      weapon.Status,
      weapon.Caliber,
      weapon.location,
    ]),
  ]
    .map((row) => row.join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, filename)
}

// Function to convert weapons array to Excel format

interface ColumnMapping<T> {
  header: string
  key: keyof T
}

export const exportToExcel = <T extends Record<string, any>>(
  data: T[],
  columns: ColumnMapping<T>[],
  filename: string
) => {
  // Create the worksheet data with headers and mapped data
  const worksheetData = [
    columns.map((column) => column.header),
    ...data.map((item) => columns.map((column) => item[column.key])),
  ]

  // Create a workbook and add the worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

  // Write the file to disk
  XLSX.writeFile(workbook, filename)
}

// Example usage for weapons data

export const exportWeaponsToExcel = (weapons: Weapon[], filename: string) => {
  const columns: ColumnMapping<Weapon>[] = [
    { header: 'ID', key: 'id' },
    { header: 'Model', key: 'model' },
    { header: 'Serial Number', key: 'serialNumber' },
    { header: 'Type', key: 'type' },
    { header: 'Status', key: 'Status' },
    { header: 'Caliber', key: 'Caliber' },
    { header: 'Location', key: 'location' },
  ]

  exportToExcel(weapons, columns, filename)
}
