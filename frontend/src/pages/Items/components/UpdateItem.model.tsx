 
import * as yup from 'yup';
import { ErrorMessage, Field, Formik } from 'formik'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { toast } from 'sonner';
import {  useGetItemByIdQuery, useUpdateItemMutation} from '../../../provider/queries/Items.query';
import Loader from '../../../components/Loader'; 
const UpdateModel = ({ visible ,setVisible,_id}:any) => {

    
    const {isLoading,data } = useGetItemByIdQuery(_id)
            console.log(data);
    const [updateItem,updateConsumerResponse] = useUpdateItemMutation()       
    if (isLoading){
                return <Loader/>
    }

    const validationSchema = yup.object({
      name: yup.string().required("Name is required"),
      price: yup.number().typeError("Price must be a number").required("Price is required"),
      quantity: yup.number().typeError("Quantity must be a number").required("Quantity is required"),
      supplier_name: yup.string().required("SupplierName is required")
    });
    
  
    const initialValues = {
      name: data.item.name,
      price: data.item.price,
      quantity: data.item.quantity,
      supplier_name: data.item.supplier_name,
    }


    const onSubmitHandler = async (e: any, { setValues }: any) => {
        try {
            console.log(e)
            const { data, error }: any = await updateItem({ data: e,_id: _id, })

            if (error) {
                toast.error(error.data.message);
                return

            }


            setValues({
                name: e.name,
                price: e.price,
                quantity: e.quantity,
                supplier_name: e.supplier_name,
            })

            toast.success(data.msg)
            // resetForm()
            setVisible(false)
        } catch (error: any) {
            console.log(error);
            
            toast.error(error.message)
        } 
    }

  return (
    <>
    

          <Dialog draggable={false} visible={visible} className=' w-[90%] mx-auto lg:mx-0 lg:w-1/2' onHide={() => setVisible(false)}>

              <Formik onSubmit={onSubmitHandler} initialValues={initialValues} validationSchema={validationSchema}>
                  {({ handleSubmit }) => (
                      <>
                          <form onSubmit={handleSubmit} className="w-full" >
                              <div className="mb-3">
                                  <label htmlFor="name">Item Name <span className="text-red-500 text-sm">*</span> </label>

                                  <Field name="name" id="name" type="text" placeholder='Enter Item Name' className="w-full my-2 border outline-none py-3 px-4" />
                                  <ErrorMessage name='name' className='text-red-500 capitalize' component={'p'} />
                              </div>

                              <div className="mb-3">
                                  <label htmlFor="price">Item Price <span className="text-red-500 text-sm">*</span> </label>

                                  <Field name="price" id="price" type="number" placeholder='Enter Item Price' className="w-full my-2 border outline-none py-3 px-4" />
                                  <ErrorMessage name='price' className='text-red-500 capitalize' component={'p'} />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="quantity">Item Quantity<span className="text-red-500 text-sm">*</span> </label>

                                  <Field name="quantity" id="quantity" type="number" placeholder='Enter Item Quantity' className="w-full my-2 border outline-none py-3 px-4" />
                                  <ErrorMessage name='quantity' className='text-red-500 capitalize' component={'p'} />
                              </div>


                              <div className="mb-3">
                                  <label htmlFor="supplier_name">Supplier Name<span className="text-red-500 text-sm">*</span> </label>

                                  <Field as="textarea" rows={3} name="supplier_name" id="supplier_name" type="text" placeholder='Enter Supplier Name' className="w-full my-2 border outline-none py-3 px-4" />
                                  <ErrorMessage name='supplier_name' className='text-red-500 capitalize' component={'p'} />
                              </div>
                              <div className="flex justify-end">
                                  <Button
                                      loading={updateConsumerResponse.isLoading} 
                                      className="text-white px-5 rounded-sm bg-indigo-500 py-3 text-center ">Update Item</Button>
                              </div>

                          </form>
                      </>
                  )}

              </Formik>


          </Dialog>
    </>
  )
}

export default UpdateModel