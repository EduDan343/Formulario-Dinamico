import React, { useState } from 'react'
import './Form.css'

function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'El nombre es requerido';
    } else if (!/^[\s\S]{5,20}$/.test(input.name)) {
      errors.name = 'Nombre invalido, minimo se requiere 5 a 20 carateres';
    }

    if (!input.lastname) {
        errors.lastname = 'El apellido es requerido';
      } else if (!/^[\s\S]{5,20}$/.test(input.lastname)) {
        errors.lastname = 'Apellido invalido, minimo se requiere 5 a 20 carateres';
      }

    if(!input.age){
        errors.age = "La edad es requerida...";
      } else if(!/^([1-8][0-9])$/.test(input.age)) { //rango 1.00 - 5.00
        errors.age = "Edad invalida, escoja un rango de 10 a 89 años...";
    }

    if(!input.telefono){
        errors.telefono = "Telefono is required";
      } else if(!/^[\s\S]{10}$/.test(input.telefono)) { //rango 1.00 - 5.00
        errors.telefono = "Numero invalido,inserte los 10 digitos requeridos";
    }

    if(!input.email){
        errors.email = "Email is required";
      } else if(!/^\S+@\S+\.\S+$/.test(input.email)) { //rango 1.00 - 5.00
        errors.email = "Inserte un email valido...";
    }

    return errors;
}

const Form = () => {
  
  const [input, setInput] = useState({
    name: '',
    lastname: '',
    age: '',
    numberPhone: '',
    email: '',
    opcionSelect: 'Opcion1',
    telefono: ''
  })

  const [error, setError] = useState({});

  const [options, setOptions] = useState([]);

  console.log('error', error)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(error).length === 0){
        setInput({  //nos servira para enviar setear los inputs vacios cuando la info sea enviada por el form...
            name: '',
            lastname: '',
            age: '',
            numberPhone: '',
            email: '',
            opcionSelect: 'Opcion1',
            telefono: ''
        })
        alert('Datos enviados correctamente...')
    } else{
        alert('Error, falta completar algunos campos...')
    }
  }

  const handleChange = (event) => {
    setInput({
        ...input,
        [event.target.name]  : event.target.value
    })
    setError(validate({
        ...input,
        [event.target.name] : event.target.value
    }))
  }

//   const opcionesDisponibles = []

  const handleSelect = (event) => {
    setInput({
        ...input,
        [event.target.name]  : event.target.value
    })
    if(options.includes(event.target.value)) return;
    setOptions([...options, event.target.value])
  }

  const handleDelete = (e) => {
    e.preventDefault()
    const filtro = options.filter( data => data !== e.target.name)
    setOptions(filtro);
  }

  console.log('options', options)

  return (
    <div>
        <h1>Formulario de registro</h1>
        <form onSubmit={handleSubmit}>
            <div className='OpcionForm'>
                <label htmlFor="nombre">Nombre</label>
                <input 
                    type="text"
                    name='name'
                    value={input.name}
                    placeholder='Inserte su nombre'
                    onChange={handleChange}
                />
                {error.name !== undefined && <span style={{
                    color: 'red'
                }} className="error">{ error.name }</span>}
            </div>
            <div className='OpcionForm'>
                <label htmlFor="apellido">Apellido</label>
                <input 
                    type="text"
                    name='lastname'
                    value={input.lastname}
                    placeholder='Inserte su apellido'
                    onChange={handleChange}
                />
                {error.lastname !== undefined && <span style={{
                    color: 'red'
                }} className="error">{ error.lastname }</span>}
            </div>
            <div className='OpcionForm'>
                <label htmlFor="age">Edad</label>
                <input 
                    type="number"
                    name='age'
                    value={input.age}
                    placeholder='Inserte su edad'
                    onChange={handleChange}
                />
                {error.age !== undefined && <span style={{
                    color: 'red'
                }} className="error">{ error.age }</span>}
            </div>
            <div className='OpcionForm'>
                <label htmlFor="telefono">Numero telefonico</label>
                <input 
                    type="text"
                    name='telefono'
                    value={input.telefono}
                    placeholder='Inserte su num telefonico'
                    onChange={handleChange}
                />
                {error.telefono !== undefined && <span style={{
                    color: 'red'
                }} className="error">{ error.telefono }</span>}
            </div>
            <div className='OpcionForm'>
                <label htmlFor="Email">Email</label>
                <input 
                    type="email"
                    name='email'
                    value={input.email}
                    placeholder='Inserte su Email'
                    onChange={handleChange}
                />
                {error.email !== undefined && <span style={{
                    color: 'red'
                }} className="error">{ error.email }</span>}
            </div>
            <div className='OpcionForm'>
                <label htmlFor="Opciones">Opciones</label>
                <select name="opcionSelect" id="options" 
                    value={input.opcionSelect}
                    onChange={handleSelect}
                >
                    <option value="Opcion1">Opcion1</option>
                    <option value="Opcion2">Opcion2</option>
                    <option value="Opcion3">Opcion3</option>
                    <option value="Opcion4">Opcion4</option>
                </select>
            </div>
            <div className='lista'>
                {
                    options.length && options.map( data => (
                        <p className='lista-p'>
                            { data }
                            <button 
                                onClick={handleDelete}
                                style={{color: 'red'}}
                                name={data}    
                            >
                                X
                            </button>
                        </p>
                    ))
                }
            </div>

            <button type="submit" id="formButton">Enviar</button>

        </form>
    </div>
  )
}

export default Form