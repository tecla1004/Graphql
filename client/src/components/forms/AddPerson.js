import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PERSON } from "../../queries2";

const AddPerson = (props) => {
  const [id] = useState(uuidv4());
  const [addPerson] = useMutation(ADD_PERSON);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PERSON });
        cache.writeQuery({
          query: GET_PERSON,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
  };

  return (
    <Form
      form={form}
      name="add-person-form"
      layout="inline"
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid #e8e8e8",
        paddingBottom: "40px",
      }}
      size="large"
      onFinish={onFinish}
    >
      <Form.Item label="First Name:" name="firstName">
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName">
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddPerson;
