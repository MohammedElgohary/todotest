import React from "react";
import { Spinner } from "reactstrap";
import styled from "styled-components";
import { Flex } from "./grid/flex";

const LoaderContainer = styled(Flex)({
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: "#00000041",
  zIndex: 9999,
});

export default function Loader() {
  return (
    <LoaderContainer alignItems="center" justifyContent="center">
      <Spinner />
    </LoaderContainer>
  );
}
