import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import CategoryService from '../../services/category.service';
import { useNavigate } from 'react-router-dom';

export default function CreateCategory() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required!"),
      desc: Yup.string()
        .required("Required!"),
    }),
    onSubmit: values =>{
      CategoryService.createCategory(values)
      .then(
        ()=>navigate("/categories")
      )
      .catch(err=>{
        console.log(err)
      })
      console.log(values);
    }
  });

  return (
    <>
      <h3 className='block-title mb-3 text-center'>Create A new Category</h3>
      <form onSubmit={formik.handleSubmit} style={{width:"50rem", margin:"0 auto"}}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <label htmlFor="floatingInput">Name</label>
          {formik.errors.name && formik.touched.name && (<p className='invalid-feedback'>{formik.errors.name}</p>)}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingPassword"
            name="desc"
            value={formik.values.desc}
            onChange={formik.handleChange}
          />
          <label htmlFor="floatingPassword">Description</label>
          {formik.errors.desc && formik.touched.desc && (<p className='invalid-feedback'>{formik.errors.desc}</p>)}
        </div>
        <div className='d-flex justify-content-between align-item-center'>
          <button className='btn btn-outline-primary' onClick={()=>navigate("/categories")}>Cancel</button>
          <button type="submit" className='btn btn-primary'>Submit</button>
        </div>
      </form>
    </>
  )
}
