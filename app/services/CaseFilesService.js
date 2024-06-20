import { AppState } from "../AppState.js";
import { CaseFile } from "../models/CaseFile.js";
import { loadState, saveState } from "../utils/Store.js";



class CaseFilesService {
  selectActiveCase(caseId) {
    const selectedCaseFile = AppState.caseFiles.find(caseFile => caseFile.id == caseId)
    console.log('🐕‍🦺', caseId, selectedCaseFile);
    AppState.activeCaseFile = selectedCaseFile
    console.log(AppState);
  }

  saveActiveNote(newDetails) {
    const activeCaseFile = AppState.activeCaseFile
    activeCaseFile.details = newDetails
    activeCaseFile.redacted = true
    AppState.emit('activeCaseFile')
    this.saveCaseFiles()
  }

  UnRedactCaseFile() {
    const activeCaseFile = AppState.activeCaseFile

    // if (activeCaseFile.redacted) {
    //   activeCaseFile.redacted = false
    // } else {
    //   activeCaseFile.redacted = true
    // }
    activeCaseFile.redacted = !activeCaseFile.redacted
    // REVIEW changing the opened date when it's "not redacted", if you aren't redacting stuff, just forget the if part
    if (activeCaseFile.redacted == false) activeCaseFile.lastOpenedAt = new Date()  // if's don't need { } if the scope of that if ends on the same line as the if
    AppState.emit('activeCaseFile') // this triggers all listeners for "activeCaseFile"
  }

  saveCaseFiles() {
    saveState('secret-files-do-not-touch', AppState.caseFiles)
  }

  loadCaseFiles() {
    AppState.caseFiles = loadState('secret-files-do-not-touch', [CaseFile])
  }
}

export const caseFilesService = new CaseFilesService()