import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import car from "../../assets/car2.svg";
import { ADD_CAR, GET_CARS, GET_PEOPLE, PERSON_CARS } from "../../queries";
import "./AddCar.css";

const { Option } = Select;

const AddCar = () => {
  const [id, setId] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);
  const { data } = useQuery(GET_PEOPLE);

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
        { query: PERSON_CARS, variables: { personId: personId } },
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
        name="addCar-form"
        layout="inline"
        size="large"
        style={{
          marginBottom: "40px",
          width: "100%",
          marginTop: "40px",
          border: "3px solid #5603AD",
          borderRadius: "5px",
          padding: "40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
        onFinish={onFinish}
      >
        <h2
          style={{
            gridColumn: "1 / 3",
            gridRow: "1 / 2",
            textAlign: "center",
            color: "#5603AD",
            marginBottom: "40px",
          }}
        >
          Add Car
        </h2>
        <Form.Item
          name="year"
          rules={[{ required: true, message: "Please input the year!" }]}
          style={{
            marginBottom: "20px",
            display: "inline-block",
            gridColumn: "1 / 2",
          }}
        >
          <Input
            placeholder="Year"
            style={{
              width: "200px",
              height: "40px",
              padding: "0 11px",
              borderRadius: "5px",
              border: "1px solid #5603AD",
            }}
          />
        </Form.Item>

        <Form.Item
          name="make"
          rules={[{ required: true, message: "Please input the make!" }]}
          style={{
            display: "inline-block",
            gridColumn: "1 / 2",
            marginBottom: "20px",
          }}
        >
          <Input
            placeholder="Make"
            style={{
              width: "200px",
              height: "40px",
              padding: "0 11px",
              borderRadius: "5px",
              border: "1px solid #5603AD",
              marginBottom: "10px",
            }}
          />
        </Form.Item>

        <Form.Item
          name="model"
          rules={[{ required: true, message: "Please input the model!" }]}
          style={{
            marginBottom: "20px",
            display: "inline-block",
            gridColumn: "1 / 2",
          }}
        >
          <Input
            placeholder="Model"
            style={{
              width: "200px",
              height: "40px",
              padding: "0 11px",
              borderRadius: "5px",
              border: "1px solid #5603AD",
              marginBottom: "10px",
            }}
          />
        </Form.Item>

        <Form.Item
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
          style={{
            display: "inline-block",
            gridColumn: "1 / 2",
            marginBottom: "20px",
          }}
        >
          <Input
            placeholder="Price"
            style={{
              width: "200px",
              height: "40px",
              padding: "0 11px",
              display: "flex",
              borderRadius: "5px",
              border: "1px solid #5603AD",
              marginBottom: "10px",
            }}
          />
        </Form.Item>

        <Form.Item
          name="personId"
          rules={[{ required: true, message: "Please select a person!" }]}
          style={{
            gridColumn: "1 / 2",
            width: "200px",
            marginBottom: "20px",
          }}
        >
          <Select placeholder="Select a person">
            {data
              ? data.people.map((person) => (
                  <Option key={person.id} value={String(person.id)}>
                    {person.firstName} {person.lastName}
                  </Option>
                ))
              : null}
          </Select>
        </Form.Item>
        <img
          src={car}
          alt="car"
          style={{
            gridColumn: "2 / 3",
            gridRow: "1/6 ",
            justifySelf: "center",
            alignSelf: "center",
            width: "250px",
            height: "250px",
          }}
        />

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
              style={{
                borderRadius: "5px",
                border: "1px solid #5603AD",
                padding: "10px",
                backgroundColor: "#5603AD",
                color: "white",
                width: "120px",
                height: "40px",
                margin: "20px 0 0 0",
              }}
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
