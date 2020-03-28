import { User } from './models/User';

const testUser = new User({ id: 1, name: 'Dr. Boogaloo', age: 20 });
console.log('testUser', testUser.data);
console.log("testUser get 'name'", testUser.get('name'));
console.log('change event added');
testUser.on('change', event => {
    console.log('trigger', event);
    console.log("testUser 'name'", testUser.get('name'));
});

testUser.trigger('change');

console.log('set id', testUser.set({ name: 'dr. nobody' }));
