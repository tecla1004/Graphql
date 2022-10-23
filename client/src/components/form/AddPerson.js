import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";

const AddPerson = () => {
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
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
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
      onFinish={onFinish}
      name="addPerson-form"
      layout="inline"
      size="large"
      style={{
        marginBottom: "40px",
        marginTop: "40px",
        border: "3px solid #5603AD",
        borderRadius: "5px",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
        style={{
          display: "inline-block",
        }}
      >
        <Input
          placeholder="First Name"
          style={{
            display: "inline-block",
            width: "80%",
            height: "20px",
            borderRadius: "5px",
            border: "1px solid #5603AD",
            padding: "5px",
          }}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
        style={{
          display: "inline-block",
        }}
      >
        <Input
          placeholder="Last Name"
          style={{
            display: "inline-block",
            width: "80%",
            height: "20px",
            borderRadius: "5px",
            border: "1px solid #5603AD",
            padding: "5px",
          }}
        />
      </Form.Item>
      <Form.Item
        shouldUpdate={true}
        style={{
          display: "inline-block",
        }}
      >
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldError().filter(({ errors }) => errors.length).length
            }
            style={{
              display: "inline-block",
              borderRadius: "5px",
              border: "1px solid #5603AD",
              padding: "10px",
              backgroundColor: "#5603AD",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {""}
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddPerson;
