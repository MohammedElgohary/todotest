import { useState, useEffect } from "react";
import TodoForm from "./components/todoForm/TodoForm";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import { Flex } from "../../components/grid/flex";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Swal from "sweetalert2";
import useLocalStorage from "../../hooks/useLocalStorage";
import Todo from "./components/todo/todo";
import { AiOutlinePlus } from "react-icons/ai";

export interface TodoState {
  isOpen: boolean;
  target: "create" | "edit" | "view";
  todos: any[];
  currentTodo: any;
  displayTarget: "archived" | "active";
}

export default function TodoList() {
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

  const displayedItems =
    state.displayTarget === "active"
      ? state.todos.filter((todo) => todo.archivedAt === null)
      : state.todos.filter((todo) => todo.archivedAt);

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
              <AiOutlinePlus size={20} />
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
            {displayedItems.length === 0 && (
              <h4>
                <Flex
                  className="text-danger bg-light p-5 px-3"
                  justifyContent="center"
                  alignItems="center"
                >
                  <HiOutlineClipboardDocumentList size={40} />
                  No Todos
                </Flex>
              </h4>
            )}

            {displayedItems.map((todo) => (
              <Todo
                key={"item" + todo.id}
                archiveTodo={archiveTodo}
                todo={todo}
                checkTodo={checkTodo}
                deleteTodo={deleteTodo}
                setState={setState}
              />
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
