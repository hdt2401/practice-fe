import React, { useEffect, useState } from 'react';
import CategoryService from '../../services/category.service';
import moment from 'moment';
import { Link } from "react-router-dom";

function Index(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryService.getCategories()
      .then(data => {
        setCategories(data.data);
      })
      .then(err => {
        console.log(err);
      })
  }, [])
  console.log(categories);
  // const 
  const handleLock = (id) => {
    CategoryService.lockCategory(id)
      .then((data)=>console.log(data.message))
      .catch(err=>console.log(err))
  }

  return (
    <>
      <h2 className="page-title">Manage Categories</h2>
      <Link to="/CreateCategory">Create a new category</Link>

      <table className="table table-striped table-bordered">
        <thead>
          <tr className='text-center'>
            <th>STT</th>
            <th>Name</th>
            <th>Description</th>
            <th>Create At</th>
            <th>Update At</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map((category, index) =>
            (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.desc}</td>
                <td>{moment(category.createdAt).format('DD-MM-YYYY, h:mm:ss a')}</td>
                <td>{moment(category.updatedAt).format('DD-MM-YYYY, h:mm:ss a')}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => handleLock(category.id)}>Lock</button>
                </td>

              </tr>
            )
            )
          }
        </tbody>
      </table>
    </>
  );
}

export default Index;