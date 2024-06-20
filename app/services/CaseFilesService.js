import { AppState } from "../AppState.js";
import { CaseFile } from "../models/CaseFile.js";
import { loadState, saveState } from "../utils/Store.js";



class CaseFilesService {
  selectActiveCase(caseId) {
    // We need find the case the user clicked on, think of the "valet" example.
    // we have one small part of a greater whole. How can we use the small part to find the greater whole
    const selectedCaseFile = AppState.caseFiles.find(caseFile => caseFile.id == caseId)
    console.log('🐕‍🦺', caseId, selectedCaseFile);
    AppState.activeCaseFile = selectedCaseFile
    console.log(AppState);
  }

  saveActiveNote(newDetails) {
    const activeCaseFile = AppState.activeCaseFile
    activeCaseFile.details = newDetails
    activeCaseFile.redacted = true
    AppState.emit('activeCaseFile') // emit will trigger listeners, registered to the same "action". Here we didn't change 'activeCaseFile' directly so the listeners don't trigger, so we have to trigger them manually to draw
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
    // REVIEW changing the opened date when it's "not redacted", if you aren't redacting stuff, just forget the if part, and maybe put it somewhere else.
    if (activeCaseFile.redacted == false) activeCaseFile.lastOpenedAt = new Date()  // if's don't need { } if the scope of that if ends on the same line as the if
    AppState.emit('activeCaseFile') // this triggers all listeners for "activeCaseFile"
  }

  saveCaseFiles() {
    // save, saves data in local storage under a key
    // ---------Key.......................Data
    saveState('secret-files-do-not-touch', AppState.caseFiles)
  }

  // NOTE make sure the instance type include the [] if you're trying to save an array of data
  loadCaseFiles() {
    // Load loads data from local storage "Classes" it, and stores it
    // Where it's stored............Key.........................Data Type
    AppState.caseFiles = loadState('secret-files-do-not-touch', [CaseFile])
  }
}

export const caseFilesService = new CaseFilesService()