import { useState } from "react";
import './CheckoutForm.css'


const CheckoutForm = ({onConfirm}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleConfirm = (event) => {
        event.preventDefault();

        const userData = {name, phone, email}

        onConfirm(userData);
    }

    return (
        <div className = 'Container'>
            <form onSubmit={handleConfirm} className='Form'>
                <label className='Lable' >Nombre
                    <input
                        className='Input'   
                        type = 'text'
                        value={name}
                        onChange={({target}) => setName(target.value)}
                    />
                </label>
                <label className='Lable'>Teléfono
                    <input
                        className='Input'   
                        type = 'text'
                        value={phone}
                        onChange={({target}) => setPhone(target.value)}
                    />
                </label>
                <label> Email
                    <input
                        className='Input'   
                        type = 'text'
                        value={email}
                        onChange={({target}) => setEmail(target.value)}    
                    />
                </label>
                <button className='buttonSubmit' type = 'submit'>Confirmar compra</button>
            </form>
        </div>
    )
}

export default CheckoutForm