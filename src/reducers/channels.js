import * as actionTypes from "../actions/types"


const initialUserState ={
    currentChannel: null
}

const channel_reducer = (state=initialUserState , action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT_CHANNEL:
            return(
                {
                    currentChannel:action.payload
                }
            )
    
        default:
            return state
    }
}

export default channel_reducer