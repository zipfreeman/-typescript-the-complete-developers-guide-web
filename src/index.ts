import { User } from './models/User';

const testUser = new User({ id: 1, name: 'Dr. Boogaloo', age: 20 });

console.log('new user', testUser.get('name'));
console.log('change event added');
testUser.on('change', event => {
    console.log('trigger', event);
});

testUser.trigger('change');

console.log('set id', testUser.set({ name: 'dr. nobody' }));
// const testUser2 = new User({ name: 'Dr. martin', age: 400 });

// testUser.save();
// testUser2.save();
