import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'

import { GET_PERSON, REMOVE_PERSON, GET_CARS, REMOVE_CAR } from '../../queries2'

import filter from 'lodash.filter'

const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removeContact } }) {
      const { people } = cache.readQuery({ query: GET_PERSON })
      cache.writeQuery({
        query: GET_PERSON,
        data: {
          contacts: filter(people, o => {
            return o.id !== removePerson.id
          })
        }
      })
    }
  })

  const [deleteCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { deleteCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (car) => car.personId !== id),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this person?')

    if (result) {
      removePerson({
        variables: {
          id
        }
      })
      deleteCar({
        variables: {
          personId: id,
        },
      });
    }
  }

  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default RemovePerson
