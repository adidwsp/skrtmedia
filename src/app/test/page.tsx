import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Breadcrumb from "@/components/Common/Breadcrumb";

export async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: events, error } = await (await supabase).from('events').select('*');

  if (error) {
    console.error("Supabase error:", error);
    return <div>Error fetching Events</div>;
  }

  return (
    <div>
      <h1>Test Database</h1>
      <ul>
        {events?.map((event: any) => (
          <li key={event.id}>
            <strong>{event.title}</strong> — {event.description }
          </li>
        ))}
      </ul>
    </div>
  );
}



const TestPage = () => {

  return (
    <>
      <Breadcrumb
        pageName="Halaman Test Database"
        description=""
      />
      <h1>Test Database</h1>
      {Page()}
    </>
  );
}

export default TestPage;
