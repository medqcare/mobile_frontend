import keys from "../keys";
const { 
    SET_SHOW_INSTRUCTION
} = keys.showInstructionKeys

const initState = {
    showInstruction: false
}

function showInstructionReducer(state = initState, action){
    const { type, payload } = action
    switch (type) {
        case SET_SHOW_INSTRUCTION:
            return { ...state, showInstruction: payload}
        default:
            return state
    }
}

export default showInstructionReducer