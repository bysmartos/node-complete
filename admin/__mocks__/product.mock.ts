import casual from 'casual';
import IProduct from '../src/models/interfaces/product.interface';




 const fakeProduct: IProduct = {
    title: casual.title,
    desc: casual.description,
    img: casual.url,
    price: casual.random,
};

export default fakeProduct