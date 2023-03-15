import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PdfUtil } from "react-native-pdf-light";
import { useToast } from "react-native-toast-notifications";
import RNFetchBlob from "rn-fetch-blob";
import ApiConfig from "../../constants/ApiConfig";
import { EnvelopeDocument, EnvelopeType } from "../../types/EnvelopeType";
import { PdfView } from "react-native-pdf-light";
import { times } from "lodash";
import PDFViewSinglePage from "./Component/PDFViewSinglePage";
import PDFViewSingleSignPage from "./Component/PDFViewSingleSignPage";
import ExportDocument from "../../utils/ExportDocuments";
import useAuth from "../../utils/auth";
import IndeterminateProgressBar from "../../components/atoms/IndeterminateProgressBar";
import GetSvg from "../../utils/GetSvg";

interface ViewDocumentProps {
  document: EnvelopeDocument;
  envelope: EnvelopeType;
  type: "SIGN" | "VIEW";
  setEnvelope?: any;
  setDownloading?: any;
}
const ViewDocument: React.FC<ViewDocumentProps> = ({
  document,
  envelope,
  type = "VIEW",
  setEnvelope,
  setDownloading,
}) => {
  const toast = useToast();
  const [source, setSource] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(0);
  const { token } = useAuth();
  // const fields = envelope?.fields;
  const handleDocumentFetch = async () => {
    const response = await RNFetchBlob.config({
      // path: s,
      fileCache: true,
    })
      .fetch(
        "GET",
        `${ApiConfig.FILES_URL + document?.path + "/" + document?.name}`
      )
      .then((value) => {
        setSource(value.path());
        // console.log("RESPONSE FROM RN FECTH BLOB:", value);
      })
      .catch((error) => {
        toast.show(
          "Failed to open document please try with different document",
          { type: "error" }
        );
      });
  };

  useEffect(() => {
    if (source) {
      PdfUtil.getPageCount(source)
        .then((res) => {
          setTotalPages(res);
        })
        .catch((err) => console.log(err));
    }
  }, [source]);

  useEffect(() => {
    handleDocumentFetch();
  }, [document]);

  const handlePageLoadComplete = (event: any) => {};
  const handleExport = (url: string) => {
    setDownloading(true);
    toast.show(`Please wait downloading ${document?.name}`, {
      type: "success",
      duration: 3000,
    });
    RNFetchBlob.fs
      .readFile(url, "base64")
      .then((res) => {
        const data = envelope?.fields.filter((f: any) => {
          return f?.response_payload?.documentid === document?.id;
        });
        ExportDocument(data, res, document?.name, setDownloading, toast);
      })
      .catch((err) => {
        setDownloading(false);
      });
  };

  return (
    <>
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {source && totalPages > 0
          ? times(totalPages)?.map((pageNumber: any) => {
              const fieldsByType =
                type === "SIGN" ? envelope?.authFields : envelope?.fields;
              const fields = fieldsByType?.filter(
                (f: any) =>
                  f?.response_payload?.documentid === document?.id &&
                  f?.response_payload?.pageno === pageNumber + 1
              );
              return type === "VIEW" ? (
                <PDFViewSinglePage
                  handlePageLoad={handlePageLoadComplete}
                  pageNumber={pageNumber}
                  source={source}
                  key={pageNumber + 1}
                  fields={fields}
                />
              ) : (
                <PDFViewSingleSignPage
                  handlePageLoad={handlePageLoadComplete}
                  pageNumber={pageNumber}
                  source={source}
                  key={pageNumber + 1}
                  fields={fields}
                  setEnvelope={setEnvelope}
                  allFields={fieldsByType}
                />
              );
            })
          : null}
      </ScrollView>
      {type === "VIEW" && document?.name ? (
        <TouchableOpacity
          onPress={() => {
            handleExport(source);
          }}
          className="rounded-xl justify-between items-center absolute bg-[#d10000] right-8 bottom-24  flex flex-row w-40 h-8 px-5 "
        >
          <Text className="text-white w-24 " numberOfLines={1}>
            {document?.name}
          </Text>
          <GetSvg name="downloadIcon" classN="w-5 h-5 mx-2" color="white" />
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default ViewDocument;
