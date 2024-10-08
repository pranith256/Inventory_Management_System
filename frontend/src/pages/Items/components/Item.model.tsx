 
import { Dialog } from 'primereact/dialog';
import { ErrorMessage, Field, Formik } from 'formik';
import * as yup from 'yup'
import {toast} from 'sonner'
import { useCreateItemMutation } from '../../../provider/queries/Items.query';
import { Button } from 'primereact/button';
const ItemModel = ({ visible, setVisible }:any) => {

  const [RegisterItem, RegisterItemResponse ] = useCreateItemMutation()
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    price: yup.number().typeError("Price must be a number").required("Price is required"),
    quantity: yup.number().typeError("Quantity must be a number").required("Quantity is required"),
    supplier_name: yup.string().required("SupplierName is required")
  });
  

  const initialValues = {
    name: '',
    price: '',
    quantity: '',
    supplier_name: '', // Optional field
  }
  

    const onSubmitHandler = async(e:any,{resetForm}:any)=>{
            try{
              // console.log(e)
              const {data,error }:any = await RegisterItem(e)

              if (error) {
                toast.error(error.data.message);
                return

              }



              toast.success(data.msg)
                resetForm()
                setVisible(false)
            }catch(e:any){
toast.error(e.message)
            }
    }

  return (
    <> 
        <Dialog draggable={false} header="Add Item" position='top' visible={visible} className=" w-full md:w-[70%] lg:w-1/2" onHide={() => setVisible(false)}>
         
        <Formik onSubmit={onSubmitHandler} initialValues={initialValues} validationSchema={validationSchema}>
            {({values,setFieldValue,handleSubmit})=>(
              <>  
                     <form onSubmit={handleSubmit} className="w-full" >
                   <div className="mb-3">
                        <label htmlFor="name">Item Name <span className="text-red-500 text-sm">*</span> </label>

                <Field name="name" id="name" type="text" placeholder='Enter Item Name' className="w-full my-2 border outline-none py-3 px-4" />
                        <ErrorMessage name='name' className='text-red-500 capitalize' component={'p'} />
                      </div>

              <div className="mb-3">
                <label htmlFor="price">Price <span className="text-red-500 text-sm">*</span> </label>

                <Field name="price" id="price" type="text" placeholder='Enter Item Price' className="w-full my-2 border outline-none py-3 px-4" />
                <ErrorMessage name='price' className='text-red-500 capitalize' component={'p'} />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity">Quantity <span className="text-red-500 text-sm">*</span> </label>

                <Field name="quantity" id="quantity" type="text" placeholder='Enter Item Quantity' className="w-full my-2 border outline-none py-3 px-4" />
                <ErrorMessage name='quantity' className='text-red-500 capitalize' component={'p'} />
              </div>

              
              <div className="mb-3">
                <label htmlFor="supplier_name">Supplier Name<span className="text-red-500 text-sm">*</span> </label>

                <Field as="textarea" rows={3} name="supplier_name" id="supplier_name" type="text" placeholder='Enter Supplier Name' className="w-full my-2 border outline-none py-3 px-4" />
                <ErrorMessage name='supplier' className='text-red-500 capitalize' component={'p'} />
              </div>
                      <div className="flex justify-end">
                  <Button loading={RegisterItemResponse.isLoading} className="text-white px-5 rounded-sm bg-indigo-500 py-3 text-center ">Add Item</Button>
                        </div>
                
                      </form>
              </>
            )}

        </Formik>

        </Dialog> 
    </>
  )
}

export default ItemModel