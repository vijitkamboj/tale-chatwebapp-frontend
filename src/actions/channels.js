import * as actionTypes from "./types"

export const changeCurrentChannel = (channel) => {
    return(
        {
            type: actionTypes.CHANGE_CURRENT_CHANNEL,
            payload : channel
        }
    )
}