import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
  const { id, year, make, model, price, personId } = props;
  const [updateCar] = useMutation(UPDATE_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    let { year, make, model, price, personId } = values;
    year = parseInt(year);
    price = parseFloat(price);

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
          <Input placeholder="Person ID" />
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
