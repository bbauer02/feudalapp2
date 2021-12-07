import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { verify, sign } from '../utils/jw';
//
import mock from './mock';

// ----------------------------------------------------------------------

const JWT_SECRET = 'minimal-secret-key';
const JWT_EXPIRES_IN = '5 days';

const users = [
  {
    id: 1,
    password: 'admin',
    email: 'admin@email.com',
    firstname: 'Bauer',
    lastname: 'Baptiste',
    roles: 'ADMIN',
    association: 'DGDA',
    displayname: 'Ingelran_couciaci',
    createdAt: '2021-04-24T22:29:26.318Z',
    is_verified: 1,
    birthday: '1982-08-04',
    phone: '0278245754',
    emergency_contact: 'Alexis Bauer',
    healthy_troubles: 'Allergie à la pénnisciline',
    avatar: 'https://cdn.fakercloud.com/avatars/_victa_128.jpg',
    characters: {
      id: 2,
      isValid: false,
      role: {
        id: 2,
        label: 'Soldat'
      },
      name: 'Japhet',
      biography:
        'Facilis quisquam aliquam magni. Consequatur quia velit et harum dolor quia atque sit officiis. Quibusdam saepe tempora culpa exercitationem debitis exercitationem quod. Architecto culpa ab magnam molestiae. Sed animi officia praesentium.\n \rDoloribus quam perferendis temporibus voluptas qui et fugiat. Dolor qui qui id delectus reprehenderit omnis. Numquam tempora illum rerum at similique aliquam sed. Dolore alias est quisquam voluptatem. Iusto non iste dolorem autem. Nihil est earum dolor laborum qui laborum atque cupiditate.\n \rMagni voluptas reprehenderit ducimus quia sint ut possimus. Et ut magnam aut alias aspernatur vel quidem. Rerum consequatur rerum perspiciatis dolores eos et doloribus ipsum ut. At perferendis dolor fuga dolorem eum.\n \rOfficia molestiae officiis quo. Architecto voluptates reprehenderit dignissimos neque aut iste et voluptatum. Aut dolor qui neque ut qui laborum non.\n \rIusto quia et enim magni sunt quae sit omnis. Rerum sint sed earum ea sit nobis. Temporibus cupiditate a quia quibusdam porro quia.\n \rTempore doloribus cumque reprehenderit dolor itaque placeat quae incidunt. Explicabo optio molestiae aut eveniet. Repudiandae illo culpa recusandae quaerat quia est ratione ut. Veritatis est eius consequatur maiores.\n \rVoluptatem id eos. Maiores provident sed rerum officia nihil dignissimos consectetur accusantium. Asperiores temporibus aut illum rerum quas et quidem eum.\n \rEt corporis numquam nesciunt provident incidunt. Sunt architecto facere praesentium sit sit recusandae nostrum. Quia vitae provident vel et laboriosam.\n \rPraesentium maiores qui est eum asperiores dolorum. Quos quidem rerum delectus. Rerum corrupti et qui. Aut rerum deleniti quisquam tempora omnis impedit perferendis. Culpa ipsa quo occaecati ut nulla ex. Ut doloribus doloremque repellendus.\n \rVeniam neque numquam totam facilis. Voluptatem et ipsum est corporis cupiditate. Ut molestiae cumque quia minus sint et. Quia consequatur ipsum est officia quis aut ut. Qui est eos unde dolorem accusamus deleniti error sunt.',
      pictures: [
        'http://placeimg.com/640/480',
        'http://placeimg.com/640/480',
        'http://placeimg.com/640/480',
        'http://placeimg.com/640/480'
      ]
    },
    emergency_phone: '0323522248'
  }
];
//----------------------------------------------------------------------
mock.onPost('/api/account/register').reply(async (config) => {
  try {
    const newUser = JSON.parse(config.data);
    let user = users.find((_user) => _user.email === newUser.email);
    const createdAt = moment().format();
    if (user) {
      return [400, { message: 'There already exists an account with the given email address.' }];
    }

    user = {
      id: uuidv4(),
      password: newUser.password,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      roles: 'USER',
      association: newUser.association,
      displayname: newUser.displayname,
      createdAt,
      is_verified: 0,
      birthday: newUser.birthday,
      phone: newUser.phone,
      emergency_contact: newUser.emergency_contact,
      healthy_troubles: newUser.healthy_troubles,
      avatar: '',
      emergency_phone: newUser.emergency_phone
    };

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [200, { accessToken, user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

//----------------------------------------------------------------------

mock.onPost('/api/account/login').reply(async (config) => {
  try {
    const { email, password } = JSON.parse(config.data);
    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return [400, { message: 'There is no user corresponding to the email address.' }];
    }

    if (user.password !== password) {
      return [400, { message: 'Wrong password' }];
    }

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
    return [200, { accessToken, user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

//----------------------------------------------------------------------

mock.onGet('/api/account/my-account').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const data = verify(accessToken, JWT_SECRET);
    const userId = typeof data === 'object' ? data?.userId : '';
    const user = users.find((_user) => _user.id === userId);
    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [200, { user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
