import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select, Option } from "antd";
import { useEffect, useState } from "react";
import { GET_PERSON, PERSON_CAR, UPDATE_CAR } from "../../queries";


const UpdateCar = (props) => {
  const { id, year, make, model, price, personId } = props;
  const [updateCar] = useMutation(UPDATE_CAR);
  const { data } = useQuery(GET_PERSON);
  const [initPersonId, setNewPersonId] = useState(personId);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    let { year, make, model, price, personId } = values;
    year = parseInt(year);
    price = parseFloat(price);

    if (personId === initPersonId) {
      updateCar({
        variables: {
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      });
    } else {
      console.log("cambio dueño");
      updateCar({
        variables: {
          id,
          year,
          make,
          model,
          price,
          personId,
        },
        awaitRefetchQueries: true,
        refetchQueries: [
          { query: PERSON_CAR, variables: { personId: initPersonId } },
          { query: PERSON_CAR, variables: { personId: personId } },
        ],
      });
    }

    props.onButtonClick();
  };

  return (
    <>
      <Form
        form={form}
        name="updateCar-form"
        onFinish={onFinish}
        initialValues={{
          year,
          make,
          model,
          price,
          personId,
        }}
      >
        <Form.Item label="year" name="year" style={{ margin: "20px" }}>
          <Input placeholder="Year" />
        </Form.Item>
        <Form.Item label="make" name="make" style={{ margin: "20px" }}>
          <Input placeholder="Make" />
        </Form.Item>
        <Form.Item label="model" name="model" style={{ margin: "20px" }} >
          <Input placeholder="Model" />
        </Form.Item>
        <Form.Item label="price" name="price" style={{ margin: "20px" }}>
          <Input placeholder="Price" />
        </Form.Item>
        <Form.Item
          name="personId"
          rules={[{ required: true, message: "Please select person" }]}
          style={{ marginBottom: "20px" }}
        >
          <Select placeholder="Select person">
            {data?.people.map((person) => (
              <Select.Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
          <Form.Item
            shouldUpdate={true}
            style={{
              margin: "10px",
            }}
          >
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched() ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Update Car
              </Button>
            )}
          </Form.Item>
          <Button
            type="danger"
            onClick={props.onButtonClick}
          >
            Cancel
          </Button>
      </Form>
    </>
  );
};

export default UpdateCar;
