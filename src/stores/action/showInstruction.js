import keys from "../keys";

const {
    SET_SHOW_INSTRUCTION
} = keys.showInstructionKeys

export function setShowInstruction(payload){
    return async dispatch => {
        try {
            await dispatch({
                type: SET_SHOW_INSTRUCTION,
                payload
            })
        } catch (error) {
            
        }
    }
}