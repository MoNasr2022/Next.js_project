import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from 'next/head'


export default function NewMeetup() {
    const router = useRouter();

    async function addMeetupHandler(enterdMeetups) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enterdMeetups),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);

        router.push('/');
    };


    return (
        <>
            <Head>
                <title> Add New Meetup </title>
                <meta
                    name='NextJS Project'
                    content="Add your own  meetups "
                />
            </Head>

            <NewMeetupForm onAddMeetup={addMeetupHandler} />

        </>
    )
};




