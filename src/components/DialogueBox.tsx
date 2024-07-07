const DialogueBox = () => {

    return ( 
        <aside role="listbox" className="absolute -bottom-100% w-full mt-2 rounded-md border-gray-600 shadow-md p-2">
            <p className="font-semibold text-sm text-gray-700">Type at least 3 characters</p>
            <p className="font-light text-xs mt-1 text-MAIN_CL">to start searching</p>
        </aside>
     );
}
 
export default DialogueBox;