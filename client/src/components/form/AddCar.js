import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import car from "../../assets/car2.svg";
import { ADD_CAR, GET_PEOPLE } from "../../queries";
import "./AddCar.css";

const { Option } = Select;

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [personID, setPersonID] = useState("");
  const [addCar] = useMutation(ADD_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { make, model, personId } = values;
    const year = parseInt(values.year);
    const price = parseFloat(values.price);

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      // update: (cache, { data: { addCar } }) => {
      //   const data = cache.readQuery({ query: GET_CARS });
      //   cache.writeQuery({
      //     query: GET_CARS,
      //     data: {
      //       ...data,
      //       cars: [...data.cars, addCar],
      //     },
      //   });
      // },
    });
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);

    setPersonID(value);
  };
  const { loading, error, data } = useQuery(GET_PEOPLE);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      name="addCar-form"
      layout="inline"
      size="large"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
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
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input the year!" }]}
        style={{
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
            marginBottom: "10px",
          }}
        />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input the make!" }]}
        style={{
          display: "inline-block",
          gridColumn: "1 / 2",
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
      <Select
        placeholder="Select a person"
        name="personId"
        onChange={onChange}
        style={{
          gridColumn: "1 / 2",
          width: "200px",
        }}
      >
        {loading ? (
          <Option value="loading">Loading...</Option>
        ) : (
          data.people.map((person) => (
            <Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Option>
          ))
        )}
      </Select>
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
        <Button
          type="primary"
          htmlType="submit"
          disabled={
            !form.isFieldsTouched(true) ||
            form.getFieldError().filter(({ errors }) => errors.length).length
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
      </Form.Item>
    </Form>
  );
};

export default AddCar;
