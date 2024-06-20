import { AppState } from "../AppState.js";
import { caseFilesService } from "../services/CaseFilesService.js";
import { setHTML } from "../utils/Writer.js";




export class CaseFilesController {
  constructor() {
    console.log('🕴️📂🎮', AppState);
    // this.drawCaseFilesList()
    // this.drawActiveCaseFile() // can't draw active casefile when page loads, cause there isn't one (null in AppState)
    AppState.on('caseFiles', this.drawCaseFilesList)
    AppState.on('activeCaseFile', this.drawActiveCaseFile)
    caseFilesService.loadCaseFiles()
  }

  drawCaseFilesList() {
    const caseFiles = AppState.caseFiles
    let listHTML = ''
    caseFiles.forEach(caseFile => listHTML += caseFile.ListTemplate)
    setHTML('case-file-list', listHTML)
  }

  drawActiveCaseFile() {
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
    const form = event.target
    // @ts-ignore
    const textarea = form.details
    const newDetails = textarea.value
    console.log('✨', newDetails);
    caseFilesService.saveActiveNote(newDetails)
  }

  UnRedactCaseFile() {
    console.log('un-redacting');
    caseFilesService.UnRedactCaseFile()
  }
}