import PropTypes from "prop-types"

const fetchAPI = (props) => {
    const url = process.env.REACT_APP_BASE_API_URL + props.url
}

fetchAPI.propTypes = {
    method: PropTypes.oneOf(['GET', 'POST', 'PUT', 'DELETE']),
    url: PropTypes.string,
    body: PropTypes.object,
    headers: PropTypes.object
}