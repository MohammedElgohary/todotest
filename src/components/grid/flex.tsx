import styled from "styled-components";
import { FlexProps } from "./flex.types";

export const Flex = styled("div")<FlexProps>(
  {
    display: "flex",
  },
  ({
    maxWidth,
    minWidth,
    fullWidth,
    flexGrow,
    flexShrink,
    gap,
    alignItems,
    alignContent,
    alignSelf,
    justifyContent,
    justifyItems,
    justifySelf,
    flexDirection,
    flexWrap,
    xs = {},
    sm = {},
    md = {},
    lg = {},
    xl = {},
    xxl = {},
    hd = {},
    onRTL = {},
    onLTR = {},
  }) => ({
    flexDirection,
    justifyContent,
    justifyItems,
    justifySelf,
    alignSelf,
    alignItems,
    alignContent,
    gap: gap || "15px",
    flexGrow: fullWidth ? "1" : flexGrow || undefined,
    flexShrink,
    width: fullWidth || maxWidth ? "100%" : undefined,
    flexWrap: flexWrap || "wrap",
    maxWidth,
    minWidth,
    "@media screen and (max-width: 280px)": { ...xs },
    "@media screen and (max-width: 576px)": { ...sm },
    "@media screen and (max-width: 768px)": { ...md },
    "@media screen and (max-width: 992px)": { ...lg },
    "@media screen and (max-width: 1200px)": { ...xl },
    "@media screen and (min-width: 1360px)": { ...xxl },
    "@media screen and (min-width: 1900px)": { ...hd },

    "html[dir=rtl] &, body[dir=rtl] &": { ...onRTL },
    "html[dir=ltr] &, body[dir=ltr] &": { ...onLTR },
  })
);
