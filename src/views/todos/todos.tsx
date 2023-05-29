import React, { useState, useEffect } from "react";
import TodoForm from "./components/todoForm/TodoForm";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { Flex } from "../../components/grid/flex";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import Swal from "sweetalert2";
import useLocalStorage from "../../hooks/useLocalStorage";

export interface TodoState {
  isOpen: boolean;
  target: "create" | "edit" | "view";
  todos: any[];
  currentTodo: any;
  displayTarget: "archived" | "active";
}

export default function Todo() {
  /***
   * State
   */
  const [state, setState] = useState<TodoState>({
    isOpen: false,
    target: "create",
    todos: useLocalStorage("todos", []),
    currentTodo: null,
    displayTarget: "active",
  });

  /***
   * Toggle
   */
  const toggle = () =>
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen, target: "create" }));

  function deleteTodo(id: number) {
    Swal.fire({
      title: "Do you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setState((prev) => ({
          ...prev,
          todos: prev.todos.filter((todo) => todo.id !== id),
        }));
      }
    });
  }

  function checkTodo(id: number) {
    setState((prev) => ({
      ...prev,
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      ),
    }));
  }

  function archiveTodo(id: number) {
    setState((prev) => ({
      ...prev,
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, archivedAt: new Date() } : todo
      ),
    }));
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <>
      <Card className="m-5">
        <CardHeader className="p-3 px-5">
          <Flex alignItems="center" justifyContent="space-between">
            <h1>Todos</h1>

            <Button className="btn bg-primary" onClick={toggle}>
              Add Todo
            </Button>
          </Flex>
        </CardHeader>

        <CardBody>
          <Flex alignItems="center" justifyContent="center" className="my-3">
            <Button
              className={`btn  ${
                state.displayTarget === "archived" ? "btn-success" : "btn-light"
              }`}
              onClick={() =>
                setState((prev) => ({ ...prev, displayTarget: "archived" }))
              }
              gap={"8px"}
            >
              <Flex>
                <FaCloudDownloadAlt size={20} />
                ArChived Todos
              </Flex>
            </Button>

            <Button
              className={`btn  ${
                state.displayTarget === "active" ? "btn-success" : "btn-light"
              }`}
              onClick={() =>
                setState((prev) => ({ ...prev, displayTarget: "active" }))
              }
              gap={"8px"}
            >
              <Flex>
                <IoMdCloudUpload size={20} />
                Active Todos
              </Flex>
            </Button>
          </Flex>

          <>
            {state.todos.length === 0 && (
              <h4 className="text-danger text-center bg-light p-3">No Todos</h4>
            )}

            {[
              ...(state.displayTarget === "active"
                ? state.todos.filter((todo) => todo.archivedAt === null)
                : state.todos.filter((todo) => todo.archivedAt)),
            ].map((todo) => (
              <div
                key={"item" + todo.id}
                className={`px-5 py-3 mb-3 bg-light ${
                  todo.checked && "border border-outline-success"
                }`}
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex
                    justifyContent="center"
                    flexDirection="column"
                    gap={"0px"}
                  >
                    <div className="text-success">{todo.title}</div>
                    <div className="text-muted">{todo.description}</div>
                  </Flex>

                  <Flex>
                    <Button
                      className="btn btn-danger btn-sm"
                      title="delete"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <AiOutlineDelete size={20} color="white" />
                    </Button>

                    <Button
                      className="btn btn-warning btn-sm"
                      title="edit"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          currentTodo: todo,
                          isOpen: true,
                          target: "edit",
                        }))
                      }
                    >
                      <AiOutlineEdit size={20} color="white" />
                    </Button>

                    <Button
                      className="btn btn-info btn-sm"
                      onClick={() => checkTodo(todo.id)}
                      title="check"
                    >
                      {todo.checked ? (
                        <MdOutlineCheckBox size={20} color="white" />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank
                          size={20}
                          color="white"
                        />
                      )}
                    </Button>

                    <Button
                      className="btn btn-success btn-sm"
                      title="view"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          currentTodo: todo,
                          isOpen: true,
                          target: "view",
                        }))
                      }
                    >
                      <AiOutlineEye size={20} color="white" />
                    </Button>

                    <Button
                      onClick={() => archiveTodo(todo.id)}
                      className="btn btn-gray btn-sm"
                      title="archive"
                    >
                      <BsDownload size={20} color="white" />
                    </Button>
                  </Flex>
                </Flex>
              </div>
            ))}
          </>
        </CardBody>
      </Card>

      <TodoForm
        row={state.currentTodo}
        isOpen={state.isOpen}
        target={state.target}
        setState={setState}
        toggle={toggle}
      />
    </>
  );
}
