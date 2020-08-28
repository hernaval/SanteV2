
const initialState = { Idquestion: 1,point:0,age:0,taille:0,poids:0 }

export default function toggleQuestion (state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'Next':
      const questionIndex = action.value.Id
      const questionPoint=action.value.point
      const questionAge=action.value.age
      const questionTaille=action.value.taille
      const questionPoid=action.value.poids
      if (questionIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          Idquestion:questionIndex,
          point:questionPoint,
          age:questionAge,
          taille:questionTaille,
          poids:questionPoid
        }
      }
      return nextState || state
  default:
    return state
  }
}
