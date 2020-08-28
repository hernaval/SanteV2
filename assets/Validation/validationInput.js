const validation ={
    email :{
        presence: {
            message :'^veuillez entrer votre adresse mail',
        },
        email:{
            message:'^veuillez entrer un adresse mail valide'
        }
    },
    password :{
        presence:{
            message:'^veuillez entrer un mot de passe'
        },
        length:{
            minimum : 8,
            message: '^votre mot de passe doit avoir au moins 8 caractères'
        }
    }
}
export default validation