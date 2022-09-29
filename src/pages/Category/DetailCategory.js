import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CategoryService from '../../services/category.service';
import { Link } from 'react-router-dom';
export default function DetailCategory() {
  const [category, setCategory] = useState({});
  const { id } = useParams();
  useEffect(() => {
    CategoryService.getCategoryDetail(id)
      .then(data => setCategory(data.data))
      .catch(err => console.log(err))
  }, [id]);
  console.log(category);
  return (
    <div>
      <h2 className='page-title'>{category.name}</h2>
      <Link to="/categories">Back</Link>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={category.name} />
      </div>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">Desc</label>
        <textarea
          className="form-control"
          id="desc"
          name="desc"
          value={category.desc}
          rows="3"></textarea>
      </div>
      <div className="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="status" id="locked" checked={category.status === true}/>
          <label class="form-check-label" for="locked">
            Lock
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="status" id="unlocked" checked={category.status === false}/>
          <label class="form-check-label" for="unlocked">
            Unlock
          </label>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Created Date</label>
        <input
          type="text"
          className="form-control"
          value={category.createdAt} />
      </div>
      <div className="mb-3">
        <label className="form-label">Updated Date</label>
        <input
          type="text"
          className="form-control"
          value={category.updatedAt} />
      </div>
    </div>
  )
}
