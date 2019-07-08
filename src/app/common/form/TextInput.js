import React from "react";
import { Form, Label, Input } from "semantic-ui-react";

const TextInput = ({
  field,
  form: { touched, errors },
  datalabel,
  ...props
}) => {
  // const isError = touched[field.name] && errors[field.name];
  return (
    <Form.Field>
      <label>{datalabel}</label>
      <Input
        className={touched[field.name] && errors[field.name] && "error"}
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && (
        <Label basic color="red" pointing>
          {errors[field.name]}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
