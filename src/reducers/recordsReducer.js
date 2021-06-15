const recordsReducer = (state, action) => {
     switch (action.type) {
          case 'setRecords':
               return {
                    ...state,
                    records: action.payload,
               };
          case 'setDataLoaded':
               return {
                    ...state,
                    whichDataIsLoaded: action.payload,
               }
          case 'setUser': 
               return {
                    ...state,
                    user: action.payload,
               };
          case 'setFundraiserToDisplay':
               return {
                    ...state,
                    fundraiserToDisplay: action.payload,
               }
          case 'removeUser': 
               return {
                    ...state,
                    user: '',
               };
          case 'chooseRecord':
               return {
                    ...state,
                    focusedRecordID: action.payload,
                    viewFocusedRecord: true,
               };
          case 'updateRecords':
               return {
                    ...state,
                    recordHasChanged: true,
               };
          case 'doNotUpdate':
               return {
                    ...state,
                    recordHasChanged: false,
               };
          case 'setHovered':
               return {
                    ...state,
                    hoveredID: action.payload,
               };
          case 'showDrawer':
               return {
                    ...state,
                    drawerVisible: true,
               };
          case 'selectDate':
               return {
                    ...state,
                    selectedDate: action.payload,
               };
          case 'editRecord':
               return {
                    ...state,
                    recordToEdit: action.payload,
               }
          case 'closeDrawer':
               return {
                    ...state,
                    drawerVisible: false,
                    recordToEdit: '',
               }
          case 'recordChangeComplete':
               return {
                    ...state,
                    alert: {"type": "success", "message": "Success!"},
                    recordHasChanged: false,
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