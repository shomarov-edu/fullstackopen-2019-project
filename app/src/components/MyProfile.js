import React, { useState } from 'react'
import MyRecipes from './MyRecipes'

const MyProfile = ({ user }) => {
  const [recipesVisible, setRecipesVisible] = useState(false)
  const toggleVisibility = () => setRecipesVisible(!recipesVisible)

  const recipeVisibility = { display: recipesVisible ? '' : 'none' }

  if (!user) return null

  return (
    <React.Fragment>
      <h2>My Profile</h2>
      <p>
        {user.firstname} {user.lastname}
      </p>
      {recipesVisible ? (
        <button onClick={toggleVisibility}>hide recipes</button>
      ) : (
        <button onClick={toggleVisibility}>show recipes</button>
      )}
      <div style={recipeVisibility}>
        {user.recipes ? <MyRecipes user={user} /> : null}
      </div>
    </React.Fragment>
  )
}

export default MyProfile
