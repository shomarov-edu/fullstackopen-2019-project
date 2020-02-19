const allowedMethods = ['GET', 'HEAD', 'POST', 'DELETE'];

const restrictMethods = (request, response, next) => {
  if (!allowedMethods.includes(request.method)) {
    return response.sendStatus(405);
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = {
  restrictMethods,
  unknownEndpoint
};
