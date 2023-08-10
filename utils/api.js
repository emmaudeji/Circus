import { courses } from "@/data/courses";
import { featuredCoursesData } from "@/data/featuredCoursesData";
export const getCoursesBySlug = (param) => {

    const course = [...featuredCoursesData, ...courses]?.find(course => course.title === param);
    return course;
}