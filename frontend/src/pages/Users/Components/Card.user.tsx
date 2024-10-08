import { ConfirmDialog } from 'primereact/confirmdialog';
import { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { LuView } from 'react-icons/lu';
import { useDeleteConsumerMutation } from '../../../provider/queries/Users.query';
import { toast } from 'sonner';
import { Button } from 'primereact/button';
import UpdateModel from './UpdateModel.user';

const TableCard = ({ data, id }: any) => {
    const [DeleteConsumer, DeleteConsumerResponse] = useDeleteConsumerMutation();

    const [visible, setVisible] = useState(false); // Controls the update modal visibility
    const [visibleDelete, setVisibleDelete] = useState(false); // Controls the delete confirmation dialog visibility

    const confirmDeleteHandler = async (_id: string) => {
        try {
            const { data, error }: any = await DeleteConsumer(_id);

            if (error) {
                toast.error(error.data.message);
                return;
            }

            toast.success(data.msg);
            setVisibleDelete(false); 
        } catch (e: any) {
            toast.error(+e.message);
        }
    };

    return (
        <>
            <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {id}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {data.name}
                </th>
                <td className="px-6 py-4">{data.email}</td>
                <td className="px-6 py-4">{data.mobile}</td>
                <td className="px-6 py-4">
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

                    {/* Button to trigger the delete confirmation dialog */}
                    <Button
                        loading={DeleteConsumerResponse.isLoading}
                        onClick={() => setVisibleDelete(true)} // Show the delete confirmation dialog
                        title="delete"
                        className="p-4 bg-red-500 text-white rounded-sm mx-2"
                    >
                        <FaRegTrashAlt className="text-xl" />
                    </Button>
                </td>
            </tr>

            {/* Update Item Modal */}
            <UpdateModel visible={visible} setVisible={setVisible} _id={data._id} />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                visible={visibleDelete} // Bind the visibility state
                onHide={() => setVisibleDelete(false)} // Close the dialog on hide
                message="Do you want to delete this record?"
                header="Delete Confirmation"
                icon="pi pi-info-circle"
                acceptClassName="p-button-danger"
                accept={() => confirmDeleteHandler(data._id)} // Call delete handler on accept
                reject={() => setVisibleDelete(false)} // Close the dialog on reject
            />
        </>
    );
};

export default TableCard;
