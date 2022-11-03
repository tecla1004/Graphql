import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_PERSON } from '../../queries2'

const UpdatePerson = (props) => {
  const { id, firstName, lastName, onButtonClick } = props;
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
    <Form form={form} name="updatePerson" size="large" layout="inline" onFinish={onFinish}
      style={{ alignItems: "center", justifyContent: "center", }}
      initialValues={{
        firstName: firstName,
        lastName: lastName,
      }}
    >
      <Form.Item label="First Name:" name="firstName" style={{ margin: "20px" }}>
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName"
        style={{ margin: "20px" }}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item shouldUpdate={true} style={{ margin: "20px" }}>
        {() => (
          <Button htmlType="submit"
            disabled={
              (!form.isFieldTouched("firstName") &&
                !form.isFieldTouched("lastName")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
          Update Conatct
          </Button>
        )}
      </Form.Item>
      <Button type="danger" onClick={onButtonClick}>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdatePerson;