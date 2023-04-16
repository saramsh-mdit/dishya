import React from 'react'

const PageWrapper = ({ children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full bg-gray-50 p-4'>
      <section className='max-w-3xl mx-auto w-full bg-white' style={{minHeight:"400px"}}>
        {children}
      </section>
    </div>
  );
}

export default PageWrapper