// import { ConfirmDialog } from 'primereact/confirmdialog';
// import {  useState } from 'react';
// import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
// import { toast } from 'sonner';
// import { Button } from 'primereact/button';
// import UpdateModel from './UpdateItem.model';
// import { useDeleteItemMutation } from '../../../provider/queries/Items.query';
// import { LuView } from 'react-icons/lu';

const ItemCard = ({ data, id }: any) => {
//   const [DeleteItem, DeleteItemResponse] = useDeleteItemMutation();
//   const [visible, setVisible] = useState(false); // For Update Model
//   const [visibleDelete, setVisibleDelete] = useState(false); // For Delete Confirmation

//   // Delete handler
//   const confirmDeleteHandler = async (_id: string) => {
//     try {
//       const { data, error }: any = await DeleteItem(_id);

//       if (error) {
//         toast.error(error.data.message);
//         return;
//       }

//       toast.success(data.msg);
//       setVisibleDelete(false); 
//     } catch (e: any) {
//       toast.error(e.message);
//     }
//   };

  return (
    <>
      <tr className="bg-white border-b">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {id}
        </th>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {data.name}
        </th>
        <td className="px-6 py-4">${data.price}</td>
        <td className="px-6 py-4">{data.quantity}</td>
        {/* <td className="px-6 py-4">
        <button
                        onClick={() => setVisible(!visible)}
                        title="View"
                        className="p-4 bg-teal-500 text-white rounded-sm mx-2"
                    >
                        <LuView className="text-xl" />
                    </button>
          <button
            onClick={() => setVisible(!visible)}
            title="Edit"
            className="p-4 bg-orange-400 text-white rounded-sm mx-2"
          >
            <FaRegEdit className="text-xl" />
          </button>

          {/* Button for deleting the item */}
          {/* <Button
            loading={DeleteItemResponse.isLoading}
            onClick={() => {setVisibleDelete(true)
                                console.log(data)}}// Set the visibility of the delete confirmation dialog
            title="delete"
            className="p-4 bg-red-500 text-white rounded-sm mx-2"
          >
            <FaRegTrashAlt className="text-xl" />
          </Button>
        </td> */} 
      </tr>

      {/* Update Item Modal */}
      {/* <UpdateModel visible={visible} setVisible={setVisible} _id={data._id} /> */}

      {/* Delete Confirmation Dialog */}
      {/* <ConfirmDialog
        visible={visibleDelete}
        onHide={() => setVisibleDelete(false)}
        message="Do you want to delete this record?"
        header="Delete Confirmation"
        icon="pi pi-info-circle"
        acceptClassName="p-button-danger"
        accept={() => confirmDeleteHandler(data._id)} 
        reject={() => setVisibleDelete(false)} 
      /> */}
    </>
  );
};

export default ItemCard;
