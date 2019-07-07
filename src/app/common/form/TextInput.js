import React from "react";
import { Form, Label } from "semantic-ui-react";

const TextInput = ({
  field,
  form: { touched, errors },
  datalabel,
  ...props
}) => {
  return (
    <Form.Field>
      <label>{datalabel}</label>
      <input {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <Label basic color="red">
          {errors[field.name]}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
