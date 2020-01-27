const requestLogger = (request, response, next) => {
  console.log('---')
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (
    error.name === 'ValidationError' &&
    error.errors.title.kind === 'required'
  ) {
    return response
      .status(400)
      .json({ error: `${error.errors.title.path} required` })
  } else if (error.code === 11000) {
    return response.status(409).json({ error: 'username taken' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
