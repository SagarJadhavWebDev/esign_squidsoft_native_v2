const getFileTypeFromMime = (mime: string) => {
    switch (mime) {
      case "application/pdf":
        return { name: "PDF-Document", extension: "pdf" };
      case "application/vnd.ms-excel":
        return { name: "Microsoft Excel", extension: "xls" };
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return { name: "Microsoft Excel (OpenXML)", extension: "xlsx" };
      case "application/msword":
        return { name: "Microsoft Word", extension: "doc" };
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return { name: "Microsoft Word (OpenXML)", extension: "docx" };
      case "application/vnd.ms-powerpoint":
        return { name: "Microsoft PowerPoint", extension: "ppt" };
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return { name: "Microsoft PowerPoint (OpenXML)", extension: "pptx" };
      case "text/plain":
        return { name: "Text Document", extension: "txt" };
      case "image/jpeg":
        return { name: "JPEG Image", extension: "jpeg/jpg" };
      case "image/png":
        return { name: "PNG Image", extension: "png" };
      default:
        return { name: "Not Found", extension: "na" };
    }
  };
  export default getFileTypeFromMime;
  