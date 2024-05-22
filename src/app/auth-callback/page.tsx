import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client";

const Page=()=>{
  const router=useRouter()
  const searcParams=useSearchParams();
  const origin =searcParams.get('origin');

  const query = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  });
  
  // Check for errors in the query result
  if (query.error) {
    const errData = query.error.data;
    if (errData?.code === 'UNAUTHORIZED') {
      router.push('/sign-in');
    } else {
      // Handle other types of errors
      console.error("An error occurred:", query.error);
    }
  }
  
  // Continue with other logic based on the query result
  if (query.isSuccess) {
    router.push(origin ? `/${origin}` : '/dashboard');
  }

}

export default Page