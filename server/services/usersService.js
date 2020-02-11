const bcrypt = require('bcrypt')
const User = require('../models/user')

const getAll = async () => {
  try {
    const users = await User.aggregate([
      { $match: {} },
      {
        $project: {
          name: 1,
          firstname: 1,
          lastname: 1,
          email: {
            $cond: {
              if: { $eq: [true, '$email.private'] },
              then: '$$REMOVE',
              else: '$email.address'
            }
          }
        }
      }
    ])

    return users
  } catch (e) {
    console.log(e)
  }
}

const getOne = async username => {
  try {
    const user = await User.aggregate([
      { $match: { username } },
      {
        $project: {
          name: 1,
          firstname: 1,
          lastname: 1,
          email: {
            $cond: {
              if: { $eq: [true, '$email.private'] },
              then: '$$REMOVE',
              else: '$email.address'
            }
          }
        }
      }
    ])

    return user
  } catch (e) {
    console.log(e)
  }
}

const create = async userData => {
  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(userData.password, saltRounds)

    const user = new User({
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      passwordHash
    })

    const savedUser = await user.save()

    return savedUser
  } catch (e) {
    return e
  }
}

const update = async () => {}

const deleteOne = async () => {}

module.exports = { getAll, getOne, create, update, deleteOne }
