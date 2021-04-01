const recordsReducer = (state, action) => {
     // get fundraiser data
     // get focused fundraiser
     // get focused fundraiser editor
     // submit fundraiser edits
     switch (action.type) {
          case 'setRecords':
               // console.log("records: ", action.payload);
               return {
                    ...state,
                    allRecords: action.payload,
               }
          case 'chooseRecord':
               // console.log("select record: ", action.payload)
               return {
                    ...state,
                    focusedRecordID: action.payload,
                    viewFocusedRecord: true,
               };
          case 'updateRecords':
               console.log("Setting recordHasChanged: true.")
               return {
                    ...state,
                    recordHasChanged: true,
               };
          case 'doNotUpdate':
               console.log("Let it be.")
               return {
                    ...state,
                    recordHasChanged: false,
               };
          case 'setHovered':
               return {
                    ...state,
                    hoveredID: action.payload,
               };
          case 'showEditDrawer':
               return {
                    ...state,
                    editDrawerVisible: true,
                    recordToEdit: action.payload,
               };
          case 'closeEditDrawer':
               return {
                    ...state,
                    editDrawerVisible: false,
                    // recordToEdit: '',
               }
          case 'logSuccess':
               return {
                    ...state,
                    alert: {"type": "success", "message": "Success!"},
                    // recordToEdit: '',
//     const alertList = [{type: "success", message: "Success!"},{type: "error", message: "Darn. Something went wrong."},{type: "info", message: "Something you should know ... is that there is a lengthy thing to say about whatever it is we were discussing. Which I'll remember soon. Honestly."}];
               }
          case 'logError':
               return {
                    ...state,
                    alert: {"type": "error", "message": "Darn. Something went wrong."},
               }
          default: throw new Error('unknown action');
     }
};

export default recordsReducer;