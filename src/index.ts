import { User } from './models/User';

const testUser = new User({ name: 'myname', age: 20 });

testUser.on('change', event => {
    console.log('event', event);
});

testUser.trigger('change');
testUser.trigger('fakechange');

console.log(testUser);
