import { writeFileSync } from 'fs';
import getFiles from './getFiles';

const autoImport = (options = {}) => {
  const {
    folderPath,               // путь к папке с файлами (обязательно)
    formats,                  // форматы файлов для поиска (не обязательно); по умолчанию все форматы
    fileImport,               // путь к файлу, в который будут записывать импорты (обязательно)
    importTemplate,           // функция возвращающая строку для щаписи в файл (обязательно)
    isExtName,                // наличие в названии файла расширение (не обязательно); по умолчанию без расширения
    isSingleLevelDirectory,   // ограничение на 1 уровень вложенности
    ignoreDirectorys,         // список игнорируемых директорий
    ignoreFilesName,          // скисок игнорируемых названий файлов
  } = options;

  const allFiles = getFiles(folderPath, {
    formats,
    isExtName,
    isSingleLevelDirectory,
    ignoreDirectorys,
    ignoreFilesName,
  });

  const result = allFiles.map((item) => importTemplate(item));

  writeFileSync(fileImport, result.join(''));
};

export default autoImport;
