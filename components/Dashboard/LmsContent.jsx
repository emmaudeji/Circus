import React from 'react'

const LmsContent = ({course}) => {
  return (
    <>
        <div className="w-full h-96 pb-6 overflow-hidden">
            <img src={'/a'} alt={course.title}  />
        </div>
        <h4 className='text-medium font-medium'>{course.description}</h4>

        
    </>
  )
}

export default LmsContent