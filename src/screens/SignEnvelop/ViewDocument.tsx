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
import { EnvelopeType } from "../../types/EnvelopeType";
import { PdfView } from "react-native-pdf-light";
import { times } from "lodash";
import PDFViewSinglePage from "./Component/PDFViewSinglePage";
import PDFViewSingleSignPage from "./Component/PDFViewSingleSignPage";
import ExportDocument from "../../utils/ExportDocuments";
import useAuth from "../../utils/auth";
import IndeterminateProgressBar from "../../components/atoms/IndeterminateProgressBar";
import GetSvg from "../../utils/GetSvg";
import { ViewEnvelopeTypes } from "../../types/ViewEnvelopeTypes";

interface ViewDocumentProps {
  document: any;
  envelope: any;
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
      .fetch("GET", `${ApiConfig.API_URL + document?.path}`)
      .then((value) => {
        setSource(value.path());
        // console.log("RESPONSE FROM RN FECTH BLOB:", ApiConfig.API_URL + "/" + document?.path);
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
        const data = envelope?.document_fields?.filter((f: any) => {
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
              const fieldsByType = envelope?.document_fields;
              const fields = envelope?.document_fields?.filter(
                (f: any) =>
                  f?.page_number === pageNumber + 1 &&
                  document?.id === f?.envelope_document_id
              );
              //console.log("SAGARARARRARA", pageNumber)
              return type === "VIEW" ? (
                <PDFViewSinglePage
                  handlePageLoad={handlePageLoadComplete}
                  pageNumber={pageNumber}
                  source={source}
                  key={pageNumber}
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
      {envelope?.download ? (
        <TouchableOpacity
          onPress={() => {
            const downloadToken = envelope?.download?.split("api/").pop();
            const { config, fs } = RNFetchBlob;
            const { DownloadDir } = fs.dirs; // You can check the available directories in the wiki.
            const options = {
              fileCache: true,
              addAndroidDownloads: {
                useDownloadManager: true, // true will use native manager and be shown on notification bar.
                notification: true,
                path: `${DownloadDir}/${"eSignDocuments_" + envelope?.id}.zip`,
                description: "Downloading.",
              },
            };
            config(options)
              .fetch("GET", ApiConfig.API_URL + downloadToken, {
                Authorization: `Bearer ${token}`,
              })
              .then((res) => {
                toast.show(`Please wait downloading ${document?.name}`, {
                  type: "success",
                  duration: 3000,
                });
                // console.log("do some magic in here");
              });
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
