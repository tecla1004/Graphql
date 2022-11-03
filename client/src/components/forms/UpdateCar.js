import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR, PERSON_CAR, GET_PERSON } from '../../queries2'

const UpdateCar = (props) => {
  const { id, year, make, model, price, personId } = props;
  const [updateCar] = useMutation(UPDATE_CAR);
  const { data } = useQuery(GET_PERSON);
  const [newPersonId, setNewPersonId] = useState(personId);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();


useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    let { year, make, model, price, personId } = values;
    year = parseInt(year);
    price = parseFloat(price);

    if (personId === newPersonId) {
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
            { query: PERSON_CAR, variables: { personId: newPersonId } },
            { query: PERSON_CAR, variables: { personId: personId } },
          ],
        });
      }
    props.onButtonClick();
  };

  return (
    <Form form={form} name="updateCar" size="large" layout="inline" onFinish={onFinish}
      style={{ alignItems: "center", justifyContent: "center", }}
      initialValues={{
        year,
        make,
        model,
        price,
        personId,
      }}
    >
      <Form.Item label="year" name="year" style={{ margin: "20px" }}>
        <Input placeholder="Year"  />
      </Form.Item>
      <Form.Item label="make" name="make"
        style={{ margin: "20px" }}
      >
        <Input placeholder="Make"   />
      </Form.Item>
      <Form.Item label="model" name="model"
        style={{ margin: "20px" }}
      >
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item label="price" name="price"
        style={{ margin: "20px" }}
      >
        <Input placeholder="Price" />
      </Form.Item>
      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please select person" }]}
        style={{ marginBottom: "20px" }}
      >
         <Select placeholder="Select a person">
          {data ?
          
          data.people.map((person) => (
            <Select.Option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </Select.Option>
          )): null}
          </Select>
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
          Update Car
          </Button>
        )}
      </Form.Item>
      <Button type="danger" onClick={props.onButtonClick}>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateCar;