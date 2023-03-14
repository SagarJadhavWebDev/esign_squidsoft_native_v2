import { PDFDocument } from "pdf-lib";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import RNFetchBlob, { RNFetchBlobFile } from "rn-fetch-blob";
import ApiConfig from "../constants/ApiConfig";

//import { FieldType } from "../../views/components/constants/stringConstants";
//import toast from "react-hot-toast";

interface exportDocumentProps {
  data: string[];
  url: string;
  docName: string;
  setDownloading: any;
}

// const actualDownload = () => {
//   const { dirs } = RNFetchBlob.fs;
//   const dirToSave = Platform.OS == "ios" ? dirs.DocumentDir : dirs.DownloadDir;
//   const configfb = {
//     fileCache: true,
//     useDownloadManager: true,
//     notification: true,
//     mediaScannable: true,
//     title: "pdfInfo.pdf",
//     path: `${dirToSave}/${"pdfInfo.pdf"}`,
//   };
//   const configOptions = Platform.select({
//     android: configfb,
//   });

//   console.log("The file saved to 23233", configfb, dirs);

//   configOptions &&
//     RNFetchBlob.config(configOptions)
//       .fetch(
//         "GET",
//         `https://aquatherm.s3.ap-south-1.amazonaws.com/pdfs/${pdfInfo.pdf}`,
//         {}
//       )
//       .then((res) => {
//         if (Platform.OS === "ios") {
//           RNFetchBlob.fs.writeFile(configfb.path, res.data, "base64");
//           RNFetchBlob.ios.previewDocument(configfb.path);
//         }
//         //setisdownloaded(false)
//         if (Platform.OS == "android") {
//           // showSnackbar('File downloaded');
//         }
//         console.log("The file saved to ", res);
//       })
//       .catch((e) => {
//         //setisdownloaded(true)
//         //showSnackbar(e.message);
//         console.log("The file saved to ERROR", e.message);
//       });
// };
const storagePemissionCheck = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //actualDownload();
      return true;
    } else {
      Alert.alert(
        "Permission Denied!",
        "You need to give storage permission to download the file"
      );
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};
const ExportDocument = async (
  data: any,
  url: any,
  docName: any,
  setDownloading: any,
  toast: any
) => {
  storagePemissionCheck();
  const pdfDoc = await PDFDocument.load(url);
  const fetchImage = async (jpgUrl: string) => {
    console.log("JPG URL FETCH", jpgUrl);
    if (jpgUrl) {
      const imageBytes = await RNFetchBlob.config({ fileCache: true })
        .fetch("GET", jpgUrl)
        .then((res) => {
          return res.base64();
        });
      const re = /(?:\.([^.]+))?$/;
      const arrT = re.exec(jpgUrl) as any;
      const str = arrT[1];
      const ext = str.split("?")[0];

      console.log("IMAGE BYTES:", ext);
      const jpgImage =
        ext === "png"
          ? await pdfDoc.embedPng(imageBytes)
          : await pdfDoc.embedJpg(imageBytes);
      return jpgImage;
    }
    return null;
  };

  if (pdfDoc) {
    const pages = pdfDoc.getPages();
    console.log("PDF PAGES", pages);
    const waitforMap = data.map(async (d: any, index: any) => {
      console.log("PDF DATA", index);
      const rp = d?.response_payload;
      const pageNumber = rp.pageno;
      const page = pages[pageNumber - 1];
      console.log("PDF PAGE:", page);
      const { height } = page.getSize();
      const fw = rp.width;
      const fh = rp.height;
      const dw =
        ((page.getWidth() - rp?.dispalypagewidth) / rp?.dispalypagewidth) * 100;
      const dh =
        ((page.getHeight() - rp?.displaypageheight) / rp?.displaypageheight) *
        100;
      //   p?.width + (dpw / 100) * p?.width
      const dwidth = fw + (dw / 100) * fw;
      const dheight = fh + (dh / 100) * fh;
      const xcord = rp.xCord + (dw / 100) * rp.xCord;
      const ycord = rp.yCord + (dh / 100) * rp.yCord;
      const type = rp.type;
      const fontSize = rp.fontsize || dwidth / 12;
      const textToFill = d?.meta_data?.fieldvalue || "";
      const imageUrlToFill =
        d?.user_digital_credentials_id &&
        (await fetchImage(
          `${ApiConfig.FILES_URL}${d?.image_url}?${Date.now()}`
        ));
      // console.log("IMAGEURL TO FILL:", imageUrlToFill);

      switch (type) {
        case "text":
        case "date":
        case "time":
          page.drawText(textToFill, {
            x: xcord + 0.5,
            y: height - (ycord + dheight - (dheight / 2 - fontSize / 2) - 4),
            size: fontSize,
          });
          break;
        case "signature":
        case "initial":
        case "stamp":
          console.log("ImageUrlToFill");
          if (imageUrlToFill) {
            const scaled = imageUrlToFill.scaleToFit(dwidth, dheight);
            page.drawImage(imageUrlToFill, {
              x:
                scaled.height === dheight && scaled.width === dwidth
                  ? xcord + 0.5
                  : scaled.height === dheight
                  ? xcord + (dwidth / 2 - scaled.width / 2) - 0.5
                  : xcord + 0.5,
              y:
                scaled.height === dheight && scaled.width === dwidth
                  ? height - (ycord + dheight)
                  : scaled.width === dwidth
                  ? height -
                    (ycord + dheight - (dheight / 2 - scaled.height / 2) - 0.5)
                  : height - (ycord + dheight),
              height: scaled.height,
              width: scaled.width,
            });
          }

          break;
      }
    });

    if (waitforMap) {
      Promise.all(waitforMap)
        .then(async () => {
          const pdfBytes = await pdfDoc.saveAsBase64();
          console.log("FINAL PDF:", pdfBytes.substring(0, 20));

          const fileDest = RNFetchBlob.fs.dirs.DownloadDir + "/eSignbySquidSoft";
          if (!(await RNFetchBlob.fs.isDir(fileDest))) {
            RNFetchBlob.fs.mkdir(fileDest);
          }
          let filePath = fileDest + "/" + docName;
          if (await RNFetchBlob.fs.exists(filePath)) {
            RNFetchBlob.fs.unlink(filePath);
          }
          RNFetchBlob.fs
            .writeFile(filePath, pdfBytes, "base64")
            .then((res) => {
              console.log("RESPONSE FOR FILE CREATING", res);
              RNFetchBlob.android.addCompleteDownload({
                mime: "application/pdf",
                showNotification: true,
                description: `${docName} downloaded successfully`,
                path: filePath,
                title: docName,
              });
              RNFetchBlob.android.actionViewIntent(filePath, "application/pdf");
              setDownloading(false);
            })
            .catch((er) => {
              console.log("ERRO FOR FILE CREATING", er);
              toast?.show("Failed to download Document", { type: "error" });
              setDownloading(false);
            });
        })
        .catch((err) => {
          console.log("faild to export pdf" + err);
          toast?.show("Failed to download Document", { type: "error" });
          setDownloading(false);
        });
    }
  }

  return;
};
export default ExportDocument;
