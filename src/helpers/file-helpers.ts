import * as fs from 'fs';
import * as path from 'path';
export const UPLOADS_PATH = path.join(process.cwd(), 'Uploads');
import AdmZip from 'adm-zip';
import { Page } from '@playwright/test';

// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────

export interface DownloadFileOptions {
  page: Page;
  triggerAction: () => Promise<void>;
  savePath?: string;
}

export interface ExtractZipOptions {
  zipFilePath: string;
  extractTo?: string;
  targetFileName?: string;
}

export interface DeleteFilesOptions {
  directory: string;
  extensions?: string[];
  pattern?: string | RegExp;
  olderThanMs?: number;
}

export interface FileCleanupTracker {
  trackedFiles: string[];
  track(filePath: string): void;
  runCleanup(): void;
  clearTracked(): void;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Private helpers
// ─────────────────────────────────────────────────────────────────────────────

function ensureDirectoryExists(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function validateFilePath(filePath: string): string {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`File not found: ${resolved}`);
  }
  return resolved;
}

function validateDirectory(dirPath: string): string {
  const resolved = path.resolve(dirPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Directory not found: ${resolved}`);
  }
  return resolved;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Exported functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Waits for a download triggered by a page action and returns the file name.
 * The file is automatically saved to the provided save path or default download directory.
 *
 * @param options.page           Playwright Page instance
 * @param options.triggerAction  Async function that triggers the download
 * @param options.savePath       Optional full path where file should be saved
 *
 * @example
 * const fileName = await downloadFile({
 *   page,
 *   triggerAction: () => page.click('#download-btn'),
 * });
 * // → 'report.csv'
 *
 * @example
 * const filePath = await downloadFile({
 *   page,
 *   triggerAction: () => page.click('#export-btn'),
 *   savePath: './test-data/exports/report.pdf',
 * });
 * // → './test-data/exports/report.pdf'
 */
export async function downloadFile(options: DownloadFileOptions): Promise<string> {
  const { page, triggerAction, savePath } = options;

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    triggerAction(),
  ]);

  const fileName = download.suggestedFilename();

  if (savePath) {
    const dir = path.dirname(savePath);
    ensureDirectoryExists(dir);
    await download.saveAs(savePath);
    console.log(`  Downloaded: ${fileName} → ${savePath}`);
    return savePath;
  }

  // Default: save to downloads directory
  const defaultPath = path.join(process.cwd(), 'downloads', fileName);
  ensureDirectoryExists(path.dirname(defaultPath));
  await download.saveAs(defaultPath);
  console.log(`  Downloaded: ${fileName} → ${defaultPath}`);
  return fileName;
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Gets the most recently modified file name from a directory.
 * Useful when a download happens outside of Playwright's event system.
 *
 * @param directory  Directory to scan (defaults to './downloads')
 *
 * @example
 * const latestFile = getLatestFileName('./downloads');
 * // → 'report-2024-06-15.pdf'
 */
export function getLatestFileName(directory: string = './downloads'): string {
  const dir = path.resolve(directory);
  ensureDirectoryExists(dir);

  const files = fs.readdirSync(dir).filter((file) => {
    const fullPath = path.join(dir, file);
    return fs.statSync(fullPath).isFile();
  });

  if (files.length === 0) {
    throw new Error(`No files found in directory: ${dir}`);
  }

  const latestFile = files.sort((a, b) => {
    const timeA = fs.statSync(path.join(dir, a)).mtimeMs;
    const timeB = fs.statSync(path.join(dir, b)).mtimeMs;
    return timeB - timeA;
  })[0];

  console.log(`  Latest file: ${latestFile}`);
  return latestFile;
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Extracts a ZIP file and returns the list of file names inside it.
 * Optionally extracts all contents to a specified directory.
 *
 * @param options.zipFilePath   Path to the ZIP file
 * @param options.extractTo     Optional directory to extract contents into
 *
 * @example
 * const files = extractZip({ zipFilePath: './downloads/bundle.zip' });
 * // → ['data.json', 'report.csv', 'images/logo.png']
 *
 * @example
 * const files = extractZip({
 *   zipFilePath: './downloads/bundle.zip',
 *   extractTo: './downloads/extracted',
 * });
 * // Files extracted to ./downloads/extracted/
 */
export function extractZip(options: Omit<ExtractZipOptions, 'targetFileName'>): string[] {
  const { zipFilePath, extractTo } = options;
  const zipPath = validateFilePath(zipFilePath);

  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();
  const fileNames = entries
    .filter((entry) => !entry.isDirectory)
    .map((entry) => entry.entryName);

  if (extractTo) {
    ensureDirectoryExists(extractTo);
    zip.extractAllTo(extractTo, true);
    console.log(`  ZIP extracted: ${path.basename(zipPath)} → ${extractTo}`);
    console.log(`   Files: ${fileNames.join(', ')}`);
  } else {
    console.log(`  ZIP contents: ${fileNames.join(', ')}`);
  }

  return fileNames;
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Extracts a specific file from a ZIP archive and returns its extracted path.
 *
 * @param options.zipFilePath    Path to the ZIP file
 * @param options.targetFileName Name of the file to extract from the ZIP
 * @param options.extractTo      Directory to extract into (defaults to './downloads')
 *
 * @example
 * const jsonPath = extractFileFromZip({
 *   zipFilePath: './downloads/bundle.zip',
 *   targetFileName: 'data.json',
 *   extractTo: './downloads/extracted',
 * });
 * // → './downloads/extracted/data.json'
 */
export function extractFileFromZip(options: Required<ExtractZipOptions>): string {
  const { zipFilePath, targetFileName, extractTo } = options;
  const zipPath = validateFilePath(zipFilePath);

  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();
  const fileNames = entries
    .filter((entry) => !entry.isDirectory)
    .map((entry) => entry.entryName);

  const match = fileNames.find(
    (name) => name.endsWith(targetFileName) || path.basename(name) === targetFileName
  );

  if (!match) {
    throw new Error(
      `File "${targetFileName}" not found in ZIP. Available files: ${fileNames.join(', ')}`
    );
  }

  ensureDirectoryExists(extractTo);
  zip.extractAllTo(extractTo, true);

  const extractedPath = path.join(extractTo, match);
  console.log(`  Extracted: ${targetFileName} → ${extractedPath}`);
  return extractedPath;
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Copies a file from source to destination path.
 *
 * @param sourcePath  Full path to the source file
 * @param destPath    Full path to the destination (including file name)
 *
 * @example
 * copyFile('./downloads/report.pdf', './test-data/reports/backup.pdf');
 */
export function copyFile(sourcePath: string, destPath: string): void {
  const source = validateFilePath(sourcePath);
  const dir = path.dirname(destPath);
  ensureDirectoryExists(dir);

  fs.copyFileSync(source, destPath);
  console.log(`  Copied: ${path.basename(source)} → ${destPath}`);
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Reads and parses a JSON file, returning its contents as a typed object.
 *
 * @param filePath  Full path to the JSON file
 *
 * @example
 * const data = readJson<{ userId: number; name: string }>('./downloads/user.json');
 * console.log(data.name);
 */
export function readJson<T = Record<string, unknown>>(filePath: string): T {
  const fullPath = validateFilePath(filePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');

  try {
    const parsed = JSON.parse(raw) as T;
    console.log(`  JSON read: ${path.basename(fullPath)}`);
    return parsed;
  } catch (err) {
    throw new Error(`Failed to parse JSON from "${fullPath}": ${err}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Reads a specific key from a JSON file.
 *
 * @param filePath  Full path to the JSON file
 * @param key       The key to retrieve from the JSON object
 *
 * @example
 * const userId = readJsonKey<number>('./downloads/user.json', 'userId');
 */
export function readJsonKey<T = unknown>(filePath: string, key: string): T {
  const data = readJson<Record<string, unknown>>(filePath);

  if (!(key in data)) {
    throw new Error(`Key "${key}" not found in JSON file: ${filePath}`);
  }

  return data[key] as T;
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Writes data to a JSON file at a specific location (creates or overwrites).
 *
 * @param filePath  Full path where the JSON file should be saved
 * @param data      The data to serialize and write
 * @param pretty    Whether to pretty-print the JSON (default: true)
 *
 * @example
 * writeJson('./test-data/output.json', { status: 'passed', count: 42 });
 */
export function writeJson<T = unknown>(
  filePath: string,
  data: T,
  pretty: boolean = true
): void {
  const dir = path.dirname(filePath);
  ensureDirectoryExists(dir);

  const content = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  JSON written: ${path.basename(filePath)} → ${filePath}`);
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Updates (merges) specific fields into an existing JSON file without overwriting other keys.
 *
 * @param filePath  Full path to the JSON file
 * @param updates   Partial object with keys/values to update
 *
 * @example
 * updateJson('./test-data/config.json', { retries: 3, baseUrl: 'https://new.url' });
 */
export function updateJson<T extends Record<string, unknown>>(
  filePath: string,
  updates: Partial<T>
): void {
  let existing: T = {} as T;

  if (fs.existsSync(filePath)) {
    existing = readJson<T>(filePath);
  }

  const merged = { ...existing, ...updates };
  writeJson(filePath, merged);
  console.log(`  JSON updated: ${path.basename(filePath)}`);
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Checks if a file exists at the given path.
 *
 * @example
 * if (fileExists('./downloads/report.pdf')) {
 *   console.log('File found!');
 * }
 */
export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Waits until a file appears in a directory (polling-based).
 * Useful for background/async downloads.
 *
 * @param fileName    The expected file name
 * @param directory   Directory to monitor (defaults to './downloads')
 * @param timeoutMs   Max wait time in milliseconds (default: 10000)
 * @param intervalMs  Polling interval in milliseconds (default: 500)
 *
 * @example
 * await waitForFile('report.csv', './downloads', 15000);
 */
export async function waitForFile(
  fileName: string,
  directory: string = './downloads',
  timeoutMs: number = 10000,
  intervalMs: number = 500
): Promise<string> {
  const fullPath = path.join(path.resolve(directory), fileName);
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (fs.existsSync(fullPath)) {
        clearInterval(interval);
        console.log(`⏱️  File appeared: ${fileName}`);
        resolve(fullPath);
      } else if (Date.now() - start > timeoutMs) {
        clearInterval(interval);
        reject(new Error(`Timeout waiting for file: ${fullPath}`));
      }
    }, intervalMs);
  });
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Deletes a single file. Silently skips if the file does not exist.
 *
 * @param filePath  Full path to the file to delete
 *
 * @example
 * deleteFile('./downloads/temp.zip');
 */
export function deleteFile(filePath: string): void {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`   Deleted: ${path.basename(filePath)}`);
  } else {
    console.warn(`   File not found (skipping): ${filePath}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Deletes multiple files in one call. Silently skips any that don't exist.
 *
 * @param filePaths  Array of full file paths to delete
 *
 * @example
 * deleteFiles([
 *   './downloads/report.csv',
 *   './downloads/bundle.zip',
 *   './test-data/output.json',
 * ]);
 */
export function deleteFiles(filePaths: string[]): void {
  filePaths.forEach((filePath) => deleteFile(filePath));
  console.log(`   Deleted ${filePaths.length} file(s)`);
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Deletes all files matching specific extensions inside a directory.
 * Does NOT recurse into subdirectories.
 *
 * @param options.directory   Directory to clean
 * @param options.extensions  File extensions to target (e.g. ['.csv', '.zip'])
 *                           Omit to delete ALL files
 *
 * @example
 * deleteFilesByExtension({ directory: './downloads', extensions: ['.zip', '.csv'] });
 * deleteFilesByExtension({ directory: './downloads' }); // deletes everything
 */
export function deleteFilesByExtension(options: DeleteFilesOptions): void {
  const { directory, extensions } = options;
  const dir = path.resolve(directory);

  if (!fs.existsSync(dir)) {
    console.warn(`   Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir).filter((file) => {
    const fullPath = path.join(dir, file);
    if (!fs.statSync(fullPath).isFile()) return false;
    if (!extensions || extensions.length === 0) return true;
    return extensions.includes(path.extname(file).toLowerCase());
  });

  files.forEach((file) => fs.unlinkSync(path.join(dir, file)));

  const extLabel = extensions?.join(', ') ?? 'all';
  console.log(`   Deleted ${files.length} file(s) [${extLabel}] from: ${directory}`);
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Deletes files in a directory whose names match a given pattern (RegExp or substring).
 *
 * @param options.directory  Directory to scan
 * @param options.pattern    A string (partial match) or RegExp to match against file names
 *
 * @example
 * deleteFilesByPattern({ directory: './downloads', pattern: /^report-\d+/ });
 * deleteFilesByPattern({ directory: './downloads', pattern: 'temp' });
 */
export function deleteFilesByPattern(options: Required<Pick<DeleteFilesOptions, 'directory' | 'pattern'>>): void {
  const { directory, pattern } = options;
  const dir = path.resolve(directory);

  if (!fs.existsSync(dir)) {
    console.warn(`   Directory not found: ${dir}`);
    return;
  }

  const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

  const matched = fs.readdirSync(dir).filter((file) => {
    const fullPath = path.join(dir, file);
    return fs.statSync(fullPath).isFile() && regex.test(file);
  });

  matched.forEach((file) => fs.unlinkSync(path.join(dir, file)));

  console.log(`   Deleted ${matched.length} file(s) matching "${pattern}" from: ${directory}`);
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Deletes files older than a specified age from a directory.
 *
 * @param options.directory    Directory to scan
 * @param options.olderThanMs  Max age in milliseconds (e.g. 60_000 = files older than 1 min)
 *
 * @example
 * deleteFilesOlderThan({ directory: './downloads', olderThanMs: 60_000 });       // 1 minute
 * deleteFilesOlderThan({ directory: './downloads', olderThanMs: 24 * 60 * 60 * 1000 }); // 1 day
 */
export function deleteFilesOlderThan(
  options: Required<Pick<DeleteFilesOptions, 'directory' | 'olderThanMs'>>
): void {
  const { directory, olderThanMs } = options;
  const dir = path.resolve(directory);

  if (!fs.existsSync(dir)) {
    console.warn(`   Directory not found: ${dir}`);
    return;
  }

  const now = Date.now();
  let count = 0;

  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isFile() && now - stat.mtimeMs > olderThanMs) {
      fs.unlinkSync(fullPath);
      count++;
    }
  });

  console.log(`   Deleted ${count} file(s) older than ${olderThanMs}ms from: ${directory}`);
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Clears all files directly inside a directory (non-recursive).
 * Subdirectories themselves are preserved.
 *
 * @param directory  Directory to clear
 *
 * @example
 * clearDirectory('./downloads');
 */
export function clearDirectory(directory: string): void {
  deleteFilesByExtension({ directory });
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Recursively deletes an entire directory and all its contents, then re-creates it empty.
 *
 * @param directory  The directory to wipe and recreate
 *
 * @example
 * cleanDirectory('./downloads/extracted');
 */
export function cleanDirectory(directory: string): void {
  const dir = path.resolve(directory);

  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`   Removed: ${directory}`);
  }

  fs.mkdirSync(dir, { recursive: true });
  console.log(`  Recreated: ${directory}`);
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a file cleanup tracker that can register files during tests
 * and clean them up automatically in afterEach hooks.
 *
 * @example
 * const tracker = createFileCleanupTracker();
 *
 * // In your test:
 * tracker.track('./downloads/report.csv');
 * tracker.track('./test-data/output.json');
 *
 * // In afterEach:
 * tracker.runCleanup();
 */
export function createFileCleanupTracker(): FileCleanupTracker {
  const trackedFiles: string[] = [];

  return {
    trackedFiles,

    track(filePath: string): void {
      trackedFiles.push(filePath);
      console.log(`  Tracked for cleanup: ${path.basename(filePath)}`);
    },

    runCleanup(): void {
      if (trackedFiles.length === 0) {
        console.log('  No tracked files to clean up.');
        return;
      }
      console.log(`  Running cleanup for ${trackedFiles.length} tracked file(s)...`);
      deleteFiles([...trackedFiles]);
      trackedFiles.length = 0; // Clear array
    },

    clearTracked(): void {
      trackedFiles.length = 0;
      console.log('  Cleared tracked file list (files NOT deleted).');
    },
  };
}
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the list of file names inside a ZIP archive without extracting it.
 *
 * @param zipFilePath  Path to the ZIP file
 *
 * @example
 * const files = getFileNamesFromZip('./downloads/bundle.zip');
 * // → ['data.json', 'report.csv', 'images/logo.png']
 */
export function getFileNamesFromZip(zipFilePath: string): string[] {
  const zipPath = validateFilePath(zipFilePath);

  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();
  const fileNames = entries
    .filter((entry) => !entry.isDirectory)
    .map((entry) => entry.entryName);

  console.log(` ZIP contents (${fileNames.length} files): ${path.basename(zipPath)}`);
  return fileNames;
}
