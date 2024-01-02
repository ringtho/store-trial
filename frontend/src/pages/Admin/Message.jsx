import PropTypes from 'prop-types'

const Message = ({children}) => {
  return (
    <div>{children}</div>
  )
}

Message.propTypes = {
    children: PropTypes.any
}

export default Message