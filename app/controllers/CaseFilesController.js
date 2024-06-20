import { AppState } from "../AppState.js";
import { caseFilesService } from "../services/CaseFilesService.js";
import { setHTML } from "../utils/Writer.js";




export class CaseFilesController {
  constructor() {
    console.log('🕴️📂🎮', AppState);
    // this.drawCaseFilesList()
    // this.drawActiveCaseFile() // can't draw 'activeCaseFile' when page loads, cause there isn't one (null in AppState) until one is selected by the user
    AppState.on('caseFiles', this.drawCaseFilesList)
    AppState.on('activeCaseFile', this.drawActiveCaseFile)
    caseFilesService.loadCaseFiles()
  }

  drawCaseFilesList() {
    // NOTE draws, many things, so it needs a loop that adds template together
    const caseFiles = AppState.caseFiles
    let listHTML = ''
    caseFiles.forEach(caseFile => listHTML += caseFile.ListTemplate)
    setHTML('case-file-list', listHTML)
  }

  drawActiveCaseFile() {
    // NOTE draws one thing, so no loop. Just accessing the template directly, then setting HTML
    const activeCaseFile = AppState.activeCaseFile
    let activeHTML = activeCaseFile.ActiveTemplate
    setHTML('active-case-file', activeHTML)
  }

  selectActiveCase(caseId) {
    console.log('👉📁', caseId);
    caseFilesService.selectActiveCase(caseId)
  }

  saveActiveNote() {
    event.preventDefault()
    console.log('💾', event);
    const form = event.target // get the form
    // @ts-ignore
    const textarea = form.details // get the textarea
    const newDetails = textarea.value // get the text content out of the textarea
    console.log('✨', newDetails);
    caseFilesService.saveActiveNote(newDetails) // send that new text to the service
  }

  UnRedactCaseFile() {
    console.log('un-redacting');
    caseFilesService.UnRedactCaseFile()
  }
}