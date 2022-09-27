import React from 'react'

export default function UpdateCategory() {
  return (
    <>
      <h2 className='page-title'>Update Category</h2>
      <td className='text-center'>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#updateModal${category.id}`}>
          Update
        </button>
        <div className="modal fade" id={`updateModal${category.id}`} tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Category - {category.name}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label" style={{ textAlign: "left" }}>Name</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" name="name" value={category.name} />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label" style={{ textAlign: "left" }}>Description</label>
                    <div className="col-sm-10">
                      <input type="password" className="form-control" name="desc" value={category.desc} />
                    </div>
                  </div>
                  <div className='d-flex justify-content-end'>
                    <button type="button" className="btn btn-secondary me-1" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <button className={category.status === true ? 'btn btn-danger ms-1 me-1' : "btn btn-success ms-1 me-1"}>{category.status === true ? "Lock" : "Unlock"}</button>
      </td>
    </>
  )
}
