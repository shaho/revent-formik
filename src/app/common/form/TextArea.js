import React from "react";
import { Form, Label } from "semantic-ui-react";

const TextArea = ({
  field,
  form: { touched, errors },
  datalabel,
  ...props
}) => {
  //   console.log(field);
  return (
    <Form.Field>
      <label>{datalabel}</label>
      <textarea {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <Label basic color="red">
          {errors[field.name]}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextArea;
