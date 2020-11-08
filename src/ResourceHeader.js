import * as React from 'react'
import PropTypes from 'prop-types'

const ResourceHeader = ({ label }) => {
  return <React.Fragment>{label}</React.Fragment>
}

ResourceHeader.propTypes = {
  label: PropTypes.node,
  index: PropTypes.number,
  resource: PropTypes.object,
}

export default ResourceHeader
