import { useQuery } from '@apollo/client'
import { List } from 'antd'
import { GET_PERSON } from '../../queries2'
import Person from '../listItems/Person'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const People = (props) => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_PERSON)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <Person id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  )
}

export default People
