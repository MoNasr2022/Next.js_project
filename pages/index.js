import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head'





export default function HomePage(props) {
    // const [loadedMeetups, setLoadedMeetups] = useState([])

    // useEffect(() => {
    //     //fetch data
    //     setLoadedMeetups(dummy_meetups)
    // }, [])



    return (
        <>
            <Head>
                <title> NextJS Demo Project </title>
                <meta
                    name='NextJS Project'
                    content="A small NextJS project fot creating meetups!"
                />
            </Head>
        <MeetupList meetups={props.meetups} />
        </>
    );
};


// export async function getServerSideProps ( context ) {
//     // fetch the data from the server
//     const req = context.req;
//     const res = context.res;


//     return{
//         props:{
//             meetups:dummy_meetups
//         }
//     }
// };

export async function getStaticProps() {
    // fetch data from api

    const client = await MongoClient.connect('mongodb+srv://nasr:3344Moon@cluster0.sqhmhfd.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const results = await meetupCollection.find().toArray();
    const meetups = results.map((meetup) => ({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id:meetup._id.toString(),

    }))

    client.close();



    return {
        props: {
            meetups: meetups
        },
        revalidate: 10  //revalidat the data on the server every 10 secs
    }
};