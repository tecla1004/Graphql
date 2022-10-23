import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import img from "../../assets/39530.jpg";
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
        if (data) {
          cache.writeQuery({
            query: GET_PEOPLE,
            data: {
              people: [...data.people, addPerson],
            },
          });
        }
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
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
        style={{
          display: "inline-block",
          marginBottom: "10px",
        }}
      >
        <Input
          placeholder="First Name"
          style={{
            display: "inline-block",
            width: "200px",
            height: "40px",
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
          marginTop: "10px",
          gridColumn: "1 / 2",
        }}
      >
        <Input
          placeholder="Last Name"
          style={{
            display: "inline-block",
            width: "200px",
            height: "40px",
            borderRadius: "5px",
            border: "1px solid #5603AD",
            padding: "5px",
            margin: "0",
          }}
        />
      </Form.Item>
      {/* Designed by grmarc / Freepik */}
      <img
        src={img}
        alt="person"
        style={{
          width: "100px",
          height: "100px",
          gridColumn: "2 / 3",
          gridRow: "1 / 3",
          justifySelf: "center",
          alignSelf: "center",
        }}
      />
      <Form.Item
        shouldUpdate={true}
        style={{
          display: "inline-block",
          gridColumn: "1 / 3",
          textAlign: "center",
          marginTop: "20px",
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
              width: "120px",
              height: "40px",
              margin: "20px 0 0 0",
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
