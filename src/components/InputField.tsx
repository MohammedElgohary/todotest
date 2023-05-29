import React from "react";
import { Controller } from "react-hook-form";
import { FormGroup, Input } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";
export interface InputFieldProps {
  name: string;
  type?: InputType;
  control: any;
  title?: string;
  defaultValue?: string;
  rules?: any;

  [key: string]: any;
}

export default function InputField({
  name,
  type = "text",
  control,
  title = name,
  defaultValue,
  rules = {},
  ...props
}: InputFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      shouldUnregister={true}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormGroup>
          <label>{title}</label>

          <Input
            className="form-control"
            type={type as any}
            placeholder={title}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...props}
          />

          <div className="text-danger">{fieldState.error?.message}</div>
        </FormGroup>
      )}
    />
  );
}
