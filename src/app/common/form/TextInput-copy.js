import React from "react";
import { Form, Label, Input } from "semantic-ui-react";

const TextInput = ({
  field: { name, value },
  form: { touched, errors },
  datalabel,
  ...props
}) => {
  const isError = touched[name] && errors[name];
  return (
    <Form.Field>
      <label>{datalabel}</label>
      <Input
        // className={touched[field.name] && errors[field.name] && "error"}
        // {isError ? "" : ""}
        error={isError}
        name
        value={value}
        {...props}
        // {...touched[field.name] && errors[field.name] && "error"}
      />
      {touched[name] && errors[name] && (
        <Label basic color="red" pointing>
          {errors[name]}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
