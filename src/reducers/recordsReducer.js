const recordsReducer = (state, action) => {
     // get fundraiser data
     // get focused fundraiser
     // get focused fundraiser editor
     // submit fundraiser edits
     console.log("action.payload: ", action.payload);
     switch (action.type) {
          case 'chooseRecord':
               console.log("chooseRecord payload: ", action.payload);
               return {
                    ...state,
                    focusedRecord: action.payload,
                    viewFocusedRecord: true,
               };
          // case 'showRecordDetails':
          //      console.log('showing record');
          //      return {
          //           ...state,
          //           viewFocusedRecord: true,
          //      };
          case 'updateRecord':
               return {
                    ...state,
                    newRecord: true,
               };
          case 'setHovered':
               return {
                    ...state,
                    hoveredID: action.payload,
               };
          // case 'newAlert':
          //      return {
          //           ...state,
          //           alerts: alerts.push(action.payload),
          //      };
          default:
               throw new Error('unknown action');
     }
};

// const initialState = {
//      focusedRecord: null,
//      alerts: [],
//      newRecord: false,
//    };

export default recordsReducer;