import { config } from '@/config';
import type { Category, Product } from '@/types';

const GOOGLE_SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';

interface SheetResponse {
  values: string[][];
}

/**
 * Fetch data from a specific sheet in the Google Spreadsheet
 */
async function fetchSheet(sheetName: string): Promise<string[][]> {
  const { apiKey, spreadsheetId } = config.googleSheets;
  
  if (!apiKey || !spreadsheetId) {
    console.error('Google Sheets API key or Spreadsheet ID not configured');
    return [];
  }

  const url = `${GOOGLE_SHEETS_API}/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: SheetResponse = await response.json();
    return data.values || [];
  } catch (error) {
    console.error(`Error fetching sheet ${sheetName}:`, error);
    return [];
  }
}

/**
 * Parse categories from sheet data
 * Expected columns: ID | Name | Description | Icon URL | Order
 */
function parseCategories(rows: string[][]): Category[] {
  if (rows.length <= 1) return []; // Skip if only header or empty
  
  const [, ...dataRows] = rows; // Skip header row
  
  return dataRows
    .filter(row => row.length >= 2) // At least ID and Name
    .map(row => ({
      id: row[0]?.trim() || '',
      name: row[1]?.trim() || '',
      description: row[2]?.trim() || '',
      iconUrl: row[3]?.trim() || undefined,
      order: parseInt(row[4]) || 0,
    }))
    .filter(category => category.id && category.name)
    .sort((a, b) => a.order - b.order);
}

/**
 * Parse products from sheet data
 * Expected columns: ID | Name | Description | Price | Category | Image URL | Images (comma-separated) | Stock | Featured | Has Sizes | Available Sizes (comma-separated) | Tags (comma-separated)
 */
function parseProducts(rows: string[][]): Product[] {
  if (rows.length <= 1) return []; // Skip if only header or empty
  
  const [, ...dataRows] = rows; // Skip header row
  
  return dataRows
    .filter(row => row.length >= 6) // At least basic fields
    .map(row => {
      const hasSizes = row[9]?.toLowerCase() === 'true' || row[9]?.toLowerCase() === 'yes' || row[9] === '1';
      const availableSizes = row[10] ? row[10].split(',').map(s => s.trim()).filter(Boolean) : undefined;
      const images = row[6] ? row[6].split(',').map(s => s.trim()).filter(Boolean) : undefined;
      const tags = row[11] ? row[11].split(',').map(s => s.trim()).filter(Boolean) : undefined;
      
      return {
        id: row[0]?.trim() || '',
        name: row[1]?.trim() || '',
        description: row[2]?.trim() || '',
        price: parseFloat(row[3]) || 0,
        category: row[4]?.trim() || '',
        imageUrl: row[5]?.trim() || '',
        images,
        stock: parseInt(row[7]) || 0,
        featured: row[8]?.toLowerCase() === 'true' || row[8]?.toLowerCase() === 'yes' || row[8] === '1',
        hasSizes,
        availableSizes: hasSizes ? availableSizes : undefined,
        tags,
      };
    })
    .filter(product => product.id && product.name && product.price > 0);
}

/**
 * Fetch all categories from Google Sheets
 */
export async function fetchCategories(): Promise<Category[]> {
  const rows = await fetchSheet(config.googleSheets.categoriesSheet);
  return parseCategories(rows);
}

/**
 * Fetch all products from Google Sheets
 */
export async function fetchProducts(): Promise<Product[]> {
  const rows = await fetchSheet(config.googleSheets.productsSheet);
  return parseProducts(rows);
}

/**
 * Fetch both categories and products
 */
export async function fetchStoreData() {
  const [categories, products] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
  ]);
  
  return { categories, products };
}
