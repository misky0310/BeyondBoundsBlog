import React from 'react'

const ContentWrapper = ({children}) => {
  return (
    <div className='max-w-[960px] mx-auto md:p-0 p-6'>{children}</div>
  )
}

export default ContentWrapper