import {create} from "zustand"

interface SubscriptionModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSubscribeModal = create<SubscriptionModalStore>((set)=> ({
    isOpen: false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false})
}));

export default useSubscribeModal;