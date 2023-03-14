import { kebabCase } from "lodash";
import RNFetchBlob from "rn-fetch-blob";

const downloadDocument = async (
  url: string,
  fileName: string,
  callback: any
) => {
  const fileDest = RNFetchBlob.fs.dirs.DownloadDir + "/eSignbySquidSoft";
  if (!(await RNFetchBlob.fs.isDir(fileDest))) {
    RNFetchBlob.fs.mkdir(fileDest);
  }

  RNFetchBlob.fetch("GET", url)
    .then(async (result) => {
      console.log("RESPONSE:", result?.path());

      let filePath = fileDest + "/" + fileName;
      if (await RNFetchBlob.fs.exists(filePath)) {
        RNFetchBlob.fs.unlink(filePath);
      }
      const base64 = await result.base64();
      console.log("MIMETYPE:", result.respInfo.headers["Content-Type"]);
      const mimeType = result.respInfo.headers["Content-Type"];
      RNFetchBlob.fs
        .writeFile(filePath, base64, "base64")
        .then((res) => {
          console.log("RESPONSE FOR FILE CREATING", res);
          console.log("FILEPATH:", filePath);
          RNFetchBlob.android.addCompleteDownload({
            mime: mimeType,
            showNotification: true,
            description: `${fileName} downloaded successfully`,
            path: filePath,
            title: fileName,
          });
          RNFetchBlob.android.actionViewIntent(filePath, mimeType);
          callback(true);
        })
        .catch((er) => {
          console.log("ERRO FOR FILE CREATING", er);
          callback(false);
        });
    })
    .catch((reason) => {
      console.log("FAILED WHILE DOWNLAODING:", reason);
      callback(false);
    });
};

export default downloadDocument;
