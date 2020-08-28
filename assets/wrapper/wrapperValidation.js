import validation from 'validate.js'
export default function validate(fieldname,value){
    var fromValues={}
    fromValues[fieldname]=value
    var formFields={}
    formFields[fieldname]=validation[fieldname]
    const result=validation.validate(fromValues,formFields)
    if(result){
        return result[fieldname][0]
    }
    return null
}