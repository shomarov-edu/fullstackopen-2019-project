'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var prisma_lib_1 = require('prisma-client-lib');
var typeDefs = require('./prisma-schema').typeDefs;

var models = [
  {
    name: 'Role',
    embedded: false
  },
  {
    name: 'Category',
    embedded: false
  },
  {
    name: 'Difficulty',
    embedded: false
  },
  {
    name: 'User',
    embedded: false
  },
  {
    name: 'Recipe',
    embedded: false
  },
  {
    name: 'Comment',
    embedded: true
  },
  {
    name: 'Grade',
    embedded: true
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://prisma:4466`
});
exports.prisma = new exports.Prisma();
