import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head'
import MeetupDetail from "../../components/meetups/MeetupDetail";



export default function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title> {props.meetupData.title} </title>
                <meta
                    name='NextJS Project'
                    content={props.meetupData.description}
                />
            </Head>

            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    )
};

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://nasr:3344Moon@cluster0.sqhmhfd.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
    client.close();


    return {
        fallback: false,
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    //fetch data for single meetup
    const { meetupId } = context.params;

    const client = await MongoClient.connect('mongodb+srv://nasr:3344Moon@cluster0.sqhmhfd.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.findOne({ _id: ObjectId(meetupId) });
    client.close();

    return {

        props: {
            meetupData: {
                id: meetups._id.toString(),
                title: meetups.title,
                address: meetups.address,
                image: meetups.image,
                description: meetups.description
            },
        },
        revalidate: 10
    }
}