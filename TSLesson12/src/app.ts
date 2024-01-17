import _ from 'lodash';

const products = [{title: 'A Carpet', price: 29.99}, {title: 'A Book', price: 10.99}];


const loadedProducts = products.map(prod => {
    return new Product(prod.title, prod.price);
});

for (const prod of loadedProducts) {
    console.log(prod.getInformation());
}


console.log(_.shuffle([1, 2, 3]));