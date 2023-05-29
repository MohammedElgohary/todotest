import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { TodoState } from "../../todos";
import InputField from "../../../../components/InputField";

/***
 * TodoForm Interface
 */
export interface TodoFormProps {
  isOpen: boolean;
  toggle: () => void;
  target: "create" | "edit" | "view";
  setState: React.Dispatch<React.SetStateAction<TodoState>>;
  row: any;
}

/***
 * TodoForm Component
 */
export default function TodoForm({
  isOpen,
  toggle,
  setState: setTodos,
  target,
  row,
}: TodoFormProps) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: row?.title,
      description: row?.description,
    },
  });

  function handleSave(data: any) {
    switch (target) {
      case "create":
        setTodos((prev) => ({
          ...prev,
          todos: [
            ...prev.todos,
            {
              ...data,
              id: new Date().getTime(),
              createdAt: new Date(),
              updatedAt: null,
              archivedAt: null,
              finishedAt: null,
              checked: false,
            },
          ],
        }));
        break;

      case "edit":
        setTodos((prev) => ({
          ...prev,
          todos: prev.todos.map((todo) =>
            todo.id === row.id ? { ...data, updatedAt: new Date() } : todo
          ),
        }));
        break;
    }

    reset({
      title: "",
      description: "",
    });

    toggle();
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <form onSubmit={handleSubmit(handleSave)}>
          <ModalHeader>Todo Form</ModalHeader>

          <ModalBody>
            <InputField
              disabled={target === "view"}
              name="title"
              control={control}
              title="Title"
              rules={{
                required: {
                  value: true,
                  message: "Title is required",
                },
              }}
            />

            <InputField
              disabled={target === "view"}
              type="textarea"
              name="description"
              control={control}
              title="Description"
            />
          </ModalBody>

          <ModalFooter className="ltr">
            <Button type="submit" className="btn btn-success">
              Save
            </Button>

            {target !== "view" && (
              <Button onClick={toggle} className="btn btn-secondary">
                Cancel
              </Button>
            )}
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
