import { User } from './models/User';

globalThis.testUser = new User({ id: 1, name: 'Dr. Boogaloo', age: 20 });

const { testUser }: any = globalThis;

globalThis.testUserAll = () => {
    console.log('::: testUser', testUser.data);
    console.log("testUser get 'name'", testUser.get('name'));
    console.log('change event added');
    testUser.on('change', event => {
        console.log('trigger', event);
        console.log("testUser 'name'", testUser.get('name'));
    });

    testUser.trigger('change');
    (async function() {
        const response = await testUser.fetch();
        console.log('testUser.fetch', response);

        const responseSave = await testUser.save();
        console.log('testUser.save', responseSave);
        console.log('::: testUser', testUser.data);
    })();
};
