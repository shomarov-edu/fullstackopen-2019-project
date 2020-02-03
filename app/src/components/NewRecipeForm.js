import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import { makeStyles } from '@material-ui/core/styles'
import useField from '../hooks/useField'
import recipeService from '../services/recipes'

const useStyles = makeStyles(theme => ({
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const NewRecipeForm = ({ user }) => {
  const classes = useStyles()

  const title = useField('text')
  const description = useField('text')
  const time = useField('number')
  const [difficulty, setDifficulty] = useState('')
  const [ingredients, setIngredients] = useState([''])
  const [instructions, setInstructions] = useState([''])
  const [notes, setNotes] = useState([''])
  const source = useField('url')

  const handleSubmit = async event => {
    event.preventDefault()

    const recipe = {
      title: title.input.value,
      description: description.input.value,
      time: time.input.value,
      difficulty,
      ingredients,
      instructions,
      source: source.input.value
    }

    recipeService.setToken(user.token)

    try {
      await recipeService.createNewRecipe(recipe)
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
          {...title.input}
          variant="outlined"
          margin="normal"
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
        />
        <TextField
          {...description.input}
          variant="outlined"
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
        />
        <TextField
          {...time.input}
          variant="outlined"
          margin="normal"
          id="time"
          label="Cooking time"
          InputLabelProps={{
            shrink: true
          }}
        />
        <FormLabel component="legend">Difficulty</FormLabel>
        <RadioGroup
          margin="normal"
          aria-label="Difficulty"
          name="difficulty"
          value={difficulty}
          onChange={event => setDifficulty(event.target.value)}
          row
        >
          <FormControlLabel
            value="easy"
            control={<Radio color="primary" />}
            label="Easy"
            labelPlacement="start"
          />
          <FormControlLabel
            value="intermediate"
            control={<Radio color="primary" />}
            label="Intermediate"
            labelPlacement="start"
          />
          <FormControlLabel
            value="hard"
            control={<Radio color="primary" />}
            label="Hard"
            labelPlacement="start"
          />
        </RadioGroup>
        <FormLabel component="legend">Ingredients</FormLabel>
        {ingredients.map((value, index) => {
          return (
            <TextField
              key={index}
              value={value}
              onChange={e => {
                ingredients[index] = e.target.value
                setIngredients([...ingredients])
              }}
              fullWidth
              variant="outlined"
              margin="normal"
              id="ingredients"
              label={`Ingredient ${index + 1}`}
              name="ingredients"
            />
          )
        })}
        <Button
          onClick={() => setIngredients(ingredients.concat(''))}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add
        </Button>
        <FormLabel component="legend">Instructions</FormLabel>
        {instructions.map((value, index) => {
          return (
            <TextField
              key={index}
              value={value}
              onChange={e => {
                instructions[index] = e.target.value
                setInstructions([...instructions])
              }}
              fullWidth
              variant="outlined"
              margin="normal"
              id="ingredients"
              label={`Step ${index + 1}`}
              name="ingredients"
            />
          )
        })}
        <Button
          onClick={() => setInstructions(instructions.concat(''))}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add
        </Button>
        <FormLabel component="legend">Additional notes</FormLabel>
        {notes.map((value, index) => {
          return (
            <TextField
              key={index}
              value={value}
              onChange={e => {
                notes[index] = e.target.value
                setNotes([...notes])
              }}
              fullWidth
              variant="outlined"
              margin="normal"
              id="notes"
              label={`Step ${index + 1}`}
              name="notes"
            />
          )
        })}
        <Button
          onClick={() => setNotes(notes.concat(''))}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add
        </Button>
        <TextField
          {...source.input}
          variant="outlined"
          margin="normal"
          fullWidth
          id="source"
          label="Source (if any)"
          name="source"
          autoComplete="source"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Save
        </Button>
        <Grid container></Grid>
      </form>
    </React.Fragment>
  )
}

export default NewRecipeForm
