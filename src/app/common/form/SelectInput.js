import React from "react";
import { Form, Label, Dropdown, Select } from "semantic-ui-react";

const SelectInput = ({
  field: { name, value },
  form: { touched, errors, setFieldValue },
  datalabel,
  options,
  children: _,
  multiple,
  ...props
}) => {
  return (
    <Form.Field>
      <label>{datalabel}</label>

      {/* sdfsdf */}

      <Select
        value={value || null}
        // onChange={(e, data) => field.onChange(field.value)}
        options={options}
        multiple={multiple}
        onChange={(_, { value }) => setFieldValue(name, value)}
        // {...field}
        {...props}
      />

      {/* <Dropdown
        selection
        options={options}
        value={value}
        onChange={(_, { value }) => setFieldValue(name, value)}
        {...props}
      /> */}

      {/* sdfsdf */}

      {touched[name] && errors[name] && (
        <Label basic color="red">
          {errors[name]}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput;
