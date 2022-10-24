import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { GET_PEOPLE, PERSON_CARS, UPDATE_CAR } from "../../queries";

const { Option } = Select;

const UpdateCar = (props) => {
  const { id, year, make, model, price, personId } = props;
  const [updateCar] = useMutation(UPDATE_CAR);
  const { data } = useQuery(GET_PEOPLE);
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
          { query: PERSON_CARS, variables: { personId: initPersonId } },
          { query: PERSON_CARS, variables: { personId: personId } },
        ],
      });
    }

    props.onButtonClick();
  };

  const title = `Update ${make} ${model} ${year}`;

  return (
    <>
      <h3>{title}</h3>
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
        <Form.Item
          name="year"
          rules={[{ required: true, message: "Please input the year!" }]}
        >
          <Input placeholder="Year" />
        </Form.Item>
        <Form.Item
          name="make"
          rules={[{ required: true, message: "Please input the make!" }]}
        >
          <Input placeholder="Make" />
        </Form.Item>
        <Form.Item
          name="model"
          rules={[{ required: true, message: "Please input the model!" }]}
        >
          <Input placeholder="Model" />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input placeholder="Price" />
        </Form.Item>
        <Form.Item
          name="personId"
          rules={[{ required: true, message: "Please input the person ID!" }]}
        >
          <Select placeholder="Person ID">
            {data.people.map((person) => (
              <Select.Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Select.Option>
            ))}
          </Select>
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
              marginRight: "10px",
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

export default UpdateCar;
