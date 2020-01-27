/* eslint-disable no-undef */
db.createUser({
  user: 'api',
  pwd: 'letmein',
  roles: [
    {
      role: 'readWrite',
      db: 'fullstackopen-2019-projectDB'
    }
  ]
})

db.createUser({
  user: 'compass',
  pwd: 'skyisthelimit',
  roles: [
    {
      role: 'readWrite',
      db: 'fullstackopen-2019-projectDB'
    }
  ]
})
