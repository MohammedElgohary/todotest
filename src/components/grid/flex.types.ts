import { CSSProperties } from "react";

/***
 * Flex aligns
 */
export type FlexAlignsValues =
  | "baseline"
  | "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "inherit"
  | "initial"
  | "normal"
  | "revert"
  | "stretch"
  | "start"
  | "self-end"
  | "self-start"
  | "space-around"
  | "space-evenly"
  | "space-between"
  | "unset";

/***
 * Flex wrap values
 */
export type FlexWrapValues = "nowrap" | "wrap" | "wrap-reverse";

/***
 * Flex direction values
 */
export type FlexDirectionValues =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse";

/***
 * Flex Props
 * Main interface
 */

export interface FlexProps {
  /***
   * Sizing
   */
  maxWidth?: "25%" | "50%" | "75%" | "100%" | (string & {});
  minWidth?: string;
  fullWidth?: boolean;
  flexGrow?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "5"
    | "6"
    | "initial"
    | "inherit"
    | (string & {});
  flexShrink?:
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "5"
    | "6"
    | "initial"
    | "inherit"
    | (string & {});

  /***
   * Spacing
   */
  gap?: "8px" | "15px" | "25px" | (string & {});

  /***
   * Alignment and justify
   */
  alignItems?: FlexAlignsValues;
  alignContent?: FlexAlignsValues;
  alignSelf?: FlexAlignsValues;
  justifyContent?: FlexAlignsValues;
  justifyItems?: FlexAlignsValues;
  justifySelf?: FlexAlignsValues;

  /***
   * Direction
   */
  flexDirection?: FlexDirectionValues;

  /***
   * Wrap
   */
  flexWrap?: FlexWrapValues;

  /***
   * Media screens
   */
  xs?: CSSProperties;
  sm?: CSSProperties;
  md?: CSSProperties;
  lg?: CSSProperties;
  xl?: CSSProperties;
  xxl?: CSSProperties;
  hd?: CSSProperties;

  /***
   * LTR || RTL
   */
  onRTL?: CSSProperties;
  onLTR?: CSSProperties;
}
