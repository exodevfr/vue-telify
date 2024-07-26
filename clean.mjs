import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const extensionsToDelete = ['.d.ts', '.d.ts.map', '.js', '.js.map'];
const baseDirectory = path.join(__dirname, 'src');
async function deleteFilesRecursively(directory) {
  const files = await fs.readdir(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stats = await fs.stat(fullPath);
    if (stats.isDirectory()) {
      await deleteFilesRecursively(fullPath);
    } else {
      const extension = path.extname(file);
      if (extensionsToDelete.includes(extension)) {
        await fs.unlink(fullPath);
        console.log(`Deleted file: ${fullPath}`);
      }
    }
  }
  }
  deleteFilesRecursively(baseDirectory)
  .then(() => console.log('Clean completed.'))
  .catch(err => console.error('Error during clean:', err));