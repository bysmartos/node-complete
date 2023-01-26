import casual from 'casual';
import IUser from '../src/models/interfaces/user.interface';




 const fakeUser: IUser = {
    username:casual.username,
    email: casual.email,
    password: casual.password,
    isAdmin: false
};

export default fakeUser