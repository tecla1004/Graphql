import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_PERSON, PERSON_CAR } from "../../queries";

const AddCar = () => {
  const [id, setId] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);
  const { data } = useQuery(GET_PERSON);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const onFinish = (values) => {
    let { year, make, model, price, personId } = values;
    year = parseInt(year);
    price = parseInt(price);

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        if (data) {
          cache.writeQuery({
            query: GET_CARS,
            data: {
              cars: [...data.cars, addCar],
            },
          });
        }
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: PERSON_CAR, variables: { personId: personId } },
      ],
    });

    setId(uuidv4());
    console.log(values);
  };

  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <>
      <Form
       form={form}
       name="add-car-form"
       layout="inline"
       style={{ alignItems: "center", justifyContent: "center", borderBottom: "1px solid #e8e8e8", paddingBottom: "40px" }}
       size="large"
       onFinish={onFinish}
      >
        <Form.Item
         label="Year"
         name="year"
         rules={[{ required: true, message: 'Please input the year!' }]}
        >
          <Input
            placeholder="Year"
            
          />
        </Form.Item>

        <Form.Item
        label="Make"
        name="make"
        rules={[{ required: true, message: 'Please input the make!' }]}
        >
          <Input
            placeholder="Make"
          />
        </Form.Item>

        <Form.Item
           label="Model"
           name="model"
           rules={[{ required: true, message: 'Please input model!' }]}
        >
          <Input
            placeholder="Model"
          />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input price!' }]}
        >
          <Input
            placeholder="Price"
          />
        </Form.Item>

        <Form.Item
           name="personId"
           label="Person"
           rules={[{ required: true, message: "Please select person" }]}
           style={{ marginBottom: "20px" }}
        >
          <Select placeholder="Select a person">
            {data? data.people.map((person) => (
                  <Select.Option key={person.id} value={String(person.id)}>
                    {person.firstName} {person.lastName}
                  </Select.Option>
                ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item
          shouldUpdate={true}
          style={{
            gridColumn: "1 / 3",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCar;
