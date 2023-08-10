import React from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react'; 
import { getCoursesBySlug } from '@/utils/api';
import DashboardLayout from '@/components/Dashboard/Dashboard';
import LmsHeading from '@/components/Dashboard/LmsHeading';
import LmsSideNav from '@/components/Dashboard/LmsSideNav';
import LmsContent from '@/components/Dashboard/LmsContent';

const CourseLMSPage = ({ course }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!course || undefined) {
    return <div>Course not found</div>;
  }

  return (
    <>
       { <DashboardLayout 
            heading={  <LmsHeading course={course}/>}
            categories={<LmsSideNav categories={course}/>}
            children={<LmsContent course={course}/>}
        />
        }
    </>
  )
};

export async function getServerSideProps({ params, req }) {
  // const session = await getSession({ req });

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/auth/signin', // Redirect to login page if not authenticated
  //       permanent: false,
  //     },
  //   };
  // }

  try {
    // Fetch course data by slug
    const course = await getCoursesBySlug(params.slug); // Implement your API fetch method

    if (!course) {
      return {
        notFound: true, // Return a 404 response if course is not found
      };
    }

    return { props: { course } };
  } catch (error) {
    // console.error(error);
    return { props: { course: null } };
  }
}

export default CourseLMSPage;
