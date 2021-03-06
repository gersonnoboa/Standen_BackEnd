const {MongoClient} = require('mongodb');

describe("Tournaments", () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__);
        db = await connection.db(global.__MONGO_DB_NAME__);
    });
    
    afterAll(async () => {
        await connection.close();
        await db.close();
        mongoose.disconnect();
    });

    it('should insert a doc into collection', async () => {
        const users = db.collection('users');
    
        const mockUser = {_id: 'some-user-id', name: 'John'};
        await users.insertOne(mockUser);
    
        const insertedUser = await users.findOne({_id: 'some-user-id'});
        expect(insertedUser).toEqual(mockUser);
    });
});