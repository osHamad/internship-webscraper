import { fileURLToPath } from 'url';
import path from 'path';

// Get the current file name and directory
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
