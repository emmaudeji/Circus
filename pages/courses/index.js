import Content from '@/components/Dashboard/Content'
import DashboardLayout from '@/components/Dashboard/Dashboard'
import SideNav from '@/components/Dashboard/SideNav'
import HeadSEO from '@/components/Layout/HeadSEO'
import PageHeroBanner from '@/components/Section/PageHeroBanner'
import { courseCategories } from '@/data/courseCategories'
import { courses } from '@/data/courses'
import CourseFilters from '@/components/Dashboard/CourseFilter'

const index = () => {

     // Your initial course data
  const initialCourses = [] // Use 'allCourses' instead of the previous 'courses'



  return (
    <>
        <HeadSEO title={'Circus-courses'}/>

        <PageHeroBanner/>
        <DashboardLayout 
            heading={  <CourseFilters/>}
            categories={<SideNav categories={courseCategories}/>}
            children={<Content courses={courses}/>}
        />
    
    </>
  )
}

export default index