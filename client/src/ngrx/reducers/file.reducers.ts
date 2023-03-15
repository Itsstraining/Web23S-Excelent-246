import { createReducer, on } from '@ngrx/store';
import { FileActions } from '../actions/file.actions';
import { FileState } from '../states/file.states';
const initialState: FileState = {
  file: null,
  files: [],
  loading: false,
  inProcess: false,
  error: '',
};
export const FileReducer = createReducer(
  initialState,
  on(FileActions.createFile, (state) => {
    return {
      ...state,
      inProcess: true,
      loading: true,
      error: '',
    };
  }),
  on(FileActions.createFileSuccess, (state, { file }) => {
    return {
      ...state,
      file: file,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(FileActions.createFileFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    };
  }),
  on(FileActions.getFileById, (state, { fileId }) => {
    return {
      ...state,
      inProcess: true,
      loading: true,
      error: '',
    };
  }),
  on(FileActions.getFileByIdSuccess, (state, { file }) => {
    return {
      ...state,
      file: file,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(FileActions.getFileByIdFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    };
  }),

  on(FileActions.getAllFiles, (state) => {
    return {
      ...state,
      inProcess: true,
      loading: true,
      error: '',
    };
  }),
  on(FileActions.getAllFilesSuccess, (state, { files }) => {
    return {
      ...state,
      files: <[]>files,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(FileActions.getAllFilesFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    };
  }),

  on(FileActions.getFilesByUserId, (state, { userId }) => {
    return {
      ...state,
      inProcess: true,
      loading: true,
      error: '',
    };
  }),
  on(FileActions.getFilesByUserIdSuccess, (state, { files }) => {
    return {
      ...state,
      files: files,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(FileActions.getFilesByUserIdFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    };
  }),

  on(FileActions.getFilesByDate, (state) => {
    return {
      ...state,
      inProcess: true,
      loading: true,
      error: '',
    };
  }),
  on(FileActions.getFilesByDateSuccess, (state, { files }) => {
    let newFiles = [...state.files];
    newFiles.sort((a, b) => a.createdDate - b.createdDate);

    //Sort name
    // newFiles.sort((a,b) => {
    //   const titleA = a.title.toUpperCase();
    //   const titleB = b.title.toUpperCase();
    //   if (titleA < titleB) {
    //     return -1;
    //   }
    //   if (titleA > titleB) {
    //     return 1;
    //   }
    //   return 0;
    // })

    return {
      ...state,
      files: newFiles,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(FileActions.getFilesByDateFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    };
  }),

  on(FileActions.getFilesByTitle, (state) => {
    return {
      ...state,
      inProcess: true,
      loading: true,
      error: '',
    };
  }),
  on(FileActions.getFilesByTitleSuccess, (state, { files }) => {
    let newFiles = [...state.files];
    newFiles.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    return {
      ...state,
      files: newFiles,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(FileActions.getFilesByTitleFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    };
  }),

  on(FileActions.updateFile, (state,{fileId, file}) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),

  on(FileActions.updateFileSuccess, (state, { file }) => {
    let newFiles = [...state.files];
    let index = newFiles.findIndex((f) => f.fileId == file.fileId)
    newFiles[index] = {...file}
    // let newFiles = [...state.files];
    // let index = newFiles.findIndex((f) => f.fileId == fileId);
    // if (index != -1) {
    //   newFiles[index] = { ...file };
    // }
    return {
      ...state,
      files: newFiles,
      // file: newFiles[index],
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(FileActions.updateFileFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    };
  }),
  on(FileActions.deleteFile, (state, { fileId }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(FileActions.deleteFileSuccess, (state, { fileId }) => {
    let newFiles = state.files.filter((f) => f.fileId != fileId);
    return {
      ...state,
      files: newFiles,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(FileActions.deleteFileFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    };
  }),
  on(FileActions.saveFile, (state, { file }) => {
    return {
      ...state,
      inProcess: true,
      loading: true,
      error: '',
    };
  }),
  on(FileActions.saveFileSuccess, (state) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(FileActions.saveFileFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    };
  }),
  on(FileActions.getFilesByMemberId, (state, { memberId }) => {
    return {
      ...state,
      inProcess: true,
      loading: true,
      error: '',
    };
  }),
  on(FileActions.getFilesByMemberIdSuccess, (state, { files }) => {
    return {
      ...state,
      files: files,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),
  on(FileActions.getFilesByMemberIdFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    };
  }),
  
  on(FileActions.updateFileData, (state, ) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: '',
    };
  }),

  on(FileActions.updateFileDataSuccess, (state, { fileData }) => {
    let newFile = {...state.file!};
    newFile = {...newFile, data: fileData};
    return {
      ...state,
      file: newFile,
      inProcess: false,
      loading: false,
      error: '',
    }
  }),

  on(FileActions.updateFileDataFailure, (state, { error }) => {
    return {
      ...state,
      inProcess: false,
      loading: false,
      error: error,
    }
  })
);
