import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_PERSON } from "../../queries";

const UpdatePerson = (props) => {
  const { id, firstName, lastName } = props;
  const [updatePerson] = useMutation(UPDATE_PERSON);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
    props.onButtonClick();
  };

  return (
    <>
      <Form
        form={form}
        name="updatePerson-form"
        onFinish={onFinish}
        initialValues={{
          firstName,
          lastName,
        }}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Form.Item
            shouldUpdate={true}
            style={{
              width: "130px",
            }}
          >
            {() => (
              <Button
                type="primary"
                htmlType="submit"
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
                disabled={
                  (form.isFieldTouched("firstName") &&
                    form.isFieldTouched("lastName")) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Update Person
              </Button>
            )}
          </Form.Item>
          <Button
            type="danger"
            style={{
              display: "inline-block",
              borderRadius: "5px",
              border: "1px solid ",
              padding: "10px",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
              width: "120px",
              height: "40px",
              margin: "20px 0 0 0",
            }}
            onClick={props.onButtonClick}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UpdatePerson;
