import { TouchableWithoutFeedback } from "react-native";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  Path,
  Polygon,
  Rect,
  SvgProps,
} from "react-native-svg";

interface GetSvgProps extends SvgProps {
  name: string;
  classN?: string;
  color?: string;
  width?: string;
  height?: string;
  callBack?: any;
  props?: any;
  strokeWidth?: number;
  pathStrokeWidth?: number;
}
const GetSvg: React.FC<GetSvgProps> = ({
  name,
  classN,
  color,
  width,
  height,
  callBack,
  strokeWidth,
  pathStrokeWidth,
  props,
}) => {
  switch (name) {
    case "AUDITTRAILICON":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fontSize="1.375rem"
          viewBox="0 0 64 64"
          className={classN ?? "w-5 h-5"}
          color={color ?? "#374151"}
          {...props}
        >
          <Path
            fill="#2e3f55"
            d="M45.9 6.9h-6.7v3.9h5.4v46H21.1c-.3 1.4-1 2.8-1.9 3.9h26.7c1.4 0 2.5-1.1 2.5-2.5V9.4c0-1.4-1.2-2.5-2.5-2.5zm-31.3 0H7.9C6.5 6.9 5.4 8 5.4 9.4v37.4c1.1-.9 2.4-1.6 3.9-1.9V10.8h5.4V6.9zm22-1h-4.8c0-2.7-2.2-4.9-4.9-4.9S22 3.2 22 5.9h-4.8c-.5 0-.9.4-.9.9v3.5c0 1 .8 1.9 1.9 1.9h17.6c1 0 1.9-.8 1.9-1.9V6.8c-.1-.5-.6-.9-1.1-.9zm-9.7 2.2c-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2 1.2 0 2.2 1 2.2 2.2 0 1.2-1 2.2-2.2 2.2z"
            // className="color2e3f55 svgShape"
          />
          <Path
            fill="#2e7abf"
            d="M22.9 52.3c-.3-.7-1.1-1-1.8-.7-.6.3-9.1 3.7-9.1 3.7-.5-.9-1.7-3-1.7-3.1-.6-.8-1.7-.9-2.5-.3-.8.6-.9 1.7-.3 2.5.8 1 2.6 3.6 2.6 3.6.3.4.8.7 1.3.7.6 0 10.1-4.3 10.7-4.5.8-.4 1.1-1.2.8-1.9z"
            // className="color2e7abf svgShape"
          />
          <Path
            fill="#2e7abf"
            d="M17.1 57.4c-1.1 2-3.2 3.4-5.6 3.4-3.5 0-6.3-2.8-6.3-6.3s2.8-6.3 6.3-6.3c2.6 0 4.9 1.6 5.8 3.9.8-.3 1.5-.6 2.1-.9-1.3-3.1-4.3-5.3-7.9-5.3-4.7 0-8.6 3.8-8.6 8.6 0 4.7 3.8 8.6 8.6 8.6 4.1 0 7.6-2.9 8.4-6.9-1.1.4-2 .9-2.8 1.2z"
            // className="color2e7abf svgShape"
          />
          <G fill="#2e7abf" className="color2e7abf svgShape">
            <Circle
              cx={17}
              cy={20}
              r={3.7}
              fill="#000000"
              // className="color000 svgShape"
            />
            <Circle
              cx={17}
              cy={36.7}
              r={3.7}
              fill="#000000"
              // className="color000 svgShape"
            />
            <Path
              d="M25.4 21.1h14c.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1h-14c-.6 0-1.1.5-1.1 1.1 0 .6.5 1.1 1.1 1.1zm14 14.5h-14c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1h14c.6 0 1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1z"
              fill="#000000"
              // className="color000 svgShape"
            />
          </G>
          <Path
            fill="#2e3f55"
            d="M60.8 13.5c-.1-.1-.3-.2-.5-.2-.4 0-.7.3-.7.7v1.6h-.9v-1.5c0-.8-.3-1.6-.9-2.2-.6-.6-1.4-.9-2.2-.9-1.7 0-3 1.5-3 3.1v9c0 .2.2.3.3.3h.1v19.9c0 .9.7 4 1.4 6.5.4 1.4.8 2.6 1.2 2.9h.2c.3-.3.8-1.5 1.2-2.9.7-2.4 1.4-5.6 1.4-6.5V23.6h.1c.2 0 .3-.2.3-.3v-6.5c.5 0 .9.4.9.9v6.7c0 .4.4.8.8.7.4 0 .6-.4.6-.7V14c-.1-.2-.2-.4-.3-.5zm-5.1 38.9c-.1-.2-.3-.7-.8-2.2h1.6c-.5 1.5-.7 2-.8 2.2z"
            // className="color2e3f55 svgShape"
          />
        </Svg>
      );
    case "VOIDICON":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fontSize="1.375rem"
          viewBox="0 0 24 24"
          className={classN ?? "w-5 h-5"}
          color={color ?? "#374151"}
          {...props}
        >
          <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            //fillRule="evenodd"
            d="M7.22 3.22A.75.75 0 017.75 3h9A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17h-9a.75.75 0 01-.53-.22L.97 10.53a.75.75 0 010-1.06l6.25-6.25zm3.06 4a.75.75 0 10-1.06 1.06L10.94 10l-1.72 1.72a.75.75 0 101.06 1.06L12 11.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L12 8.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case "QUICKVIEWCOMPLETED":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fontSize="1.375rem"
          viewBox="0 0 24 24"
          className="w-5 h-5"
          color={"black"}
          {...props}
        >
          <G
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          >
            <Circle cx={12} cy={12} r={9} />
            <Path d="m9 12l2 2l4-4" />
          </G>
        </Svg>
      );
    case "QUICKVIEWWAITING":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fontSize="1.375rem"
          viewBox="0 0 24 24"
          className="w-5 h-5"
          color={"black"}
          {...props}
        >
          <G
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          >
            <Circle cx={12} cy={12} r={9} />
            <Path d="M12 7v5l3 3" />
          </G>
        </Svg>
      );
    case "QUICKVIEWDRAFT":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fontSize="1.375rem"
          viewBox="0 0 24 24"
          className="w-5 h-5"
          color={"black"}
          {...props}
        >
          <Path
            d="M15.24 2H8.76004C5.00004 2 4.71004 5.38 6.74004 7.22L17.26 16.78C19.29 18.62 19 22 15.24 22H8.76004C5.00004 22 4.71004 18.62 6.74004 16.78L17.26 7.22C19.29 5.38 19 2 15.24 2Z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "QUICKVIEWPENCIL":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fontSize="1.375rem"
          viewBox="0 0 24 24"
          className="w-5 h-5"
          color={"black"}
          {...props}
        >
          <Path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4m9.5-13.5l4 4"
          />
        </Svg>
      );
    case "sendIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </Svg>
      );
    case "teamIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </Svg>
      );
    case "pencilSquare":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </Svg>
      );
    case "loadingRing":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Circle
            cx={12}
            cy={12}
            fill="none"
            stroke="#414141"
            strokeWidth={2}
            r={10}
            strokeDasharray="164.93361431346415 56.97787143782138"
          />
        </Svg>
      );
    case "userIcon":
      return (
        <Svg
          //xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </Svg>
      );
    case "SignInSquareIcon":
      return (
        <Svg
          className={"w-[70px] h-[70px] "}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#d10000"
          // xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
          />
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4z"
          />
        </Svg>
      );
    case "eyeOpenIcon":
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (callBack) {
              callBack();
            }
          }}
        >
          <Svg
            // xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className={classN ?? "w-6 h-7"}
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
            />
          </Svg>
        </TouchableWithoutFeedback>
      );
    case "eyeCloseIcon":
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (callBack) {
              callBack();
            }
          }}
        >
          <Svg
            // xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className={classN ?? "w-6 h-7"}
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </Svg>
        </TouchableWithoutFeedback>
      );
    case "registerSquareIcon":
      return (
        <Svg
          className={classN ?? "w-[70px] h-[70px]"}
          fill={"none"}
          stroke="#d10000" //'#D71A1A'
          viewBox="0 0 24 24"
          // xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </Svg>
      );
    case "emailIcon":
      return (
        <Svg
          // xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
          className={classN ?? "w-6 h-7"}
        >
          <Path
            strokeLinecap="round"
            d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
          />
        </Svg>
      );
    case "phoneIcon":
      return (
        <Svg
          // xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
          className={classN ?? "w-6 h-7"}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
          />
        </Svg>
      );
    case "splashScreenBlobIcon":
      return (
        <Svg
          viewBox="0 0 200 200"
          width={width}
          height={height}
          // xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            fill="#D71A1A"
            d="M155 34.2c13.6 11.6 20.2 31.5 24.1 52.1 3.9 20.6 5.3 41.9-3 59-8.2 17-26.2 29.8-45.4 35-19.2 5.3-39.6 2.9-56.3-5.2-16.7-8.1-29.6-21.9-40.3-38.2-10.7-16.2-19.2-34.8-17-52.3 2.1-17.5 15-33.9 30.6-45.1 15.6-11.3 33.9-17.4 53.5-18.8 19.5-1.4 40.2 1.9 53.8 13.5Z"
          />
        </Svg>
      );
    case "loadingIcon":
      return (
        <Svg
          viewBox="0 0 48 48"
          fill="none"
          color={"white"}
          className="animate-spin  h-6 w-6"
          // xmlns="http://www.w3.org/2000/svg"
          //{...props}
        >
          <Rect width={48} height={48} fill="white" fillOpacity={0.01} />
          <Path
            d="M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4"
            stroke="white"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36V36"
            stroke="white"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "homeIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-7 h-7"}

          //xmlns="http://www.w3.org/2000/svg"
          //{...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </Svg>
      );
    case "inboxIcon":
      return (
        <Svg
          fill={color ?? "black"}
          viewBox="0 0 24 24"
          //strokeWidth={1.5}
          //stroke={color ?? "black"}

          className={classN ?? "w-8 h-8"}
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 18H5C4.449 18 4 17.552 4 17V7.25L11.4 12.8C11.578 12.934 11.789 13 12 13C12.211 13 12.422 12.934 12.6 12.8L20 7.25V17C20 17.552 19.551 18 19 18ZM18.333 6L12 10.75L5.667 6H18.333ZM19 4H5C3.346 4 2 5.346 2 7V17C2 18.654 3.346 20 5 20H19C20.654 20 22 18.654 22 17V7C22 5.346 20.654 4 19 4Z"
          />
        </Svg>
      );
    case "templatestIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-7 h-7"}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </Svg>
      );
    case "userIcon2":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </Svg>
      );
    case "settingIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-8 h-8"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </Svg>
      );
    case "subscriptionIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-8 h-8"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={pathStrokeWidth ?? 2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </Svg>
      );
    case "bellIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-8 h-8"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={pathStrokeWidth ?? 2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </Svg>
      );
    case "documentIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-8 h-8"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={pathStrokeWidth ?? 2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </Svg>
      );
    case "filterIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-8 h-8"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </Svg>
      );
    case "searchIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-8 h-8"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </Svg>
      );
    case "downloadIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-8 h-8"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </Svg>
      );
    case "logoutIcon":
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (callBack) {
              callBack();
            }
          }}
        >
          <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.6}
            stroke={color ?? "black"}
            className={classN ?? "w-8 h-8"}
            {...props}
          >
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.07692 5.92648C5.07692 4.38908 6.33971 3.14278 7.89744 3.14278H12C12.4248 3.14278 12.7692 3.48268 12.7692 3.90197C12.7692 4.32126 12.4248 4.66116 12 4.66116H7.89744C7.18938 4.66116 6.61539 5.22766 6.61539 5.92648V6.93873C6.61539 7.35802 6.27099 7.69792 5.84615 7.69792C5.42132 7.69792 5.07692 7.35802 5.07692 6.93873V5.92648ZM5.84615 16.3021C6.27099 16.3021 6.61539 16.642 6.61539 17.0613V18.0735C6.61539 18.7723 7.18938 19.3388 7.89744 19.3388H12C12.4248 19.3388 12.7692 19.6788 12.7692 20.098C12.7692 20.5173 12.4248 20.8572 12 20.8572H7.89744C6.33971 20.8572 5.07692 19.6109 5.07692 18.0735V17.0613C5.07692 16.642 5.42132 16.3021 5.84615 16.3021Z"
              fill={color ?? "#030D45"}
            />
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.7692 4.78618C12.7692 3.90491 13.6592 3.29355 14.4966 3.59962L19.6248 5.47416C20.1277 5.658 20.4615 6.13139 20.4615 6.66071V17.3393C20.4615 17.8686 20.1277 18.342 19.6248 18.5258L14.4966 20.4004C13.6592 20.7065 12.7692 20.0951 12.7692 19.2138V4.78618ZM15.0309 2.17576C13.1887 1.5024 11.2308 2.84738 11.2308 4.78618V19.2138C11.2308 21.1526 13.1887 22.4976 15.0309 21.8242L20.1591 19.9497C21.2656 19.5452 22 18.5038 22 17.3393V6.66071C22 5.4962 21.2656 4.45475 20.1591 4.0503L15.0309 2.17576Z"
              fill={color ?? "#030D45"}
            />
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.36444 9.43867C5.06404 9.14218 4.57699 9.14218 4.27658 9.43867L2.2253 11.4632C1.9249 11.7597 1.9249 12.2403 2.2253 12.5368L4.27658 14.5613C4.57699 14.8578 5.06404 14.8578 5.36444 14.5613C5.66484 14.2649 5.66484 13.7842 5.36444 13.4877L4.62632 12.7592H8.92308C9.34791 12.7592 9.69231 12.4193 9.69231 12C9.69231 11.5807 9.34791 11.2408 8.92308 11.2408H4.62632L5.36444 10.5123C5.66484 10.2158 5.66484 9.73515 5.36444 9.43867Z"
              fill={color ?? "#030D45"}
            />
          </Svg>
        </TouchableWithoutFeedback>
      );
    case "rightArrowIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.6}
          stroke={color ?? "black"}
          className={classN ?? "w-8 h-8"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={pathStrokeWidth ?? 2.5}
            d="M9 5l7 7-7 7"
          />
        </Svg>
      );
    case "leftArrowIcon":
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (callBack) {
              callBack();
            }
          }}
        >
          <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke={color ?? "black"}
            className={classN ?? "w-8 h-8"}
            {...props}
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </Svg>
        </TouchableWithoutFeedback>
      );
    case "lockIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </Svg>
      );
    case "organazationIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </Svg>
      );
    case "closeIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.3}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </Svg>
      );
    case "addCircleIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </Svg>
      );
    case "addIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </Svg>
      );
    case "closeWithoutCircleIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
          onPress={callBack}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={pathStrokeWidth ?? 1.7}
            d="M6 18L18 6M6 6l12 12"
          />
        </Svg>
      );
    case "warningIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          // strokeWidth={strokeWidth ?? 1.5}
          // stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
          onPress={callBack}
        >
          <Path
            fill={color ?? "#0092E4"}
            strokeWidth={pathStrokeWidth ?? 1}
            stroke={color ?? "#0092E4"}
            d="M12,14a1,1,0,0,0,1-1V7a1,1,0,0,0-2,0v6A1,1,0,0,0,12,14Zm0,4a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,12,18Z"
          />
        </Svg>
      );
    case "deleteIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
          onPress={callBack}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </Svg>
      );
    case "scrollUpDownIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
          onPress={callBack}
        >
          <Path
            d="M9.17154 16.8182L7.75732 18.2324L12 22.475L16.2426 18.2324L14.8284 16.8182L12 19.6466L9.17154 16.8182Z"
            fill={color ?? "black"}
          />
          <Path
            d="M14.8284 7.182L16.2426 5.76779L12 1.52515L7.75733 5.76779L9.17155 7.182L12 4.35357L14.8284 7.182Z"
            fill={color ?? "black"}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 9.00018C13.6569 9.00018 15 10.3433 15 12.0002C15 13.657 13.6569 15.0002 12 15.0002C10.3431 15.0002 9 13.657 9 12.0002C9 10.3433 10.3431 9.00018 12 9.00018ZM12 11.0002C12.5523 11.0002 13 11.4479 13 12.0002C13 12.5525 12.5523 13.0002 12 13.0002C11.4477 13.0002 11 12.5525 11 12.0002C11 11.4479 11.4477 11.0002 12 11.0002Z"
            fill={color ?? "black"}
          />
        </Svg>
      );
    case "arrowDownIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
          onPress={callBack}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </Svg>
      );
    case "timeIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
          onPress={callBack}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={pathStrokeWidth ?? 2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </Svg>
      );
    case "pencilIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
          onPress={callBack}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </Svg>
      );
    case "dateIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
          onPress={callBack}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </Svg>
      );
    case "stampIcon":
      return (
        <Svg
          fill={color ?? "black"}
          viewBox="0 0 59.998 59.998"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
          onPress={callBack}
        >
          <G id="SVGRepo_bgCarrier" strokeWidth={0} />
          <G id="SVGRepo_iconCarrier">
            <Path d="M54.613,38.998H38.999v-6h-4v-6.242c0-2.138,0.922-4.146,2.466-5.374c2.882-2.289,4.534-5.71,4.534-9.384 c0-3.416-1.463-6.68-4.013-8.955c-2.548-2.274-5.975-3.357-9.394-2.964c-5.353,0.609-9.761,4.922-10.481,10.254 c-0.57,4.224,1.057,8.333,4.353,10.993c1.587,1.281,2.535,3.38,2.535,5.613v6.059h-4v6H5.385c-1.315,0-2.386,1.07-2.386,2.386 v11.229c0,1.315,1.07,2.386,2.386,2.386h0.705c0.478,2.833,2.942,5,5.91,5h36c2.967,0,5.431-2.167,5.91-5h0.705 c1.315,0,2.386-1.07,2.386-2.386V41.384C56.999,40.069,55.929,38.998,54.613,38.998z M23.72,19.77 c-2.747-2.217-4.103-5.645-3.626-9.169c0.6-4.438,4.27-8.026,8.726-8.535c2.899-0.326,5.681,0.547,7.835,2.47 c2.126,1.896,3.345,4.616,3.345,7.463c0,3.061-1.377,5.91-3.778,7.818c-2.048,1.628-3.222,4.157-3.222,6.939v6.242h-6V26.94 C26.999,24.066,25.804,21.452,23.72,19.77z M22.999,34.998h2h10h2v4h-14V34.998z M47.999,57.998h-36c-1.86,0-3.429-1.276-3.873-3 h43.746C51.428,56.722,49.86,57.998,47.999,57.998z M54.999,52.613c0,0.213-0.173,0.386-0.386,0.386h-0.614h-48H5.385 c-0.213,0-0.386-0.173-0.386-0.386V41.384c0-0.213,0.173-0.386,0.386-0.386h15.614h18h15.614c0.213,0,0.386,0.173,0.386,0.386 V52.613z" />
          </G>
        </Svg>
      );
    case "signatureIcon":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 500 512.22"
          className={classN ?? "w-6 h-7"}
          fill={color ?? "black"}
          strokeWidth={strokeWidth ?? 2}
          stroke={color ?? "black"}
          {...props}
          onPress={callBack}
        >
          <Path d="m414.86 206.15 48.95 47.13-74.58 78.33-59.92 16.07c-2.15.42-3-.44-2.65-2.46l13.58-60.74 74.62-78.33zM295.7 347.57c7.32-.2 13.44 5.59 13.64 12.91.2 7.32-5.59 13.43-12.91 13.63-13.43.37-22.78 7.36-26.7 15.62-1.59 3.35-2.26 6.89-1.9 10.12.31 2.74 1.45 5.31 3.5 7.34 5.93 5.9 18.8 8.48 40.55 3.21 3.44-.84 10.38-3.16 19.08-6.07 41.29-13.81 117.15-39.18 128.97-3.93 2.31 6.94-1.43 14.48-8.38 16.8-6.94 2.32-14.48-1.43-16.79-8.37-3.38-10.09-62.95 9.83-95.38 20.67-9.29 3.11-16.71 5.6-21.26 6.7-32.22 7.81-53.66 1.63-65.52-10.18-6.58-6.55-10.24-14.68-11.2-23.26-.92-8.09.59-16.57 4.29-24.36 7.77-16.38 25.36-30.15 50.01-30.83zM103.57 225.85c-7.07 0-12.8-5.73-12.8-12.8 0-7.06 5.73-12.79 12.8-12.79h161.17c7.07 0 12.8 5.73 12.8 12.79 0 7.07-5.73 12.8-12.8 12.8H103.57zm0 82.69c-7.07 0-12.8-5.72-12.8-12.79 0-7.07 5.73-12.8 12.8-12.8h147.39c7.07 0 12.79 5.73 12.79 12.8s-5.72 12.79-12.79 12.79H103.57zm0 82.7c-7.07 0-12.8-5.73-12.8-12.8 0-7.06 5.73-12.79 12.8-12.79h87.51c7.06 0 12.79 5.73 12.79 12.79 0 7.07-5.73 12.8-12.79 12.8h-87.51zM246.01 36.73v43.24c1 13.08 5.56 23.36 13.56 30.2 8.31 7.09 20.71 11.07 37.13 11.36l37.27-.04-87.96-84.76zm96.71 110.34-46.22-.05c-22.76-.36-40.67-6.48-53.52-17.45-13.38-11.44-20.92-27.68-22.45-47.78l-.11-1.76V25.59H63.61c-20.94 0-38.02 17.08-38.02 38.02V448.6c0 20.85 17.16 38.02 38.02 38.02h241.11c15.7 0 30.03-9.98 35.58-24.65 2.47-6.59 9.85-9.92 16.44-7.45 6.59 2.48 9.92 9.85 7.44 16.44-9.32 24.59-33.11 41.26-59.46 41.26H63.61C28.69 512.22 0 483.51 0 448.6V63.61C0 28.67 28.67 0 63.61 0h175.94c3.79 0 7.21 1.65 9.54 4.28l115.27 111.06c2.6 2.5 3.91 5.85 3.91 9.2l.04 74c0 7.07-5.73 12.8-12.79 12.8-7.07 0-12.8-5.73-12.8-12.8v-51.47zm120.87 24.5c-2.27-2.18-4.92-3.2-7.96-3.16-3.03.05-5.62 1.24-7.77 3.48l-17.46 18.18 49 47.3 17.64-18.36c2.11-2.13 2.99-4.9 2.96-7.95-.05-3-1.13-5.72-3.26-7.78l-33.15-31.71zm-89.91 157.2-36.75 9.85c-1.33.26-1.85-.26-1.62-1.5l8.32-37.26 30.05 28.91z" />
        </Svg>
      );
    case "aaIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <G id="SVGRepo_bgCarrier" strokeWidth={0} />
          <G id="SVGRepo_iconCarrier">
            <Path d="M208,94.90039a42.22159,42.22159,0,0,0-29.63867,11.80469,7.9999,7.9999,0,1,0,11.26758,11.35937A26.12387,26.12387,0,0,1,208,110.90039c13.2334,0,24,8.97168,24,20v7.21973a42.75745,42.75745,0,0,0-24-7.21973c-22.05566,0-40,16.14941-40,36s17.94434,36,40,36a42.65985,42.65985,0,0,0,24.67236-7.6958A7.9985,7.9985,0,0,0,248,192V130.90039C248,111.0498,230.05566,94.90039,208,94.90039Zm0,92c-13.2334,0-24-8.97168-24-20s10.7666-20,24-20,24,8.97168,24,20S221.2334,186.90039,208,186.90039Zm-70.13428-38.69678-.01416-.02685L87.07031,52.25684a8.00006,8.00006,0,0,0-14.14062,0L22.14844,148.17676l-.01416.02685L.92969,188.25684a8,8,0,0,0,14.14062,7.48632L33.99316,160h92.01368l18.92285,35.74316a8,8,0,0,0,14.14062-7.48632ZM42.46387,144,80,73.09766,117.53613,144Z" />
          </G>
        </Svg>
      );
    case "tickIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={pathStrokeWidth ?? 2}
            d="M5 13l4 4L19 7"
          />
        </Svg>
      );
    case "tickIconRounded":
      return (
        <Svg
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </Svg>
      );
    case "resizeIcon":
      //fd8469
      return (
        <Svg
          fill={color ?? "white"}
          viewBox="0 0 182.931 182.931"
          className={classN ?? "w-6 h-7"}
          {...props}
          // fill="#000000"
          // height="800px"
          // width="800px"
          // id="Capa_1"
          // xmlns="http://www.w3.org/2000/svg"
          // xmlnsXlink="http://www.w3.org/1999/xlink"
          // viewBox="0 0 182.931 182.931"
          // xmlSpace="preserve"
          // {...props}
        >
          <Path d="M173.93,92.798c-4.971,0-9,4.029-9,9v50.404L30.728,18h50.404c4.971,0,9-4.029,9-9s-4.029-9-9-9H9C4.03,0,0,4.029,0,9 v72.132c0,4.971,4.029,9,9,9s9-4.029,9-9V30.729l134.202,134.202h-50.404c-4.971,0-9,4.029-9,9s4.029,9,9,9h72.132 c4.971,0,9-4.029,9-9v-72.132C182.93,96.828,178.901,92.798,173.93,92.798z" />
        </Svg>
      );
    case "noDataFoundIcon":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          fill={color ?? "white"}
          className={classN ?? "w-6 h-7"}
          {...props}
          viewBox="0 0 797.5 834.5"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          {...props}
        >
          <Ellipse cx={308.5} cy={780} rx={308.5} ry={54.5} fill="#3f3d56" />
          <Circle cx={496} cy={301.5} r={301.5} fill="#3f3d56" />
          <Circle cx={496} cy={301.5} r={248.89787} opacity={0.05} />
          <Circle cx={496} cy={301.5} r={203.99362} opacity={0.05} />
          <Circle cx={496} cy={301.5} r={146.25957} opacity={0.05} />
          <Path
            d="M398.42029,361.23224s-23.70394,66.72221-13.16886,90.42615,27.21564,46.52995,27.21564,46.52995S406.3216,365.62186,398.42029,361.23224Z"
            transform="translate(-201.25 -32.75)"
            fill="#d0cde1"
          />
          <Path
            d="M398.42029,361.23224s-23.70394,66.72221-13.16886,90.42615,27.21564,46.52995,27.21564,46.52995S406.3216,365.62186,398.42029,361.23224Z"
            transform="translate(-201.25 -32.75)"
            opacity={0.1}
          />
          <Path
            d="M415.10084,515.74682s-1.75585,16.68055-2.63377,17.55847.87792,2.63377,0,5.26754-1.75585,6.14547,0,7.02339-9.65716,78.13521-9.65716,78.13521-28.09356,36.8728-16.68055,94.81576l3.51169,58.82089s27.21564,1.75585,27.21564-7.90132c0,0-1.75585-11.413-1.75585-16.68055s4.38962-5.26754,1.75585-7.90131-2.63377-4.38962-2.63377-4.38962,4.38961-3.51169,3.51169-4.38962,7.90131-63.2105,7.90131-63.2105,9.65716-9.65716,9.65716-14.92471v-5.26754s4.38962-11.413,4.38962-12.29093,23.70394-54.43127,23.70394-54.43127l9.65716,38.62864,10.53509,55.3092s5.26754,50.04165,15.80262,69.356c0,0,18.4364,63.21051,18.4364,61.45466s30.72733-6.14547,29.84941-14.04678-18.4364-118.5197-18.4364-118.5197L533.62054,513.991Z"
            transform="translate(-201.25 -32.75)"
            fill="#2f2e41"
          />
          <Path
            d="M391.3969,772.97846s-23.70394,46.53-7.90131,48.2858,21.94809,1.75585,28.97148-5.26754c3.83968-3.83968,11.61528-8.99134,17.87566-12.87285a23.117,23.117,0,0,0,10.96893-21.98175c-.463-4.29531-2.06792-7.83444-6.01858-8.16366-10.53508-.87792-22.826-10.53508-22.826-10.53508Z"
            transform="translate(-201.25 -32.75)"
            fill="#2f2e41"
          />
          <Path
            d="M522.20753,807.21748s-23.70394,46.53-7.90131,48.28581,21.94809,1.75584,28.97148-5.26754c3.83968-3.83969,11.61528-8.99134,17.87566-12.87285a23.117,23.117,0,0,0,10.96893-21.98175c-.463-4.29531-2.06792-7.83444-6.01857-8.16367-10.53509-.87792-22.826-10.53508-22.826-10.53508Z"
            transform="translate(-201.25 -32.75)"
            fill="#2f2e41"
          />
          <Circle cx={295.90488} cy={215.43252} r={36.90462} fill="#ffb8b8" />
          <Path
            d="M473.43048,260.30832S447.07,308.81154,444.9612,308.81154,492.41,324.62781,492.41,324.62781s13.70743-46.39439,15.81626-50.61206Z"
            transform="translate(-201.25 -32.75)"
            fill="#ffb8b8"
          />
          <Path
            d="M513.86726,313.3854s-52.67543-28.97148-57.943-28.09356-61.45466,50.04166-60.57673,70.2339,7.90131,53.55335,7.90131,53.55335,2.63377,93.05991,7.90131,93.93783-.87792,16.68055.87793,16.68055,122.90931,0,123.78724-2.63377S513.86726,313.3854,513.86726,313.3854Z"
            transform="translate(-201.25 -32.75)"
            fill="#d0cde1"
          />
          <Path
            d="M543.2777,521.89228s16.68055,50.91958,2.63377,49.16373-20.19224-43.89619-20.19224-43.89619Z"
            transform="translate(-201.25 -32.75)"
            fill="#ffb8b8"
          />
          <Path
            d="M498.50359,310.31267s-32.48318,7.02339-27.21563,50.91957,14.9247,87.79237,14.9247,87.79237l32.48318,71.11182,3.51169,13.16886,23.70394-6.14547L528.353,425.32067s-6.14547-108.86253-14.04678-112.37423A33.99966,33.99966,0,0,0,498.50359,310.31267Z"
            transform="translate(-201.25 -32.75)"
            fill="#d0cde1"
          />
          <Polygon
            points="277.5 414.958 317.885 486.947 283.86 411.09 277.5 414.958"
            opacity={0.1}
          />
          <Path
            d="M533.896,237.31585l.122-2.82012,5.6101,1.39632a6.26971,6.26971,0,0,0-2.5138-4.61513l5.97581-.33413a64.47667,64.47667,0,0,0-43.1245-26.65136c-12.92583-1.87346-27.31837.83756-36.182,10.43045-4.29926,4.653-7.00067,10.57018-8.92232,16.60685-3.53926,11.11821-4.26038,24.3719,3.11964,33.40938,7.5006,9.18513,20.602,10.98439,32.40592,12.12114,4.15328.4,8.50581.77216,12.35457-.83928a29.721,29.721,0,0,0-1.6539-13.03688,8.68665,8.68665,0,0,1-.87879-4.15246c.5247-3.51164,5.20884-4.39635,8.72762-3.9219s7.74984,1.20031,10.062-1.49432c1.59261-1.85609,1.49867-4.559,1.70967-6.99575C521.28248,239.785,533.83587,238.70653,533.896,237.31585Z"
            transform="translate(-201.25 -32.75)"
            fill="#2f2e41"
          />
          <Circle cx={559} cy={744.5} r={43} fill="#d10000" />
          <Circle cx={54} cy={729.5} r={43} fill="#d10000" />
          <Circle cx={54} cy={672.5} r={31} fill="#d10000" />
          <Circle cx={54} cy={624.5} r={22} fill="#d10000" />
        </Svg>
      );
    case "dropDownIcon":
      return (
        <Svg
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 473.654 473.654"
          enableBackground="new 0 0 473.654 473.654"
          width="30px"
          height="30px"
          {...props}
        >
          <Circle fill="#d10000" cx={236.827} cy={236.827} r={236.827} />
          <Path
            fill="#FFFFFF"
            d="M331.416,180.767c-29.236,29.236-58.476,58.476-87.712,87.715  c-29.307-29.307-58.618-58.618-87.925-87.929c-25.56-25.564-65.08,14.259-39.456,39.883c35.885,35.885,71.766,71.77,107.651,107.655  c10.841,10.845,28.907,10.549,39.666-0.213c35.885-35.885,71.766-71.77,107.651-107.655  C396.859,194.66,357.036,155.14,331.416,180.767z"
          />
          <G />
          <G />
          <G />
          <G />
          <G />
          <G />
          <G />
          <G />
          <G />
          <G />
          <G />
          <G />
          <G />
          <G />
          <G />
        </Svg>
      );
    case "noStampFoundIcon":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          className={classN ?? "w-10 h-10"}
          viewBox="0 0 658.71676 482.74126"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          {...props}
        >
          <Path
            d="M555.73364,405.49075a30.28061,30.28061,0,0,0-24.18012,12.02346,19.9375,19.9375,0,0,0-27.8185,18.30907h82.33115A30.33247,30.33247,0,0,0,555.73364,405.49075Z"
            transform="translate(-270.64162 -208.62937)"
            fill="#e6e6e6"
          />
          <Path
            d="M669.46656,384.5H309.13411a18.20279,18.20279,0,0,0-18.177,18.177V673.19362a18.20278,18.20278,0,0,0,18.177,18.177H669.46656a18.20278,18.20278,0,0,0,18.177-18.177V402.677A18.20279,18.20279,0,0,0,669.46656,384.5ZM685.5051,673.19362a16.05809,16.05809,0,0,1-16.03854,16.03854H309.13411a16.05809,16.05809,0,0,1-16.03854-16.03854V402.677a16.05809,16.05809,0,0,1,16.03854-16.03854H669.46656A16.05809,16.05809,0,0,1,685.5051,402.677Z"
            transform="translate(-270.64162 -208.62937)"
            fill="#3f3d56"
          />
          <Circle cx={80.7273} cy={289.7442} r={80.7273} fill="#d10000" />
          <Path
            d="M687.64357,613.39127v22.3791H290.9571V613.28431l2.13847-3.07934L418.85921,429.10845a6.196,6.196,0,0,1,10.17914,0l84.34119,121.43311,60.03749-85.6885a6.19679,6.19679,0,0,1,10.15774,0L685.5051,610.33327Z"
            transform="translate(-270.64162 -208.62937)"
            fill="#3f3d56"
          />
          <Path
            d="M378.09981,661.432H315.0149a1.06924,1.06924,0,0,1,0-2.13847h63.08491a1.06923,1.06923,0,1,1,0,2.13847Z"
            transform="translate(-270.64162 -208.62937)"
            fill="#3f3d56"
          />
          <Path
            d="M473.2618,661.432H410.17689a1.06924,1.06924,0,1,1,0-2.13847H473.2618a1.06923,1.06923,0,0,1,0,2.13847Z"
            transform="translate(-270.64162 -208.62937)"
            fill="#3f3d56"
          />
          <Path
            d="M568.42378,661.432H505.33887a1.06924,1.06924,0,0,1,0-2.13847h63.08491a1.06923,1.06923,0,1,1,0,2.13847Z"
            transform="translate(-270.64162 -208.62937)"
            fill="#3f3d56"
          />
          <Path
            d="M663.58577,661.432H600.50085a1.06924,1.06924,0,0,1,0-2.13847h63.08492a1.06923,1.06923,0,0,1,0,2.13847Z"
            transform="translate(-270.64162 -208.62937)"
            fill="#3f3d56"
          />
          <Ellipse
            cx={771.11348}
            cy={360.02396}
            rx={186.04702}
            ry={115.47746}
            transform="translate(-312.84579 401.8894) rotate(-42.14571)"
            fill="#e6e6e6"
          />
          <Path
            d="M626.94259,634.38948c-10.27371-21.223-13.91186-45.13592-12.12314-68.54886a164.7354,164.7354,0,0,1,20.13559-66.263c10.82079-19.78486,25.12269-37.49483,41.37971-53.0678,17.25414-16.52812,36.71035-30.5595,57.181-42.82246,21.61642-12.94932,44.33029-23.95387,67.30849-34.25008q4.29545-1.92474,8.60417-3.81958c1.88513-.83.25458-3.5947-1.619-2.76976-23.42777,10.31537-46.65818,21.18613-68.87261,33.94136-21.22249,12.18567-41.5263,26.12564-59.66615,42.59873-16.92179,15.367-32.00276,32.94605-43.69622,52.62852a172.042,172.042,0,0,0-23.16477,65.99464c-2.99577,23.51793-.67967,47.9745,8.23618,70.04087q1.63083,4.03625,3.52694,7.95644c.89923,1.85758,3.66623.2329,2.76977-1.619Z"
            transform="translate(-270.64162 -208.62937)"
            fill="#ccc"
          />
          <Path
            d="M715.42365,411.86714a193.82021,193.82021,0,0,1,3.9125-52.178,197.01375,197.01375,0,0,1,17.5945-49.30733,193.75607,193.75607,0,0,1,15.50017-25.09342c1.21678-1.67076-1.56508-3.27313-2.76977-1.619a196.924,196.924,0,0,0-25.06267,46.63489,200.26218,200.26218,0,0,0-11.88947,51.61944,193.67815,193.67815,0,0,0-.493,29.94343c.12494,2.051,3.33351,2.0652,3.20771,0Z"
            transform="translate(-270.64162 -208.62937)"
            fill="#ccc"
          />
          <Path
            d="M490.90419,456.13876a37.35921,37.35921,0,0,0-29.83262,14.83414A24.59823,24.59823,0,0,0,426.75,493.562h101.5774A37.42318,37.42318,0,0,0,490.90419,456.13876Z"
            transform="translate(-270.64162 -208.62937)"
            fill="#ccc"
          />
        </Svg>
      );
    case "verifiedIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={pathStrokeWidth ?? 2}
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </Svg>
      );
    case "unVerifiedIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={pathStrokeWidth ?? 2}
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </Svg>
      );
    case "infoIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </Svg>
      );
    case "feedbackIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </Svg>
      );
    case "privacyIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
          />
        </Svg>
      );
    case "downloadIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </Svg>
      );
    case "circleDownloadIcon":
    case "locationIcon":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </Svg>
      );
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={strokeWidth ?? 1.5}
          stroke={color ?? "black"}
          className={classN ?? "w-6 h-7"}
          {...props}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </Svg>
      );
    default:
      return null;
  }
};
export default GetSvg;
