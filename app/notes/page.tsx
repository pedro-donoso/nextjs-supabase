'use client'

import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from 'react';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('notes').select();
      if (error) {
        console.error('Error fetching notes:', error);
      } else {
        setNotes(data);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
}