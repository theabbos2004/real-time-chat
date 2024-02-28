import { Formik } from 'formik'
import React from 'react'
import { createChat } from '../../../Hook/Api/ChatApi'
import { useDispatch, useSelector } from 'react-redux'
import { AddChatModal } from '../../../Reducer/ChatReducer'

export default function CreateChatModal() {
    const username=useSelector(store=>store?.authStore?.user?.username)
    const uid=useSelector(store=>store?.authStore?.user?.uid)
    const dispatch=useDispatch()
  return (
    <div 
    className={`modal d-flex justify-content-center align-items-center `} 
    style={{backgroundColor:"rgba(0,0,0,0.8)"}}
  >
    <div className="modal-dialog" style={{minWidth:"25%"}}>
      <div className="modal-content" style={{backgroundColor:"rgba(173, 173, 173, 0.8)"}}>
        <div className="modal-header">
          <h5 className="modal-title text-light">Chat add</h5>
          <button type="button" className="btn-close" onClick={()=>dispatch(AddChatModal(false))}></button>
        </div>
        <Formik
          initialValues={{ title: '' }}
          onSubmit={(values,{setSubmitting,resetForm}) => {
            createChat({username,usersecret:uid,title:values.title})
            dispatch(AddChatModal(false))
            setSubmitting(false)
            resetForm({
              values: { title:""},
            });
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <input type="text" className="form-control text-black" style={{backgroundColor:"rgb(200,200,200)",border:"none"}} placeholder='Enter title' min="1"
                  name='title'
                  value={values.title}
                  onChange={handleChange}
                  />
              </div>
              <div className="modal-footer d-flex justify-content-end align-items-center">
                <button type="submit" disabled={isSubmitting} className="btn text-white bg-success" style={{backgroundColor:"var(--chat-bg-color)",border:"none"}}>Create chat</button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  </div>
  )
}
