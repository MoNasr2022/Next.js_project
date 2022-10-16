import { MongoClient } from "mongodb";




// api/new-meetup
// POST/api/new-meetup

export default async function addMeetupHandler(req, res) {
    try {

        if (req.method === 'POST') {
            const data = req.body;

            const client = await MongoClient.connect('mongodb+srv://nasr:3344Moon@cluster0.sqhmhfd.mongodb.net/meetups?retryWrites=true&w=majority');
            const db = client.db();

            const meetupCollection = db.collection('meetups');
            const result = await meetupCollection.insertOne(data)

            client.close();
            res.status(201).json({ message: 'Meetup inserted!' });
        }

    } catch (error) {
    console.log(error)

    }
}
