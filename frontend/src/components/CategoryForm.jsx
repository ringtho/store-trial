import React from 'react'

const CategoryForm = ({ value, setValue, handleSubmit, buttonText='Submit', handleDelete }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Please provide a category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div>
            <button>{buttonText}</button>

            {
             handleDelete && (
                <button onClick={handleDelete}>Delete</button>
             )   
            }
        </div>
      </form>
    </div>
  )
}

export default CategoryForm