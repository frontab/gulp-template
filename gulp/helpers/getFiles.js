import { readdirSync } from 'fs';

// folderPath                 - путь к папке с файлами
// param                      - объект с данными
//    formats                 - форматы файлов для поиска в виде массива
//    isExtName               - наличие в названии файла расширения (не обязательно)
//    isSingleLevelDirectory  - ограничение в 1 уровень директории
//    ignoreDirectory         - игнорируемые директории

const getFiles = (folderPath, param = {}) => {
  const formats = param.formats || null;
  const { isExtName, isSingleLevelDirectory, ignoreDirectorys, ignoreFilesName } = param;

  const searchFiles = (path, options) => {
    const result = options.files || [];

    readdirSync(path, { withFileTypes: true })
      .forEach((dirent) => {
        const direntPath = `${path}/${dirent.name}`;
        if (dirent.isDirectory() && !isSingleLevelDirectory) {
          if (!dirent.name.includes(ignoreDirectorys)) {
            searchFiles(direntPath, {
              ...options,
              files: result,
            });
          }
        } else {
          const fileFormat = dirent.name.split('.').pop();
          if (formats && !formats.includes(fileFormat)) return;

          const fileName = isExtName
            ? dirent.name
            : dirent.name.replace(`.${fileFormat}`, '');
          if (fileName.includes(ignoreFilesName)) return;

          const filePath = path.replace(`${folderPath}`, '');
          result.push({
            name: fileName,
            path: filePath,
          });
        }
      });

    return result;
  };

  return searchFiles(folderPath, param);
};

export default getFiles;
