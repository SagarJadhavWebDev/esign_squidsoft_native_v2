const renderFieldIcon = (type: string) => {
  switch (type) {
    case "initial":
      return "pencilIcon";
    case "signature":
      return "signatureIcon";
    case "stamp":
      return "stampIcon";
    case "text":
      return "Aa";
    case "date":
      return "dateIcon";
    case "time":
      return "timeIcon";
    default:
      null;
  }
};
export default renderFieldIcon;
