import React from 'react'

const Comments = () => {
  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        <h2 className='text-2xl font-bold text-indigo-800 mb-4'>Comments</h2>
        <div className='bg-white rounded-lg shadow p-6'>
          <p className='text-gray-600'>No comments yet. Be the first to comment!</p>
        </div>
      </div>
    </>
  )
}

export default Comments