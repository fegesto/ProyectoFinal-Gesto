import { useState } from "react";
import './CheckoutForm.css'


const CheckoutForm = ({onConfirm}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    
    const validateName = (value) => {
        if (!value){
            return 'Necesitamos tu nombre para contactarte.';
        }
        if (value.length < 3){
            return 'Lo que ingresaste no parece un nombre valido.';
        }
        return null;
    };

    const validatePhone = (value) => {
        const phoneRegex = /^\d{10,12}$/;

        if (!value){
            return 'Necesitamos tu numero de telefono para contactarte.';
        }
        if (!phoneRegex.test(value)){
            return 'El telefono que ingresaste no parece valido.';
        }
        return null;
    };

    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!value){
            return 'Necesitamos tu email para contactarte.';
        }
        if (!emailRegex.test(value)){
            return 'El email que ingresaste no parece valido.';
        }
        return null;
    };

    const handleConfirm = (event) => {
        event.preventDefault();

        const nameError = validateName(name);
        const phoneError = validatePhone(phone);
        const emailError = validateEmail(email);

        if (nameError || phoneError || emailError) {
            setErrors({
                name: nameError, 
                phone: phoneError,
                email: emailError});
            return;
        }

        const userData = {name, phone, email}

        onConfirm(userData);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                setErrors((prevErrors) => ({ ...prevErrors, name: validateName(value) }));
                break;
            case 'phone':
                setPhone(value);
                setErrors((prevErrors) => ({ ...prevErrors, phone: validatePhone(value) }));
                break;
            case 'email':
                setEmail(value);
                setErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(value) }));
                break;
            default:
                break;
        }
    };

    return (
        <div className = 'Container'>
            <form onSubmit={handleConfirm} className='Form'>
                <label className='Lable' >Nombre
                    <input
                        className='Input'   
                        type = 'text'
                        value={name}
                        placeholder="Juan Perez"
                        onChange={handleChange}
                        name="name"
                        />
                    {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}

                </label>
                <label className='Lable'>Teléfono
                    <input
                        className='Input'   
                        type = 'text'
                        value={phone}
                        placeholder="1123456789"
                        onChange={handleChange}
                        name="phone"
                    />
                    {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}

                </label>
                <label> Email
                    <input
                        className='Input'   
                        type = 'text'
                        value={email}
                        placeholder="ejemplo@mail.com"
                        onChange={handleChange} 
                        name="email"
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </label>
                <button className='buttonSubmit' type = 'submit'>Confirmar compra</button>
            </form>
        </div>
    )
}

export default CheckoutForm