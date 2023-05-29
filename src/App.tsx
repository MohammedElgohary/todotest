import React from "react";

const MainContainer = React.lazy(() => import("./components/mainContainer"));
const Todos = React.lazy(() => import("./views/todos"));

export default function App() {
  return (
    <>
      <MainContainer>
        <Todos />
      </MainContainer>
    </>
  );
}
