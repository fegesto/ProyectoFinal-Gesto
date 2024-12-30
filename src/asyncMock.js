const products = [
    {
        id: '1',
        name: 'Almohadon Matero',
        price: 25000,
        category: 'Almohadones',
        img: 'https://github.com/fegesto/artesaniasPatryAppe/blob/main/images/almohadonMatero.jpeg?raw=true',
        stock: 4,
        description: 'Almohadon matero hecho en tela impermeable'
    },
    {
        id: '2',
        name: 'Amigurumi Minion',
        price: 25000,
        category: 'Amigurimis',
        img: 'https://github.com/fegesto/artesaniasPatryAppe/blob/main/images/amigurumiMinion.jpeg?raw=true',
        stock: 6,
        description: 'Amigurumis de Minion'
    },
    {
        id: '3',
        name: 'Amigurumi Hedwig',
        price: 28000,
        category: 'Amigurimis',
        img: 'https://github.com/fegesto/artesaniasPatryAppe/blob/main/images/amigurumiLechuza.jpeg?raw=true',
        stock: 4,
        description: 'Amigurumis de Hedwig'
    },
    {
        id: '4',
        name: 'Amigurumi Grogu',
        price: 35000,
        category: 'Amigurimis',
        img: 'https://github.com/fegesto/artesaniasPatryAppe/blob/main/images/amigurumiGrogu.jpeg?raw=true',
        stock: 2,
        description: 'Amigurumis de Grogu o Baby Yoda'
    },
    {
        id: '5',
        name: 'Sahumerios citronella',
        price: 8000,
        category: 'Sahumerios',
        img: 'https://github.com/fegesto/artesaniasPatryAppe/blob/main/images/sahumerios.jpeg?raw=true',
        stock: 15,
        description: 'Sahumerios de citronella por 12 unidades'
    }
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
        })
}

export const getProductById = (productId) => {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === productId))
}, 500)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
}, 500)
    })
}