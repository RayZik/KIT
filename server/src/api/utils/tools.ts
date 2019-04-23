import fs from 'fs';
import _ from 'lodash';
import { AuthenticationError } from 'apollo-server-core';
import { JWThelper } from '../../helpers/jwt.helper';
import { IAuthContext } from './../../interface';

/**
 * Get file contents
 * @param dir - directory
 * @param mask - grep filename mask
 * @param encoding - encoding
 * @param files - files array
 */
export function getDirFileContents(
  dir: string,
  mask: string = '',
  encoding: string = 'utf8',
  files = []
): string[] {
  // getting the list of files
  const filesNames = fs.readdirSync(dir);

  filesNames.forEach((fileName) => {
    // creating the path of file
    const path = `${dir}/${fileName}`;
    // getting the information of file
    const stat = fs.statSync(path);

    // if it's a directory, then we go into it
    if (stat.isDirectory()) {
      getDirFileContents(path, mask, encoding, files);
    } else {
      // else if it type is file and и он подходит под маску то then them content adding into variable
      if (fileName.match(String(mask)) !== null) {
        const content = fs.readFileSync(path, encoding);
        files.push(content);
      }
    }
  });

  return files;
}

/**
 * Handler for getting a user's id from context
 * @param ctx - context
 */
export function getUserIdFromCtx(ctx: IAuthContext) {
  const { token } = ctx;
  if (token) {
    const { id } = JWThelper.decodeToken(token);
    return id;
  } else {
    throw new AuthenticationError('Token not found');
  }
}
