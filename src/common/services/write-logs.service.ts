import { AppLogger } from './../modules/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { access, mkdir, readdir, appendFile, stat } from 'fs/promises';
import { constants } from 'fs';
import { join } from 'path';

@Injectable()
export class WriteLogService {
  private logger: AppLogger;
  private folderName = '../../../logs';
  private pathToFolder: string;
  private maxFileSize = +process.env.MAX_FILE_SIZE * 1000;

  constructor() {
    this.logger = new AppLogger(WriteLogService.name);
    this.pathToFolder = join(__dirname, this.folderName);
    this.addLogFolderIfNotExist();
  }

  async write(message: string): Promise<void> {
    let lastFile: string;
    let isFileBig = false;
    const files = await this.getLogFiles();

    if (files.length) {
      lastFile = this.getFilePath(files[0]);
      isFileBig = await this.checkFileMaxSize(lastFile);
    }

    const logFilePath =
      files.length === 0 || isFileBig
        ? this.getFilePath(Date.now() + '.log')
        : lastFile;

    appendFile(logFilePath, message + '\n');
  }

  async checkFileMaxSize(filePath: string): Promise<boolean> {
    return +(await stat(filePath)).size >= this.maxFileSize;
  }

  getFilePath(fileName: string): string {
    return join(__dirname, this.folderName, fileName);
  }

  async addLogFolderIfNotExist(): Promise<void> {
    try {
      await access(this.pathToFolder, constants.R_OK | constants.W_OK);
    } catch (err) {
      if (err.code === 'ENOENT') {
        mkdir(this.pathToFolder);
        this.logger.log('Logs folder created');
      }
    }
  }

  async getLogFiles(): Promise<string[]> {
    try {
      return (await readdir(this.pathToFolder)).sort(
        (a, b) => +b.split('.')[0] - +a.split('.')[0],
      );
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
