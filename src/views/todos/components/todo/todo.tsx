import React from "react";
import { Flex } from "../../../../components/grid/flex";
import { Button } from "reactstrap";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { BsDownload, BsUpload } from "react-icons/bs";
import { TodoState } from "../../todos";

export interface TodoProps {
  state: TodoState;
  todo: any;
  deleteTodo: (id: number) => void;
  checkTodo: (id: number) => void;
  archiveTodo: (id: number) => void;
  setState: React.Dispatch<React.SetStateAction<TodoState>>;
}

export default function Todo({
  state,
  todo,
  deleteTodo,
  checkTodo,
  archiveTodo,
  setState,
}: TodoProps) {
  return (
    <>
      <div
        key={"item" + todo.id}
        className={`px-5 py-3 mb-3 bg-light ${
          todo.checked && "border border-outline-success"
        }`}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Flex gap="25px">
            <Button
              className="btn btn-success btn-sm px-3"
              onClick={() => checkTodo(todo.id)}
              title="check"
            >
              {todo.checked ? (
                <MdOutlineCheckBox size={35} color="white" />
              ) : (
                <MdOutlineCheckBoxOutlineBlank size={35} color="white" />
              )}
            </Button>

            <Flex justifyContent="center" flexDirection="column" gap={"0px"}>
              <h3
                className={`text-success ${
                  todo.checked && "text-decoration-line-through"
                }`}
              >
                {todo.title}
              </h3>
              <p
                className={`text-muted ${
                  todo.checked && "text-decoration-line-through"
                }`}
              >
                {todo.description}
              </p>
            </Flex>
          </Flex>

          <Flex>
            <Button
              className="btn btn-danger btn-sm"
              title="delete"
              onClick={() => deleteTodo(todo.id)}
            >
              <AiOutlineDelete size={20} color="white" />
              Delete
            </Button>

            {state.displayTarget === "active" && (
              <Button
                className="btn btn-warning btn-sm"
                title="edit"
                onClick={() =>
                  setState((prev: any) => ({
                    ...prev,
                    currentTodo: todo,
                    isOpen: true,
                    target: "edit",
                  }))
                }
              >
                <AiOutlineEdit size={20} color="white" />
                Edit
              </Button>
            )}

            <Button
              className="btn btn-info btn-sm"
              title="view"
              onClick={() =>
                setState((prev: any) => ({
                  ...prev,
                  currentTodo: todo,
                  isOpen: true,
                  target: "view",
                }))
              }
            >
              <AiOutlineEye size={20} color="white" />
              View
            </Button>

            <Button
              onClick={() => archiveTodo(todo.id)}
              className="btn btn-gray btn-sm"
              title="archive"
            >
              {state.displayTarget === "archived" ? (
                <>
                  <BsUpload size={20} color="white" />
                  Restore
                </>
              ) : (
                <>
                  <BsDownload size={20} color="white" />
                  Archive
                </>
              )}
            </Button>
          </Flex>
        </Flex>
      </div>
    </>
  );
}
