import { User } from './models/User';

const testUser = new User({ id: 1, name: 'Dr. Boogaloo', age: 20 });
// const testUser2 = new User({ name: 'Dr. martin', age: 400 });

// testUser.save();
// testUser2.save();

testUser.set({ id: 3, age: 5, name: 'boobooo' });

testUser.on('change', event => {
    console.log('trigger', event);
});

testUser.trigger('change');

console.log('testUser', testUser);
