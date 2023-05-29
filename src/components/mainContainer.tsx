import React from "react";
import styled from "styled-components";
import { config } from "../configs/cinfig";

/***
 * Styled components
 */
const Container = styled("div")({
  maxWidth: config.APP.mainContainerWidth,
  margin: `0 auto`,
  marginBottom: `50px`,
});

/***
 * Interface
 */
export interface MainContainerProps {
  readonly children: React.ReactNode;
  [key: string]: any;
}

/***
 * Main component
 */
export default function MainContainer(props: MainContainerProps) {
  return <Container>{props.children}</Container>;
}
