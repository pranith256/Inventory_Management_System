import { useState } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useArchiveItemMutation } from '../../../provider/queries/Items.query'; // Assuming you have this hook
import { toast } from 'sonner';

const ArchiveModel = ({ visible, setVisible, _id }: any) => {
    const [archiveQuantity, setArchiveQuantity] = useState(0); // To capture the quantity being archived
    const [ArchiveItem, ArchiveItemResponse] = useArchiveItemMutation(); // Archive API

    // Archive handler
    const handleArchive = async () => {
        try {
            if (archiveQuantity <= 0) {
                toast.error('Please enter a valid quantity.');
                return;
            }
            const { data, error }: any = await ArchiveItem({ data: { quantity: archiveQuantity }, _id });
            if (error) {
                throw new Error(error.data.message);
            }
            toast.success(data.msg);
            setVisible(false); // Close the modal after success
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <>
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message={
                    <div className="flex flex-col gap-2">
                        {/* <p className="text-lg font-medium">Enter the quantity to archive:</p> */}
                        <input
                            type="number"
                            className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={archiveQuantity==0?"":archiveQuantity}
                            onChange={(e) => setArchiveQuantity(Number(e.target.value))}
                            placeholder="Enter quantity"
                            min="1"
                        />
                    </div>
                }
                header="Archive Confirmation"
                icon="pi pi-exclamation-triangle"
                acceptClassName="p-button-success"
                accept={handleArchive}
                reject={() => setVisible(false)}
                acceptLabel={ArchiveItemResponse.isLoading ? 'Archiving...' : 'Yes, Archive'}
                rejectLabel="No"
            />
        </>
    );
};

export default ArchiveModel;
