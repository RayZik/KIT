import fs from "fs";



/**
 * Common tools functions
 */
export class Tools {

  /**
   * Get files content
   * @param dir - directory
   * @param mask - grep filename mask
   * @param code - кодировка файла
   * @param files - files array
   */
  static getDirFiles(dir: string, mask: string = '', code: string = 'utf8', files = []): string[] {
    // getting the list of files
    const filesNames = fs.readdirSync(dir);

    filesNames.forEach(fileName => {
      // creating the path of file
      const path = `${dir}/${fileName}`;
      // getting the information of file
      const stat = fs.statSync(path);

      // if it's a directory, then we go into it
      if (stat.isDirectory()) {
        this.getDirFiles(path, mask, code, files);
      } else {
        // else if it type is file and и он подходит под маску то then them content adding into variable
        if (fileName.match(String(mask)) !== null) {
          const content = fs.readFileSync(path, code);
          files.push(content);
        }
      }

    });

    return files;
  }
}