/**
 * User model
 *
 * MOCK USER MODEL
 * This should be handled by the DB api
 */

// Mock user list
const mockUserList = [
  {
    id: '4d97611a-4b4f-4462-90c1-145589f7d55b',
    username: 'devinaldy',
    email: 'devinaldy@cmail.com',
    password: '$2a$10$aIdNtRpqqutYHYICMT3G1eFWR.ephxgq8/NV24lcyEYCPWFXUSkoi' // howdy
  }
];

const User = {
  findOne({ email }, cb) {
    const user = mockUserList.find(user => user.email === email);

    return user ? cb(null, user) : cb('No matching user found', null);
  }
};

export default User;
