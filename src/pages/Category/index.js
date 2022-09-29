import React, { useEffect, useState } from 'react';
import CategoryService from '../../services/category.service';
import moment from 'moment';
import { Link } from "react-router-dom";

function Index(props) {
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    function fetchData(){
      CategoryService.getCategories()
      .then(data => {
        setCategories(data.data);
      })
      .catch(err => {
        console.log(err);
      });
    }
    fetchData();
  }, [update])
  // const 
  const handleLock = (category) => {
    const id = category.id;
    const name = category.name;
    let result = window.confirm(`Are you sure to lock ${name}?`);

    if (result){
      CategoryService.lockCategory(id)
        .then(() => {
          setUpdate(!update)
        })
        .catch(err => console.log(err))
    }
  }
  const handleUnLock = (category) => {
    const id = category.id;
    const name = category.name;
    let result = window.confirm(`Are you sure to unlock ${name}?`);

    if (result){
      CategoryService.unlockCategory(id)
        .then(() => {
          setUpdate(!update)
        })
        .catch(err => console.log(err))
    }
  }
  console.log(update);
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
                <td>
                  <Link to={`/categories/${category.id}`}>{category.name}</Link>
                </td>
                <td>{category.desc}</td>
                <td>{moment(category.createdAt).format('DD-MM-YYYY, h:mm:ss a')}</td>
                <td>{moment(category.updatedAt).format('DD-MM-YYYY, h:mm:ss a')}</td>
                <td>
                  {
                    category.status === true ? (<button className='btn btn-danger' onClick={() => handleLock(category)}>Lock</button>)
                      : (<button className='btn btn-success' onClick={() => handleUnLock(category)}>UnLock</button>)
                  }

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