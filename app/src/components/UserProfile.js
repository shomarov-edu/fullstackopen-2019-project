import React, { useState } from 'react'
import UserRecipes from './UserRecipes'

const UserProfile = ({ user }) => {
  const [recipesVisible, setRecipesVisible] = useState(false)
  const toggleVisibility = () => setRecipesVisible(!recipesVisible)

  const recipeVisibility = { display: recipesVisible ? '' : 'none' }

  if (!user) return null

  return (
    <React.Fragment>
      <p>
        {user.firstname} {user.lastname}
      </p>
      {recipesVisible ? (
        <button onClick={toggleVisibility}>hide recipes</button>
      ) : (
        <button onClick={toggleVisibility}>show recipes</button>
      )}
      <div style={recipeVisibility}>
        <UserRecipes user={user} />
      </div>
    </React.Fragment>
  )
}

export default UserProfile
