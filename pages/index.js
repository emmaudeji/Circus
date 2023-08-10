import Head from 'next/head'

import Search from '@/components/Search'
import HeroSection from '@/components/Section/HeroBanner'
import CredibilitySection from '@/components/Section/CredibilitySection'
import FeaturedCoursesSection from '@/components/Section/FeaturedCourseSection'
import CourseCategoriesSection from '@/components/Section/CourseCategorySection'
import HighlightsSection from '@/components/Section/HighlightsSection'
import LearningFormatsSection from '@/components/Section/LearningFormatSection'
import GettingStartedSection from '@/components/Section/GettingStartedSection'
import BlogSection from '@/components/Section/BlogSection'
import HeadSEO from '@/components/Layout/HeadSEO'
import { BigCircle } from '@/components/Shapes/BigCircle'


export default function Home() {
  return (
    <>
      <HeadSEO/>

      <HeroSection/>
      <CredibilitySection/>
      <FeaturedCoursesSection/>
      <CourseCategoriesSection/>
      <HighlightsSection/>
      <LearningFormatsSection/>
      <GettingStartedSection/>
      <BlogSection/>
      <BigCircle/>

      
    </>
  )
}
