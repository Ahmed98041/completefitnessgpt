import { useRouter } from 'next/router'; // Import useRouter
import { useEffect, useState } from 'react';// Import useState and useEffect hooks
import RootLayout from '../app/layout';  
import { Progress } from '@/components/ui/progress';

function ResultsPage() {
  const router = useRouter(); // Initialize useRouter
  const [data, setData] = useState(null); // Initialize a state variable to hold the data
  const [loading, setLoading] = useState(true); // Initialize a state variable to manage the loading state

  useEffect(() => {
    if (router.isReady) { // Check if the router is ready to ensure query params are available
      const queryData = router.query.data; // Get the data from the query params
      if (queryData && typeof queryData === 'string') { 
        setData(JSON.parse(queryData)); // Parse the JSON data and set it to the state variable
        setLoading(false); // Set loading to false once data is set
      }
    }
  }, [router.isReady, router.query]);

  return (
    <RootLayout>
      {loading ? (
        <div>
          <Progress /> {/* Display the progress bar while loading */}
          <div>Loading...</div>
        </div>
      ) : (
        <div>
          <h1>Results</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the data in a preformatted text */}
        </div>
      )}
    </RootLayout>
  );
}

export default ResultsPage;
